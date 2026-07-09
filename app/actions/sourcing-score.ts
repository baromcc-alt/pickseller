"use server";

import { getKeywordTrend } from "@/app/actions/keyword-trends";
import { fetchShoppingProductCount, fetchShoppingAvgPrice } from "@/lib/naver/shopping-search";
import { calcSourcingScore } from "@/lib/scoring/sourcing-score";
import type { SourcingScore } from "@/lib/scoring/sourcing-score";

export type { SourcingScore };

export async function getSourcingScore(keyword: string): Promise<SourcingScore | null> {
  try {
    // DataLab 트렌드 (3개월) + 쇼핑 검색 API 병렬 호출
    const [trendResult, productCount, avgPrice] = await Promise.all([
      getKeywordTrend(keyword, 3),
      fetchShoppingProductCount(keyword).catch(() => 0),
      fetchShoppingAvgPrice(keyword).catch(() => null),
    ]);

    if (!trendResult || trendResult.trends.length === 0) return null;

    return calcSourcingScore(
      trendResult.trends.map((t) => ({ period: t.period, ratio: t.ratio })),
      productCount,
      avgPrice,
    );
  } catch (e) {
    console.error("[getSourcingScore] 오류:", e);
    return null;
  }
}
