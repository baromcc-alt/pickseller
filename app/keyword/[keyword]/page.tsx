import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TrendChart from "@/components/TrendChart";
import AdSlot from "@/components/ads/AdSlot";
import { KeywordPageJsonLd } from "@/components/JsonLd";
import { getKeywordTrend } from "@/app/actions/keyword-trends";
import { POPULAR_KEYWORDS } from "@/app/sitemap";
import type { KeywordTrendData } from "@/types/naver";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";

interface Props {
  params: Promise<{ keyword: string }>;
}

// 인기 키워드는 빌드 타임에 정적 생성 (SSG)
export async function generateStaticParams() {
  return POPULAR_KEYWORDS.map((keyword) => ({
    keyword: encodeURIComponent(keyword),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { keyword } = await params;
  const decoded = decodeURIComponent(keyword);
  const pageUrl = `${BASE_URL}/keyword/${encodeURIComponent(decoded)}`;

  return {
    title: `"${decoded}" 키워드 분석 — 검색량 트렌드, 경쟁 강도`,
    description: `네이버 쇼핑 "${decoded}" 키워드의 월별 검색량 트렌드와 경쟁 강도를 무료로 분석합니다. 스마트스토어·쿠팡 셀러를 위한 데이터 기반 아이템 소싱 도구.`,
    keywords: [decoded, `${decoded} 검색량`, `${decoded} 트렌드`, `${decoded} 판매`, "키워드 분석", "아이템 소싱"],
    alternates: { canonical: pageUrl },
    openGraph: {
      url: pageUrl,
      title: `"${decoded}" 키워드 분석 | 픽셀러`,
      description: `"${decoded}" 네이버 쇼핑 검색량 트렌드와 경쟁 강도를 무료로 확인하세요.`,
    },
  };
}

export default async function KeywordDetailPage({ params }: Props) {
  const { keyword } = await params;
  const decoded = decodeURIComponent(keyword);

  if (!decoded.trim()) notFound();

  let trendResult: { trends: KeywordTrendData[]; fromCache: boolean; fetchedAt: string } | null = null;
  let trendError: string | null = null;

  try {
    trendResult = await getKeywordTrend(decoded, 3);
  } catch (e) {
    trendError = e instanceof Error ? e.message : "트렌드 데이터를 불러오지 못했습니다.";
  }

  const updatedAt = trendResult
    ? new Date(trendResult.fetchedAt).toLocaleString("ko-KR")
    : new Date().toLocaleDateString("ko-KR");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <KeywordPageJsonLd
        keyword={decoded}
        trendData={trendResult?.trends?.map((t) => ({ period: t.period, ratio: t.ratio })) ?? []}
      />

      {/* 브레드크럼 */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-600">홈</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{decoded}</span>
      </nav>

      {/* 상단 광고 — 데스크톱 leaderboard / 모바일 mobile-banner */}
      <div className="mb-6 flex justify-center">
        <div className="hidden sm:block w-full max-w-[728px]">
          <AdSlot format="leaderboard" label="광고" />
        </div>
        <div className="sm:hidden w-full max-w-[320px]">
          <AdSlot format="mobile-banner" label="광고" />
        </div>
      </div>

      {/* 헤더 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-gray-900">
            &ldquo;{decoded}&rdquo; 키워드 분석
          </h1>
          {trendResult?.fromCache && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">캐시됨</span>
          )}
        </div>
        <p className="text-gray-400 text-sm">
          업데이트: {updatedAt}
          {trendResult && !trendResult.fromCache && (
            <span className="ml-2 text-blue-400">· 네이버 API 실시간</span>
          )}
        </p>
      </div>

      {/* 메인 레이아웃: 콘텐츠 + 사이드바 */}
      <div className="flex gap-6 items-start">

        {/* ── 콘텐츠 영역 ── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* 지표 카드 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-5">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-xs mt-1 ${stat.changePositive ? "text-green-500" : "text-red-400"}`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* 트렌드 차트 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-gray-900">검색량 트렌드</h2>
              <span className="text-xs text-gray-400">최근 3개월 · 주간</span>
            </div>
            {trendError ? (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-50 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
                </svg>
                {trendError}
              </div>
            ) : (
              <TrendChart data={trendResult?.trends ?? []} keyword={decoded} />
            )}
          </div>

          {/* 모바일 전용 — 본문 중간 광고 */}
          <div className="sm:hidden flex justify-center">
            <AdSlot format="large-rectangle" label="광고" />
          </div>

          {/* 연관 키워드 */}
          <div className="card p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">연관 키워드</h2>
            <div className="flex flex-wrap gap-2">
              {relatedKeywords(decoded).map((kw) => (
                <Link
                  key={kw}
                  href={`/keyword/${encodeURIComponent(kw)}`}
                  className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  {kw}
                </Link>
              ))}
            </div>
          </div>

          {/* 마진 계산 CTA */}
          <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-gray-900 mb-1">수익성을 계산해보세요</h2>
                <p className="text-sm text-gray-500">
                  &ldquo;{decoded}&rdquo; 상품의 예상 마진을 바로 계산할 수 있습니다.
                </p>
              </div>
              <Link
                href={`/margin-calculator?keyword=${encodeURIComponent(decoded)}`}
                className="btn-primary shrink-0"
              >
                마진 계산기로 이동
              </Link>
            </div>
          </div>
        </div>

        {/* ── 사이드바 광고 (데스크톱 전용) ── */}
        <aside className="hidden lg:flex flex-col gap-4 w-[300px] shrink-0">
          <AdSlot format="rectangle" label="광고" />
          {/* 스크롤 따라오는 sticky 사이드바 */}
          <div className="sticky top-20">
            <AdSlot format="rectangle" label="광고" />
          </div>
        </aside>
      </div>
    </div>
  );
}

const stats = [
  { label: "월 검색량", value: "—", change: "준비 중", changePositive: true },
  { label: "경쟁 강도", value: "—", change: "준비 중", changePositive: true },
  { label: "평균 판매가", value: "—", change: "준비 중", changePositive: true },
  { label: "상품 수", value: "—", change: "준비 중", changePositive: true },
];

function relatedKeywords(base: string) {
  return [`${base} 추천`, `${base} 가성비`, `${base} 인기`, `저렴한 ${base}`, `${base} 순위`];
}
