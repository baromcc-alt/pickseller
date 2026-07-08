import type { Metadata } from "next";
import AdSlot from "@/components/ads/AdSlot";
import CompareClient from "./CompareClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";

export const metadata: Metadata = {
  title: "키워드 비교 — 최대 5개 동시 트렌드 분석 | 픽셀러",
  description:
    "무선이어폰 vs 블루투스이어폰 등 최대 5개 키워드 검색량 트렌드를 한 차트에서 비교하세요. 네이버 데이터랩 기반 무료 키워드 비교 도구.",
  alternates: { canonical: `${BASE_URL}/compare` },
  openGraph: { url: `${BASE_URL}/compare` },
};

export default function ComparePage({
  searchParams,
}: {
  searchParams: { keywords?: string };
}) {
  // URL: /compare?keywords=무선이어폰,블루투스이어폰,노이즈캔슬링
  const initial = searchParams.keywords
    ? searchParams.keywords.split(",").map((k) => k.trim()).filter(Boolean).slice(0, 5)
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">키워드 비교</h1>
        <p className="text-gray-500">최대 5개 키워드의 검색량 트렌드를 한 번에 비교하세요.</p>
      </div>

      {/* 상단 광고 */}
      <div className="mb-8 flex justify-center">
        <div className="hidden sm:block">
          <AdSlot format="leaderboard" label="광고" />
        </div>
        <div className="sm:hidden">
          <AdSlot format="mobile-banner" label="광고" />
        </div>
      </div>

      <CompareClient initialKeywords={initial} />
    </div>
  );
}
