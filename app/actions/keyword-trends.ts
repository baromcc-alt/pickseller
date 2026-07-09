"use server";

import { createClient } from "@/lib/supabase/server";
import { fetchKeywordTrend, fetchKeywordsTrend } from "@/lib/naver/datalab";
import type { KeywordTrendResult, NaverTrendDataPoint } from "@/types/naver";

const DEFAULT_MONTHS = 3;
const DEFAULT_TIME_UNIT = "week" as const;

// 데이터랩 timeUnit: "week" → 주간 집계 데이터라 7일 캐시로도 충분
const CACHE_TTL_MS   = 7 * 24 * 60 * 60 * 1000; // 7일 (신선 캐시)
const STALE_TTL_MS   = 30 * 24 * 60 * 60 * 1000; // 30일 (Stale 허용 기간)

// ────────────────────────────────────────────
// 단일 키워드 트렌드 조회 (캐시 우선)
// ────────────────────────────────────────────

export async function getKeywordTrend(
  keyword: string,
  months = DEFAULT_MONTHS
): Promise<KeywordTrendResult> {
  const supabase = await createClient();
  const normalizedKeyword = keyword.trim().toLowerCase();
  const now = new Date();

  // 1. 최신 캐시 조회 (만료 여부 무관 — stale 포함)
  const { data: latestCache } = await supabase
    .from("keyword_trends")
    .select("*")
    .eq("keyword", normalizedKeyword)
    .eq("time_unit", DEFAULT_TIME_UNIT)
    .eq("months", months)
    .order("fetched_at", { ascending: false })
    .limit(1)
    .single();

  if (latestCache) {
    const expiresAt = new Date(latestCache.expires_at);
    const fetchedAt = new Date(latestCache.fetched_at);
    const staleDeadline = new Date(fetchedAt.getTime() + STALE_TTL_MS);
    const isFresh = expiresAt > now;
    const isWithinStale = staleDeadline > now;

    // 신선 캐시 → 즉시 반환
    if (isFresh) {
      return {
        keyword: latestCache.keyword,
        trends: latestCache.trend_data as KeywordTrendResult["trends"],
        fetchedAt: latestCache.fetched_at,
        fromCache: true,
      };
    }

    // Stale 캐시 → 즉시 반환 후 백그라운드 갱신 트리거
    if (isWithinStale) {
      // 백그라운드 갱신 (응답 블로킹 없음)
      void refreshKeywordCache(normalizedKeyword, keyword, months, supabase);
      return {
        keyword: latestCache.keyword,
        trends: latestCache.trend_data as KeywordTrendResult["trends"],
        fetchedAt: latestCache.fetched_at,
        fromCache: true,
      };
    }
  }

  // 2. 캐시 없음 → API 호출 (최초 검색)
  const apiResponse = await fetchKeywordTrend(keyword, months);

  const result = apiResponse.results[0];
  const trendData = (result?.data ?? []).map((d: NaverTrendDataPoint) => ({
    keyword: normalizedKeyword,
    period: d.period,
    ratio: d.ratio,
  }));

  const expiresAt = new Date(now.getTime() + CACHE_TTL_MS);

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

// 백그라운드 캐시 갱신 (stale 히트 시 비동기 실행)
async function refreshKeywordCache(
  normalizedKeyword: string,
  originalKeyword: string,
  months: number,
  supabase: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>
) {
  try {
    const apiResponse = await fetchKeywordTrend(originalKeyword, months);
    const result = apiResponse.results[0];
    if (!result) return;

    const trendData = result.data.map((d: NaverTrendDataPoint) => ({
      keyword: normalizedKeyword,
      period: d.period,
      ratio: d.ratio,
    }));

    const now = new Date();
    const expiresAt = new Date(now.getTime() + CACHE_TTL_MS);

    // 기존 캐시 삭제 후 재삽입
    await supabase.from("keyword_trends").delete().eq("keyword", normalizedKeyword);
    await supabase.from("keyword_trends").insert({
      keyword: normalizedKeyword,
      time_unit: DEFAULT_TIME_UNIT,
      months,
      raw_data: apiResponse,
      trend_data: trendData,
      fetched_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
    });
  } catch (e) {
    console.error("[refreshKeywordCache] 백그라운드 갱신 실패:", normalizedKeyword, e);
  }
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

  // 1. 캐시 일괄 조회 (만료 여부 무관)
  const { data: cachedRows } = await supabase
    .from("keyword_trends")
    .select("*")
    .in("keyword", normalized)
    .eq("time_unit", DEFAULT_TIME_UNIT)
    .eq("months", months)
    .order("fetched_at", { ascending: false });

  // 캐시된 키워드 맵 (keyword → 가장 최신 row)
  const cacheMap = new Map<string, typeof cachedRows extends (infer T)[] | null ? T : never>();
  for (const row of cachedRows ?? []) {
    if (!cacheMap.has(row.keyword)) cacheMap.set(row.keyword, row);
  }

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
    const expiresAt = new Date(now.getTime() + CACHE_TTL_MS);

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
