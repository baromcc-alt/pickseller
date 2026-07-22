"use server";

import { createClient } from "@/lib/supabase/server";
import { fetchKeywordAdData, type KeywordAdItem } from "@/lib/naver/search-ad";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24시간

export interface KeywordAdResult {
  keyword: string;
  exact: KeywordAdItem | null;
  related: KeywordAdItem[];
  fetchedAt: string;
  fromCache: boolean;
}

// ── 검색광고 API 데이터 조회 (캐시 포함) ─────────────────────
export async function getKeywordAdData(keyword: string): Promise<KeywordAdResult | null> {
  const supabase = await createClient();
  const normalized = keyword.trim().toLowerCase();
  const now = new Date();

  // 1. 캐시 확인
  const { data: cached } = await supabase
    .from("keyword_ad_data")
    .select("*")
    .eq("keyword", normalized)
    .order("fetched_at", { ascending: false })
    .limit(1)
    .single();

  if (cached) {
    const expiresAt = new Date(cached.expires_at);
    if (expiresAt > now) {
      return {
        keyword: normalized,
        exact: cached.exact_data as KeywordAdItem | null,
        related: (cached.related_data as KeywordAdItem[]) ?? [],
        fetchedAt: cached.fetched_at,
        fromCache: true,
      };
    }
  }

  // 2. API 호출
  try {
    const items = await fetchKeywordAdData(keyword);

    const exact = items.find(
      (item) => item.relKeyword.trim().toLowerCase() === normalized
    ) ?? null;

    const related = items
      .filter((item) => item.relKeyword.trim().toLowerCase() !== normalized)
      .sort((a, b) => b.monthlyTotalQcCnt - a.monthlyTotalQcCnt)
      .slice(0, 20);

    const expiresAt = new Date(now.getTime() + CACHE_TTL_MS);

    // 3. 캐시 저장
    await supabase.from("keyword_ad_data").upsert(
      {
        keyword: normalized,
        exact_data: exact,
        related_data: related,
        fetched_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
      },
      { onConflict: "keyword" }
    );

    return {
      keyword: normalized,
      exact,
      related,
      fetchedAt: now.toISOString(),
      fromCache: false,
    };
  } catch (e) {
    console.error("[getKeywordAdData] API 오류:", e);
    if (cached) {
      return {
        keyword: normalized,
        exact: cached.exact_data as KeywordAdItem | null,
        related: (cached.related_data as KeywordAdItem[]) ?? [],
        fetchedAt: cached.fetched_at,
        fromCache: true,
      };
    }
    return null;
  }
}

