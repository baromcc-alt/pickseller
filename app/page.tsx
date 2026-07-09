import type { Metadata } from "next";
import Link from "next/link";
import KeywordSearchForm from "@/components/KeywordSearchForm";
import AdSlot from "@/components/ads/AdSlot";
import TrendingKeywords from "@/components/TrendingKeywords";
import FaqSection from "@/components/FaqSection";
import { HomeFaqJsonLd } from "@/components/JsonLd";
import { getFirstCategoryRanking } from "@/app/actions/trending-keywords";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";

export const metadata: Metadata = {
  title: "픽셀러 — 무료 셀러 키워드 분석 & 마진 계산기",
  description:
    "쿠팡·스마트스토어 셀러를 위한 무료 키워드 분석 도구. 네이버 검색량 트렌드, 마켓별 마진 계산, 손익분기 분석까지 완전 무료.",
  alternates: { canonical: BASE_URL },
  openGraph: { url: BASE_URL },
};

export default async function HomePage() {
  // 첫 번째 카테고리 랭킹 서버에서 미리 로드
  const initialRanking = await getFirstCategoryRanking().catch(() => null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <HomeFaqJsonLd />

      {/* 히어로 */}
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          팔릴 아이템을
          <br />
          <span className="text-blue-600">데이터로 골라드립니다</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
          키워드 검색량 트렌드, 마켓별 마진 계산까지. 완전 무료.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/margin-calculator" className="btn-primary px-6 py-3 text-base">
            마진 계산 시작하기
          </Link>
          <Link href="/login" className="btn-secondary px-6 py-3 text-base">
            무료로 시작하기
          </Link>
        </div>
      </section>

      {/* 상단 광고 */}
      <section className="mb-8 flex justify-center">
        <div className="hidden sm:block w-full max-w-[728px]">
          <AdSlot format="leaderboard" label="광고" />
        </div>
        <div className="sm:hidden w-full max-w-[320px]">
          <AdSlot format="mobile-banner" label="광고" />
        </div>
      </section>

      {/* 키워드 검색 */}
      <section className="max-w-2xl mx-auto mb-10">
        <KeywordSearchForm />
      </section>

      {/* 메인 콘텐츠 — 인기 키워드 + 기능 카드 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

        {/* 인기 키워드 랭킹 (2/3 너비) */}
        <div className="lg:col-span-2">
          <TrendingKeywords initialRanking={initialRanking} />
        </div>

        {/* 우측 — 기능 카드 + 사이드 광고 */}
        <div className="flex flex-col gap-4">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="card p-4 flex items-start gap-3 hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-100 transition-colors">
                {feature.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{feature.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{feature.description}</p>
              </div>
            </Link>
          ))}

          {/* 사이드 광고 */}
          <AdSlot format="rectangle" label="광고" className="mt-2" />
        </div>
      </section>

      {/* 가이드 배너 */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 text-lg">📖 셀러 가이드</h2>
          <Link href="/guides" className="text-sm text-blue-500 hover:text-blue-700 transition-colors">
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {guideLinks.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="card p-4 hover:border-blue-200 hover:shadow-sm transition-all group"
            >
              <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${g.badgeColor}`}>
                {g.badge}
              </span>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                {g.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* 하단 광고 */}
      <section className="flex justify-center">
        <AdSlot format="large-rectangle" label="광고" />
      </section>
    </div>
  );
}

const guideLinks = [
  {
    href: "/guides/margin-rate-calculation",
    badge: "마진율 계산",
    badgeColor: "bg-green-50 text-green-600",
    title: "마진율 계산법 완전 정복 — 공식·ROI·손익분기",
  },
  {
    href: "/guides/smartstore-fee-guide",
    badge: "수수료 가이드",
    badgeColor: "bg-blue-50 text-blue-600",
    title: "스마트스토어 수수료 완벽 가이드 2026",
  },
  {
    href: "/guides/coupang-margin-calculator",
    badge: "마진 계산기",
    badgeColor: "bg-orange-50 text-orange-600",
    title: "쿠팡 마진 계산기 완벽 가이드 2026",
  },
];

const features = [
  {
    title: "키워드 분석",
    description: "검색량 트렌드, 경쟁 강도를 한눈에",
    href: "/keyword/무선이어폰",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: "마진 계산기",
    description: "마켓별 수수료 자동 반영, 손익분기 계산",
    href: "/margin-calculator",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "트렌드 모니터링",
    description: "관심 키워드 검색 트렌드 실시간 추적",
    href: "/keyword/캠핑의자",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];
