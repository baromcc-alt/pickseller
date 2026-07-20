import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TrendChart from "@/components/TrendChart";
import AdSlot from "@/components/ads/AdSlot";
import SourcingScoreCard from "@/components/SourcingScoreCard";
import { KeywordPageJsonLd } from "@/components/JsonLd";
import { getKeywordTrend } from "@/app/actions/keyword-trends";
import { getSourcingScore } from "@/app/actions/sourcing-score";
import { POPULAR_KEYWORDS } from "@/app/sitemap";
import type { KeywordTrendData } from "@/types/naver";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";

// ISR: 24시간 캐시 — 봇이 반복 접근해도 SSR 재실행 안 함
export const revalidate = 86400;

interface Props {
  params: Promise<{ keyword: string }>;
}

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
    title: `"${decoded}" 키워드 분석 — 소싱 스코어, 검색량 트렌드`,
    description: `네이버 쇼핑 "${decoded}" 키워드의 소싱 스코어, 월별 검색량 트렌드, 경쟁 강도를 무료로 분석합니다. 스마트스토어·쿠팡 셀러를 위한 데이터 기반 아이템 소싱 도구.`,
    keywords: [decoded, `${decoded} 검색량`, `${decoded} 트렌드`, `${decoded} 소싱`, "키워드 분석", "아이템 소싱"],
    alternates: { canonical: pageUrl },
    openGraph: {
      url: pageUrl,
      title: `"${decoded}" 키워드 분석 | 픽셀러`,
      description: `"${decoded}" 소싱 스코어, 네이버 쇼핑 검색량 트렌드와 경쟁 강도를 무료로 확인하세요.`,
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

  // 소싱 스코어 (DataLab + 쇼핑 API 통합) — 실패해도 페이지는 표시
  const sourcingScore = await getSourcingScore(decoded).catch(() => null);

  const updatedAt = trendResult
    ? new Date(trendResult.fetchedAt).toLocaleString("ko-KR")
    : new Date().toLocaleDateString("ko-KR");

  // stats 카드 — 소싱 스코어 데이터로 채움
  const stats = [
    {
      label: "소싱 스코어",
      value: sourcingScore ? `${sourcingScore.total}점` : "—",
      change: sourcingScore ? `${sourcingScore.grade}등급 · ${sourcingScore.label}` : "준비 중",
      changePositive: sourcingScore ? sourcingScore.total >= 50 : true,
    },
    {
      label: "트렌드",
      value: sourcingScore ? sourcingScore.direction : "—",
      change: sourcingScore ? `${sourcingScore.momentum > 0 ? "+" : ""}${sourcingScore.momentum}%` : "준비 중",
      changePositive: sourcingScore ? sourcingScore.momentum >= 0 : true,
    },
    {
      label: "경쟁 강도",
      value: sourcingScore ? sourcingScore.competitionLevel : "—",
      change: sourcingScore ? `상품 ${sourcingScore.productCount.toLocaleString()}개` : "준비 중",
      changePositive: sourcingScore ? sourcingScore.competitionScore >= 20 : true,
    },
    {
      label: "평균 판매가",
      value: sourcingScore?.avgPrice ? `${sourcingScore.avgPrice.toLocaleString()}원` : "—",
      change: "네이버 쇼핑 기준",
      changePositive: true,
    },
  ];

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

      {/* 상단 광고 */}
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

      {/* 기능 설명 배너 */}
      <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/60 px-5 py-4">
        <p className="text-sm font-semibold text-blue-800 mb-3">
          🎯 이 페이지에서 할 수 있는 것
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-start gap-2.5">
            <span className="text-base shrink-0 mt-0.5">📊</span>
            <div>
              <p className="text-sm font-medium text-gray-800">소싱 스코어 확인</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                검색량·트렌드·경쟁 강도를 종합해 이 키워드가 <strong>지금 팔기 좋은지</strong> 0~100점으로 평가합니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-base shrink-0 mt-0.5">📈</span>
            <div>
              <p className="text-sm font-medium text-gray-800">검색량 트렌드 분석</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                최근 3개월 네이버 검색량 흐름으로 <strong>지금이 진입 타이밍인지</strong> 판단하세요.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-base shrink-0 mt-0.5">✨</span>
            <div>
              <p className="text-sm font-medium text-gray-800">AI 소싱 분석</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                데이터를 AI가 해석해 <strong>소싱 전략과 주의사항</strong>을 바로 제안합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 레이아웃 */}
      <div className="flex gap-6 items-start">

        {/* ── 콘텐츠 영역 ── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* 지표 카드 4개 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-5">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 leading-tight">{stat.value}</p>
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

          {/* 모바일 전용 — 소싱 스코어 카드 */}
          {sourcingScore && (
            <div className="lg:hidden">
              <SourcingScoreCard keyword={decoded} score={sourcingScore} />
            </div>
          )}

          {/* 모바일 중간 광고 */}
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
                  rel="nofollow"
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
                  {sourcingScore?.avgPrice && ` 평균 판매가 ${sourcingScore.avgPrice.toLocaleString()}원 기준.`}
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

        {/* ── 사이드바 (데스크톱 전용) ── */}
        <aside className="hidden lg:flex flex-col gap-4 w-[300px] shrink-0">
          {/* 소싱 스코어 카드 */}
          {sourcingScore && (
            <SourcingScoreCard keyword={decoded} score={sourcingScore} />
          )}

          {/* 광고 */}
          {!sourcingScore && <AdSlot format="rectangle" label="광고" />}
          <div className="sticky top-20">
            <AdSlot format="rectangle" label="광고" />
          </div>
        </aside>
      </div>
    </div>
  );
}

function relatedKeywords(base: string) {
  return [`${base} 추천`, `${base} 가성비`, `${base} 인기`, `저렴한 ${base}`, `${base} 순위`];
}
