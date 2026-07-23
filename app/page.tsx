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
  title: "픽셀러 — 무료 셀러 키워드 분석 & AI 소싱 분석",
  description:
    "키워드를 입력하면 AI가 소싱 가능성을 분석해드립니다. 네이버 검색량 트렌드, 소싱 스코어, 마켓별 마진 계산까지 완전 무료.",
  alternates: { canonical: BASE_URL },
  openGraph: { url: BASE_URL },
};

export default async function HomePage() {
  const initialRanking = await getFirstCategoryRanking().catch(() => null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <HomeFaqJsonLd />

      {/* ── 히어로 + 검색창 ── */}
      <section className="text-center pt-8 pb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          키워드 하나로
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            AI 소싱 분석
          </span>
        </h1>

        {/* 검색창 — 히어로 중앙 배치 */}
        <div className="max-w-2xl mx-auto">
          <KeywordSearchForm />
        </div>

        <p className="text-xs text-gray-400 mt-3">
          예: 무선이어폰, 캠핑의자, 아이패드케이스
        </p>
      </section>

      {/* ── 상단 광고 ── */}
      <section className="mb-10 flex justify-center">
        <div className="hidden sm:block w-full max-w-[728px]">
          <AdSlot format="leaderboard" label="광고" />
        </div>
        <div className="sm:hidden w-full max-w-[320px]">
          <AdSlot format="mobile-banner" label="광고" />
        </div>
      </section>

      {/* ── AI 분석 미리보기 ── */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">✨ 이런 AI 분석을 받아보세요</h2>
            <p className="text-sm text-gray-400 mt-0.5">키워드를 검색하면 바로 확인할 수 있습니다</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {aiPreviewCards.map((card) => (
            <Link
              key={card.keyword}
              href={`/keyword/${encodeURIComponent(card.keyword)}`}
              className="group card p-5 hover:border-purple-200 hover:shadow-md transition-all"
            >
              {/* 키워드 + 등급 */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">
                  {card.keyword}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${card.gradeBg} ${card.gradeColor}`}>
                  {card.grade}등급
                </span>
              </div>

              {/* 미리보기 분석 텍스트 */}
              <div className="rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 p-3 mb-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-purple-700">AI 소싱 분석</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{card.preview}</p>
              </div>

              {/* 스코어 바 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400 w-12 shrink-0">검색량</span>
                  <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${card.searchPct}%` }} />
                  </div>
                  <span className="text-gray-400 text-xs">{card.trendScore}/30</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400 w-12 shrink-0">트렌드</span>
                  <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${card.trendPct}%` }} />
                  </div>
                  <span className="text-gray-400 text-xs">{card.directionScore}/20</span>
                </div>
              </div>

              <p className="text-xs text-purple-500 mt-3 group-hover:text-purple-700 transition-colors">
                직접 분석받기 →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 메인 콘텐츠 — 인기 키워드 + 기능 카드 ── */}
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

      {/* ── 가이드 배너 ── */}
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

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── 하단 광고 ── */}
      <section className="flex justify-center">
        <AdSlot format="large-rectangle" label="광고" />
      </section>
    </div>
  );
}

// AI 분석 미리보기 카드 (정적 예시 — 실제 키워드 페이지로 연결)
const aiPreviewCards = [
  {
    keyword: "무선이어폰",
    grade: "A",
    gradeColor: "text-blue-700",
    gradeBg: "bg-blue-50",
    trendScore: 24,
    directionScore: 20,
    searchPct: 80,
    trendPct: 100,
    preview: "**검색량 안정적, 상승 트렌드.** 경쟁이 치열하지만 프리미엄·게이밍 세분화 시장은 진입 여지 있음. 차별화 스펙(노이즈 캔슬링, 배터리)을 전면에 내세우세요.",
  },
  {
    keyword: "캠핑의자",
    grade: "B",
    gradeColor: "text-green-700",
    gradeBg: "bg-green-50",
    trendScore: 18,
    directionScore: 13,
    searchPct: 60,
    trendPct: 65,
    preview: "**봄·가을 시즌성 키워드.** 지금은 비수기지만 시즌 전 2~3개월 선점이 핵심. 경량·컴팩트 포지셔닝이 리뷰 전환율 높음.",
  },
  {
    keyword: "아이패드케이스",
    grade: "S",
    gradeColor: "text-purple-700",
    gradeBg: "bg-purple-50",
    trendScore: 27,
    directionScore: 20,
    searchPct: 90,
    trendPct: 100,
    preview: "**검색량 높고 상승 지속.** 신모델 출시 시즌과 맞물려 수요 급등 중. 기종별 호환성 명시와 빠른 배송이 전환율의 핵심.",
  },
];

const guideLinks = [
  {
    href: "/guides/ai-sourcing-analysis",
    badge: "AI 분석",
    badgeColor: "bg-purple-50 text-purple-600",
    title: "AI 소싱 분석이란? 작동 원리 & 활용법",
  },
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
];

const features = [
  {
    title: "키워드 분석",
    description: "검색량 트렌드, 소싱 스코어를 한눈에",
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
