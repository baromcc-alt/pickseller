"use server";

import { createClient } from "@/lib/supabase/server";
import { fetchKeywordsTrend } from "@/lib/naver/datalab";
import { KEYWORD_CATEGORIES, type KeywordCategory } from "@/lib/constants/categories";

const TOP_N = 10; // 카테고리당 상위 N개

export interface RankedKeyword {
  rank: number;
  keyword: string;
  score: number;
  trend: "up" | "down" | "stable" | "new";
}

export interface CategoryRanking {
  category: KeywordCategory;
  keywords: RankedKeyword[];
  rankedAt: string;
  fromCache: boolean;
}

// ────────────────────────────────────────────
// 오늘 랭킹 캐시 조회
// ────────────────────────────────────────────

async function getTodayRankings(categoryId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("keyword_rankings")
    .select("*")
    .eq("category", categoryId)
    .order("rank", { ascending: true })
    .limit(TOP_N);

  return data ?? [];
}

// ────────────────────────────────────────────
// 카테고리 랭킹 생성 (API 호출 + Supabase 저장)
// ────────────────────────────────────────────

async function buildCategoryRanking(category: KeywordCategory): Promise<RankedKeyword[]> {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];
  const keywords = category.keywords;

  // 네이버 API는 한 번에 최대 5개 → 배치 처리
  const BATCH_SIZE = 5;
  const scores: { keyword: string; score: number }[] = [];

  for (let i = 0; i < keywords.length; i += BATCH_SIZE) {
    const batch = keywords.slice(i, i + BATCH_SIZE);
    try {
      const res = await fetchKeywordsTrend(batch, 1); // 최근 1개월
      for (const result of res.results) {
        const data = result.data;
        if (data.length === 0) continue;
        // 최근 4주 평균으로 점수 산정
        const recent = data.slice(-4);
        const avg = recent.reduce((sum, d) => sum + d.ratio, 0) / recent.length;
        scores.push({ keyword: result.title, score: Math.round(avg * 10) / 10 });
      }
    } catch (err) {
      console.error(`[buildCategoryRanking] 배치 실패:`, batch, err);
    }
  }

  // 점수 내림차순 정렬
  scores.sort((a, b) => b.score - a.score);
  const topN = scores.slice(0, TOP_N);

  // 어제 랭킹 조회 (트렌드 방향 계산용)
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const { data: prevData } = await supabase
    .from("keyword_rankings")
    .select("keyword, rank, score")
    .eq("category", category.id)
    .eq("ranked_at", yesterday);

  const prevMap = new Map((prevData ?? []).map((r) => [r.keyword, { rank: r.rank, score: r.score }]));

  // 오늘 랭킹 저장 (기존 오늘 데이터 삭제 후 재삽입)
  await supabase.from("keyword_rankings").delete().eq("category", category.id).eq("ranked_at", today);

  const rows = topN.map((item, idx) => {
    const prev = prevMap.get(item.keyword);
    const trend = !prev
      ? "new"
      : idx + 1 < prev.rank
      ? "up"
      : idx + 1 > prev.rank
      ? "down"
      : "stable";

    return {
      category: category.id,
      keyword: item.keyword,
      rank: idx + 1,
      score: item.score,
      score_prev: prev?.score ?? null,
      trend,
      ranked_at: today,
    };
  });

  if (rows.length > 0) {
    await supabase.from("keyword_rankings").insert(rows);
  }

  return rows.map((r) => ({
    rank: r.rank,
    keyword: r.keyword,
    score: r.score,
    trend: r.trend as RankedKeyword["trend"],
  }));
}

// ────────────────────────────────────────────
// 단일 카테고리 랭킹 조회 (캐시 우선)
// ────────────────────────────────────────────

export async function getCategoryRanking(categoryId: string): Promise<CategoryRanking | null> {
  const category = KEYWORD_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;

  // 오늘 캐시 확인
  const cached = await getTodayRankings(category.id);

  if (cached.length > 0) {
    return {
      category,
      keywords: cached.map((r) => ({
        rank: r.rank,
        keyword: r.keyword,
        score: r.score,
        trend: r.trend as RankedKeyword["trend"],
      })),
      rankedAt: cached[0].ranked_at,
      fromCache: true,
    };
  }

  // 캐시 없으면 API 호출
  const keywords = await buildCategoryRanking(category);
  return {
    category,
    keywords,
    rankedAt: new Date().toISOString().split("T")[0],
    fromCache: false,
  };
}

// ────────────────────────────────────────────
// 첫 번째 카테고리 랭킹만 빠르게 조회 (홈용)
// ────────────────────────────────────────────

export async function getFirstCategoryRanking(): Promise<CategoryRanking | null> {
  return getCategoryRanking(KEYWORD_CATEGORIES[0].id);
}

// ────────────────────────────────────────────
// 카테고리 랭킹 강제 갱신 (캐시 무시, 수동 버튼용)
// ────────────────────────────────────────────

export async function refreshCategoryRanking(categoryId: string): Promise<CategoryRanking | null> {
  const category = KEYWORD_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;

  const keywords = await buildCategoryRanking(category);
  return {
    category,
    keywords,
    rankedAt: new Date().toISOString(),
    fromCache: false,
  };
}
