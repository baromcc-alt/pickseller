// ────────────────────────────────────────────
// 네이버 데이터랩 검색어트렌드 API 타입
// https://developers.naver.com/docs/serviceapi/datalab/search/datalab.search.api.md
// ────────────────────────────────────────────

export interface NaverDatalabSearchRequest {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  timeUnit: "date" | "week" | "month";
  keywordGroups: NaverKeywordGroup[];
  device?: "pc" | "mo";   // 생략 시 전체
  gender?: "m" | "f";     // 생략 시 전체
  ages?: NaverAgeGroup[]; // 생략 시 전체
}

export interface NaverKeywordGroup {
  groupName: string;    // 그룹 표시명
  keywords: string[];   // 묶을 키워드 배열 (최대 5개)
}

export type NaverAgeGroup =
  | "1"  // 0~12세
  | "2"  // 13~18세
  | "3"  // 19~24세
  | "4"  // 25~29세
  | "5"  // 30~34세
  | "6"  // 35~39세
  | "7"  // 40~44세
  | "8"  // 45~49세
  | "9"  // 50~54세
  | "10" // 55~59세
  | "11"; // 60세 이상

export interface NaverDatalabSearchResponse {
  startDate: string;
  endDate: string;
  timeUnit: string;
  results: NaverTrendResult[];
}

export interface NaverTrendResult {
  title: string;
  keywords: string[];
  data: NaverTrendDataPoint[];
}

export interface NaverTrendDataPoint {
  period: string; // YYYY-MM-DD (timeUnit에 따라 형식 다름)
  ratio: number;  // 0~100 상대 검색량 지수
}

// ────────────────────────────────────────────
// 네이버 쇼핑인사이트 카테고리별 인기 키워드 API
// https://developers.naver.com/docs/serviceapi/datalab/shopping/datalab.shopping.api.md
// ────────────────────────────────────────────

export interface NaverShoppingKeywordsRequest {
  startDate: string;
  endDate: string;
  timeUnit: "date" | "week" | "month";
  category: string;   // 카테고리 코드
  device?: "pc" | "mo";
  gender?: "m" | "f";
  ages?: NaverAgeGroup[];
}

export interface NaverShoppingKeywordsResponse {
  startDate: string;
  endDate: string;
  timeUnit: string;
  results: NaverShoppingKeywordResult[];
}

export interface NaverShoppingKeywordResult {
  title: string;
  keywords: string[];
  data: NaverTrendDataPoint[];
}

// ────────────────────────────────────────────
// 내부에서 사용하는 통합 결과 타입
// ────────────────────────────────────────────

export interface KeywordTrendData {
  keyword: string;
  period: string;
  ratio: number;
}

export interface KeywordTrendResult {
  keyword: string;
  trends: KeywordTrendData[];
  fetchedAt: string;
  fromCache: boolean;
}
