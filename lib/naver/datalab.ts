import type {
  NaverDatalabSearchRequest,
  NaverDatalabSearchResponse,
} from "@/types/naver";

const NAVER_API_BASE = "https://openapi.naver.com/v1/datalab";

function getNaverHeaders() {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "NAVER_CLIENT_ID 또는 NAVER_CLIENT_SECRET 환경변수가 설정되지 않았습니다."
    );
  }

  return {
    "X-Naver-Client-Id": clientId,
    "X-Naver-Client-Secret": clientSecret,
    "Content-Type": "application/json",
  };
}

/**
 * 네이버 데이터랩 검색어트렌드 API 호출
 * 여러 키워드 그룹의 상대적 검색량 트렌드를 반환합니다.
 */
export async function fetchSearchTrend(
  request: NaverDatalabSearchRequest
): Promise<NaverDatalabSearchResponse> {
  const res = await fetch(`${NAVER_API_BASE}/search`, {
    method: "POST",
    headers: getNaverHeaders(),
    body: JSON.stringify(request),
    // Next.js 캐시 미사용 (Supabase에서 직접 관리)
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `네이버 API 오류 [${res.status}]: ${text}`
    );
  }

  return res.json() as Promise<NaverDatalabSearchResponse>;
}

/**
 * 단일 키워드의 최근 N개월 트렌드 조회 (편의 함수)
 */
export async function fetchKeywordTrend(
  keyword: string,
  months = 3
): Promise<NaverDatalabSearchResponse> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  return fetchSearchTrend({
    startDate: fmt(startDate),
    endDate: fmt(endDate),
    timeUnit: "week",
    keywordGroups: [
      {
        groupName: keyword,
        keywords: [keyword],
      },
    ],
  });
}

/**
 * 여러 키워드를 한 번에 비교 조회 (최대 5개 그룹)
 */
export async function fetchKeywordsTrend(
  keywords: string[],
  months = 3
): Promise<NaverDatalabSearchResponse> {
  if (keywords.length > 5) {
    throw new Error("한 번에 최대 5개 키워드만 비교할 수 있습니다.");
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  return fetchSearchTrend({
    startDate: fmt(startDate),
    endDate: fmt(endDate),
    timeUnit: "week",
    keywordGroups: keywords.map((kw) => ({
      groupName: kw,
      keywords: [kw],
    })),
  });
}
