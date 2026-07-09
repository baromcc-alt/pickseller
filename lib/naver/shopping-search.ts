/**
 * 네이버 쇼핑 검색 API
 * https://developers.naver.com/docs/serviceapi/search/shopping/shopping.md
 *
 * 용도: 키워드별 네이버 쇼핑 등록 상품 수 조회 → 경쟁 강도 산출
 * 일일 한도: 25,000건 (데이터랩 1,000건보다 훨씬 여유)
 *
 * ⚠️ 사용 전 Naver 개발자센터 앱에 "검색" API 사용 신청 필요
 */

export interface NaverShoppingSearchResult {
  total: number;         // 전체 등록 상품 수
  items: {
    title: string;
    link: string;
    lprice: string;      // 최저가
    hprice: string;      // 최고가
    mallName: string;
  }[];
}

export async function fetchShoppingProductCount(keyword: string): Promise<number> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("NAVER_CLIENT_ID 또는 NAVER_CLIENT_SECRET 환경변수가 없습니다.");
  }

  const url = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(keyword)}&display=5&sort=sim`;

  const res = await fetch(url, {
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`네이버 쇼핑 API 오류 [${res.status}]: ${text}`);
  }

  const data = (await res.json()) as NaverShoppingSearchResult;
  return data.total;
}

/**
 * 평균 판매가 조회 (상위 5개 최저가 평균)
 */
export async function fetchShoppingAvgPrice(keyword: string): Promise<number | null> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  const url = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(keyword)}&display=5&sort=sim`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = (await res.json()) as NaverShoppingSearchResult;
    const prices = data.items
      .map((item) => parseInt(item.lprice, 10))
      .filter((p) => p > 0);

    if (prices.length === 0) return null;
    return Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  } catch {
    return null;
  }
}
