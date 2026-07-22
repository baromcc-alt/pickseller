"use server";

import { getKeywordTrend } from "@/app/actions/keyword-trends";
import { calcSourcingScore } from "@/lib/scoring/sourcing-score";
import type { SourcingScore } from "@/lib/scoring/sourcing-score";

export type { SourcingScore };

export async function getSourcingScore(keyword: string): Promise<SourcingScore | null> {
  try {
    const trendResult = await getKeywordTrend(keyword, 3);
    if (!trendResult || trendResult.trends.length === 0) return null;

    return calcSourcingScore(
      trendResult.trends.map((t) => ({ period: t.period, ratio: t.ratio })),
    );
  } catch (e) {
    console.error("[getSourcingScore] 오류:", e);
    return null;
  }
}
