import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixeller.co.kr";

export const metadata: Metadata = {
  title: "셀러 가이드 — 마진 계산, 수수료, 키워드 분석 완벽 정리",
  description:
    "쿠팡·스마트스토어 셀러를 위한 가이드 모음. 마진율 계산법, 수수료 구조, 키워드 분석 방법을 무료로 제공합니다.",
  keywords: [
    "셀러 가이드", "마진 계산기", "스마트스토어 수수료", "쿠팡 수수료",
    "마진율 계산", "이커머스 셀러", "온라인 판매 가이드",
  ],
  alternates: { canonical: `${BASE_URL}/guides` },
  openGraph: {
    title: "셀러 가이드 — 픽셀러",
    description: "쿠팡·스마트스토어 셀러를 위한 마진, 수수료, 키워드 가이드 모음.",
    url: `${BASE_URL}/guides`,
    type: "website",
  },
};

const guides = [
  {
    href: "/guides/margin-rate-calculation",
    badge: "마진율 계산",
    badgeColor: "bg-green-50 text-green-600",
    title: "마진율 계산법 완전 정복",
    description: "마진율 공식, ROI, 손익분기 판매가 계산법을 실제 예시와 함께 정리했습니다. 이커머스 셀러가 반드시 알아야 할 필수 공식.",
    tags: ["마진율", "ROI", "손익분기"],
  },
  {
    href: "/guides/smartstore-fee-guide",
    badge: "수수료 가이드",
    badgeColor: "bg-blue-50 text-blue-600",
    title: "스마트스토어 수수료 완벽 가이드 2026",
    description: "매출연동수수료 5.6%, 네이버페이 결제수수료 3.74% — 스마트스토어 수수료 구조와 실제 계산 예시를 한눈에 정리했습니다.",
    tags: ["스마트스토어", "수수료", "정산"],
  },
  {
    href: "/guides/coupang-margin-calculator",
    badge: "마진 계산기",
    badgeColor: "bg-orange-50 text-orange-600",
    title: "쿠팡 마진 계산기 완벽 가이드 2026",
    description: "아이템위너·로켓그로스 수수료 구조와 실제 마진 계산 예시. 쿠팡에서 얼마나 남는지 정확히 파악하는 방법을 안내합니다.",
    tags: ["쿠팡", "아이템위너", "로켓그로스"],
  },
];

export default function GuidesIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 헤더 */}
      <div className="mb-10">
        <nav className="text-sm text-gray-400 mb-4 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
          <span>/</span>
          <span className="text-gray-600">가이드</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">셀러 가이드</h1>
        <p className="text-lg text-gray-500">
          쿠팡·스마트스토어 셀러를 위한 마진, 수수료, 키워드 분석 가이드를 무료로 제공합니다.
        </p>
      </div>

      {/* 가이드 카드 목록 */}
      <div className="space-y-4">
        {guides.map((guide) => (
          <Link key={guide.href} href={guide.href} className="card p-6 block hover:border-blue-300 hover:shadow-sm transition-all group">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${guide.badgeColor}`}>
                  {guide.badge}
                </span>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {guide.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{guide.description}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-gray-300 group-hover:text-blue-400 text-xl transition-colors shrink-0 mt-1">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* 도구 바로가기 */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">바로 사용할 수 있는 무료 도구</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/margin-calculator" className="card p-5 hover:border-blue-300 transition-colors group flex items-center gap-4">
            <span className="text-3xl">📊</span>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">마진 계산기</h3>
              <p className="text-xs text-gray-400 mt-0.5">수수료 자동 반영 · 손익분기 · ROI</p>
            </div>
          </Link>
          <Link href="/" className="card p-5 hover:border-blue-300 transition-colors group flex items-center gap-4">
            <span className="text-3xl">🔥</span>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">인기 키워드 분석</h3>
              <p className="text-xs text-gray-400 mt-0.5">네이버 데이터랩 기반 · 매일 업데이트</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
