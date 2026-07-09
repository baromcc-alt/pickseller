import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { KEYWORD_CATEGORIES } from "@/lib/constants/categories";
import type { Database } from "@/types/database";

// Supabase 서비스 롤 클라이언트 (RLS 우회)
function getSupabaseAdmin() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// 네이버 데이터랩 검색어트렌드 API 호출
async function fetchTrend(keywords: string[]): Promise<Record<string, number>> {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 1);
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const res = await fetch("https://openapi.naver.com/v1/datalab/search", {
    method: "POST",
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate: fmt(start),
      endDate: fmt(end),
      timeUnit: "week",
      keywordGroups: keywords.map((kw) => ({ groupName: kw, keywords: [kw] })),
    }),
    cache: "no-store",
  });

  if (!res.ok) return {};

  const json = await res.json();
  const scores: Record<string, number> = {};

  for (const result of json.results ?? []) {
    const name: string = result.title;
    const dataPoints: { period: string; ratio: number }[] = result.data ?? [];
    // 가장 최근 데이터 포인트의 ratio 사용
    const latest = dataPoints[dataPoints.length - 1];
    scores[name] = latest?.ratio ?? 0;
  }

  return scores;
}

// 카테고리 키워드 스코어 수집 (배치 5개씩, 앵커 키워드로 정규화)
async function fetchCategoryScores(
  keywords: string[]
): Promise<Record<string, number>> {
  const anchor = keywords[0];
  const allScores: Record<string, number> = {};
  let anchorBaseScore: number | null = null;

  // 5개씩 배치 (첫 번째 키워드를 항상 앵커로 포함)
  for (let i = 0; i < keywords.length; i += 4) {
    const batch = i === 0
      ? keywords.slice(0, 5)
      : [anchor, ...keywords.slice(i, i + 4)];

    const scores = await fetchTrend(batch);

    // 앵커 스코어 기준 정규화
    const anchorScore = scores[anchor] ?? 1;
    if (anchorBaseScore === null) anchorBaseScore = anchorScore;

    const normalizer = anchorBaseScore / (anchorScore || 1);

    for (const [kw, score] of Object.entries(scores)) {
      if (kw === anchor) {
        allScores[kw] = anchorBaseScore;
      } else {
        allScores[kw] = score * normalizer;
      }
    }

    // API 레이트 리밋 방지
    await new Promise((r) => setTimeout(r, 300));
  }

  return allScores;
}

export async function GET(request: Request) {
  // 크론 시크릿 검증 (Vercel이 자동으로 헤더 추가)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const rankedAt = new Date().toISOString();
  const results: { category: string; updated: number }[] = [];

  for (const category of KEYWORD_CATEGORIES) {
    try {
      const scores = await fetchCategoryScores(category.keywords);

      // 스코어 기준 정렬 → 상위 5개 추출
      const ranked = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      // 기존 데이터 조회 (trend 계산용)
      const { data: prev } = await supabase
        .from("keyword_rankings")
        .select("keyword, score")
        .eq("category", category.label);

      const prevMap = new Map((prev ?? []).map((r) => [r.keyword, r.score]));

      // upsert
      const rows = ranked.map(([keyword, score], idx) => {
        const prevScore = prevMap.get(keyword) ?? score;
        const trend =
          score > prevScore + 1 ? "up" : score < prevScore - 1 ? "down" : "same";

        return {
          category: category.label,
          keyword,
          rank: idx + 1,
          score: Math.round(score * 10) / 10,
          score_prev: prevScore,
          trend,
          ranked_at: rankedAt,
        };
      });

      // 기존 카테고리 데이터 삭제 후 재삽입
      await supabase
        .from("keyword_rankings")
        .delete()
        .eq("category", category.label);

      const { error } = await supabase
        .from("keyword_rankings")
        .insert(rows);

      if (error) throw error;

      results.push({ category: category.label, updated: rows.length });
    } catch (err) {
      console.error(`[update-rankings] ${category.label} 실패:`, err);
      results.push({ category: category.label, updated: -1 });
    }
  }

  return NextResponse.json({ ok: true, rankedAt, results });
}
