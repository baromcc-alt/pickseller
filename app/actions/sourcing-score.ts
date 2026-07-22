"use server";

import { getKeywordTrend } from "@/app/actions/keyword-trends";
import { getKeywordAdData } from "@/app/actions/keyword-search-ad";
import { calcSourcingScore } from "@/lib/scoring/sourcing-score";
import type { SourcingScore } from "@/lib/scoring/sourcing-score";

export type { SourcingScore };

export async function getSourcingScore(keyword: string): Promise<SourcingScore | null> {
  try {
    // ── 검색광고 API (검색량 + 경쟁강도) — 메인 데이터 소스 ──
    const adResult = await getKeywordAdData(keyword).catch(() => null);

    // ── DataLab 트렌드 — 실패해도 무방 (중간값으로 fallback) ──
    const trendResult = await getKeywordTrend(keyword, 3).catch(() => null);
    const trendData = trendResult?.trends.map((t) => ({ period: t.period, ratio: t.ratio })) ?? [];

    if (adResult?.exact) {
      // 정상 경로: 검색광고 API + DataLab 조합
      const { monthlyPcQcCnt, monthlyMobileQcCnt, compIdx } = adResult.exact;
      return calcSourcingScore({
        monthlyPc:     monthlyPcQcCnt,
        monthlyMobile: monthlyMobileQcCnt,
        compIdx,
        trendData,
      });
    }

    // 검색광고 API 실패 or 키워드 없음 → DataLab만으로 기본 산출
    if (trendData.length === 0) return null;

    return calcSourcingScore({
      monthlyPc:     0,
      monthlyMobile: 0,
      compIdx:       "보통",
      trendData,
    });
  } catch (e) {
    console.error("[getSourcingScore] 오류:", e);
    return null;
  }
}
