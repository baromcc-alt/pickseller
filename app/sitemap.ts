import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";

// 항상 포함되는 정적 페이지
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/margin-calculator`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/login`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Supabase에 캐시된 키워드 목록 조회
  let keywordRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("keyword_trends")
      .select("keyword, fetched_at")
      .order("fetched_at", { ascending: false })
      .limit(500); // 최대 500개 키워드 페이지

    if (data) {
      // 중복 키워드 제거
      const unique = Array.from(new Map(data.map((r) => [r.keyword, r])).values());

      keywordRoutes = unique.map((row) => ({
        url: `${BASE_URL}/keyword/${encodeURIComponent(row.keyword)}`,
        lastModified: new Date(row.fetched_at),
        changeFrequency: "daily" as const,
        priority: 0.9,
      }));
    }
  } catch {
    // Supabase 오류 시 정적 페이지만 반환
  }

  // 초기 인기 키워드 — DB에 없어도 포함 (SSG 대상)
  const seedKeywords = POPULAR_KEYWORDS.filter(
    (kw) => !keywordRoutes.some((r) => r.url.includes(encodeURIComponent(kw)))
  ).map((kw) => ({
    url: `${BASE_URL}/keyword/${encodeURIComponent(kw)}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...STATIC_ROUTES, ...seedKeywords, ...keywordRoutes];
}

// 초기 SSG용 인기 키워드 시드
export const POPULAR_KEYWORDS = [
  "무선이어폰", "블루투스이어폰", "노이즈캔슬링이어폰",
  "스마트워치", "애플워치밴드", "갤럭시버즈",
  "보조배터리", "고속충전기", "c타입케이블",
  "텀블러", "보온병", "스탠리텀블러",
  "에어프라이어", "전기포트", "핸드블렌더",
  "요가매트", "폼롤러", "밴드운동기구",
  "마스크팩", "선크림", "비타민",
  "캐리어", "여행파우치", "여권케이스",
  "강아지간식", "고양이간식", "펫케어",
  "무선청소기", "로봇청소기", "걸레청소기",
  "LED스탠드", "무드등", "캠핑랜턴",
  "캠핑의자", "캠핑테이블", "텐트",
  "다이어트식품", "단백질쉐이크", "프로틴바",
  "노트북파우치", "마우스패드", "게이밍마우스",
];
