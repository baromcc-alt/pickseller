/**
 * 네이버 검색광고 API — 키워드 도구
 * https://naver.github.io/searchad-apidoc/
 *
 * DataLab과 달리 실제 월 검색량·경쟁강도·연관 키워드를 반환하며
 * 일일 한도가 수만 건으로 DataLab보다 훨씬 여유롭습니다.
 */

import crypto from "crypto";

const BASE_URL = "https://api.naver.com";
const URI = "/keywordstool";

function makeSignature(timestamp: string): string {
  const message = `${timestamp}.GET.${URI}`;
  return crypto
    .createHmac("sha256", process.env.NAVER_AD_SECRET_KEY!)
    .update(message)
    .digest("base64");
}

/** "<10" 처리 — 네이버가 10 미만이면 문자열로 반환 */
function parseCount(val: string | number): number {
  if (val === "<10") return 5;
  return Number(val) || 0;
}

export interface KeywordAdItem {
  relKeyword: string;           // 키워드
  monthlyPcQcCnt: number;       // 월간 PC 검색수
  monthlyMobileQcCnt: number;   // 월간 모바일 검색수
  monthlyTotalQcCnt: number;    // 월간 총 검색수
  compIdx: "낮음" | "보통" | "높음"; // 경쟁강도
  plAvgDepth: number;           // 월평균 노출 광고 수
}

export async function fetchKeywordAdData(keyword: string): Promise<KeywordAdItem[]> {
  const timestamp = Date.now().toString();
  const signature = makeSignature(timestamp);

  const params = new URLSearchParams({
    hintKeywords: keyword,
    showDetail: "1",
  });

  const res = await fetch(`${BASE_URL}${URI}?${params.toString()}`, {
    method: "GET",
    headers: {
      "X-Timestamp": timestamp,
      "X-API-KEY": process.env.NAVER_AD_API_KEY!,
      "X-Customer": process.env.NAVER_AD_CUSTOMER_ID!,
      "X-Signature": signature,
    },
    // Next.js fetch 캐시 — Supabase 캐시가 없을 때 fallback
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Naver Search Ad API 오류 [${res.status}]: ${text}`);
  }

  const data = await res.json();

  return (data.keywordList ?? []).map((item: Record<string, string | number>) => {
    const pc = parseCount(item.monthlyPcQcCnt);
    const mobile = parseCount(item.monthlyMobileQcCnt);
    return {
      relKeyword: String(item.relKeyword),
      monthlyPcQcCnt: pc,
      monthlyMobileQcCnt: mobile,
      monthlyTotalQcCnt: pc + mobile,
      compIdx: (item.compIdx as "낮음" | "보통" | "높음") ?? "보통",
      plAvgDepth: Number(item.plAvgDepth) || 0,
    };
  });
}
