"use server";

import { createClient } from "@/lib/supabase/server";
import { fetchKeywordTrend, fetchKeywordsTrend } from "@/lib/naver/datalab";
import type { KeywordTrendResult, NaverTrendDataPoint } from "@/types/naver";

const DEFAULT_MONTHS = 3;
const DEFAULT_TIME_UNIT = "week" as const;

// ────────────────────────────────────────────
// 단일 키워드 트렌드 조회 (캐시 우선)
// ────────────────────────────────────────────

export async function getKeywordTrend(
  keyword: string,
  months = DEFAULT_MONTHS
): Promise<KeywordTrendResult> {
  const supabase = await createClient();
  const normalizedKeyword = keyword.trim().toLowerCase();

  // 1. 캐시 조회 — expires_at이 현재 시각보다 미래인 레코드만
  const { data: cached } = await supabase
    .from("keyword_trends")
    .select("*")
    .eq("keyword", normalizedKeyword)
    .eq("time_unit", DEFAULT_TIME_UNIT)
    .eq("months", months)
    .gt("expires_at", new Date().toISOString())
    .order("fetched_at", { ascending: false })
    .limit(1)
    .single();

  if (cached) {
    return {
      keyword: cached.keyword,
      trends: cached.trend_data as KeywordTrendResult["trends"],
      fetchedAt: cached.fetched_at,
      fromCache: true,
    };
  }

  // 2. 캐시 미스 → 네이버 API 호출
  const apiResponse = await fetchKeywordTrend(keyword, months);

  const result = apiResponse.results[0];
  const trendData = (result?.data ?? []).map((d: NaverTrendDataPoint) => ({
    keyword: normalizedKeyword,
    period: d.period,
    ratio: d.ratio,
  }));

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // 3. Supabase에 캐시 저장
  await supabase.from("keyword_trends").insert({
    keyword: normalizedKeyword,
    time_unit: DEFAULT_TIME_UNIT,
    months,
    raw_data: apiResponse,
    trend_data: trendData,
    fetched_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
  });

  return {
    keyword: normalizedKeyword,
    trends: trendData,
    fetchedAt: now.toISOString(),
    fromCache: false,
  };
}

// ────────────────────────────────────────────
// 여러 키워드 비교 트렌드 (최대 5개)
// 개별 캐시 확인 후 캐시 미스 키워드만 묶어서 API 호출
// ────────────────────────────────────────────

export async function getKeywordsTrend(
  keywords: string[],
  months = DEFAULT_MONTHS
): Promise<KeywordTrendResult[]> {
  if (keywords.length === 0) return [];
  if (keywords.length > 5) {
    throw new Error("한 번에 최대 5개 키워드만 조회할 수 있습니다.");
  }

  const supabase = await createClient();
  const normalized = keywords.map((k) => k.trim().toLowerCase());

  // 1. 캐시 일괄 조회
  const { data: cachedRows } = await supabase
    .from("keyword_trends")
    .select("*")
    .in("keyword", normalized)
    .eq("time_unit", DEFAULT_TIME_UNIT)
    .eq("months", months)
    .gt("expires_at", new Date().toISOString());

  // 캐시된 키워드 맵 (keyword → row)
  const cacheMap = new Map(
    (cachedRows ?? []).map((row) => [row.keyword, row])
  );

  const results: KeywordTrendResult[] = [];
  const missedKeywords: string[] = [];

  for (const kw of normalized) {
    const cached = cacheMap.get(kw);
    if (cached) {
      results.push({
        keyword: cached.keyword,
        trends: cached.trend_data as KeywordTrendResult["trends"],
        fetchedAt: cached.fetched_at,
        fromCache: true,
      });
    } else {
      missedKeywords.push(kw);
    }
  }

  // 2. 캐시 미스 키워드만 API 호출
  if (missedKeywords.length > 0) {
    const apiResponse = await fetchKeywordsTrend(missedKeywords, months);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const insertRows = apiResponse.results.map((result) => {
      const kw = result.title.toLowerCase();
      const trendData = result.data.map((d) => ({
        keyword: kw,
        period: d.period,
        ratio: d.ratio,
      }));

      return {
        keyword: kw,
        time_unit: DEFAULT_TIME_UNIT,
        months,
        raw_data: apiResponse,
        trend_data: trendData,
        fetched_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
      };
    });

    // 3. 일괄 캐시 저장
    if (insertRows.length > 0) {
      await supabase.from("keyword_trends").insert(insertRows);
    }

    // 4. 결과에 추가
    for (const result of apiResponse.results) {
      const kw = result.title.toLowerCase();
      const trendData = result.data.map((d) => ({
        keyword: kw,
        period: d.period,
        ratio: d.ratio,
      }));
      results.push({
        keyword: kw,
        trends: trendData,
        fetchedAt: now.toISOString(),
        fromCache: false,
      });
    }
  }

  // 원래 순서 유지
  return normalized.map(
    (kw) => results.find((r) => r.keyword === kw)!
  ).filter(Boolean);
}

// ────────────────────────────────────────────
// 캐시 강제 무효화 (특정 키워드)
// ────────────────────────────────────────────

export async function invalidateKeywordCache(keyword: string): Promise<void> {
  const supabase = await createClient();
  await supabase
    .from("keyword_trends")
    .delete()
    .eq("keyword", keyword.trim().toLowerCase());
}

// ────────────────────────────────────────────
// 만료된 캐시 정리
// ────────────────────────────────────────────

export async function cleanupExpiredCache(): Promise<{ deleted: number }> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("keyword_trends")
    .delete({ count: "exact" })
    .lt("expires_at", new Date().toISOString());

  if (error) throw new Error(`캐시 정리 실패: ${error.message}`);
  return { deleted: count ?? 0 };
}
