import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";
import SourcingScoreCard from "@/components/SourcingScoreCard";
import { KeywordPageJsonLd } from "@/components/JsonLd";
import { getSourcingScore } from "@/app/actions/sourcing-score";
import { getKeywordAdData } from "@/app/actions/keyword-search-ad";
import { POPULAR_KEYWORDS } from "@/app/sitemap";
import type { KeywordAdItem } from "@/lib/naver/search-ad";
import { InlineKeywordSearch } from "@/components/KeywordSearchForm";

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
    title: `"${decoded}" 키워드 분석 — 소싱 스코어, 경쟁강도, 연관 키워드`,
    description: `네이버 "${decoded}" 키워드의 소싱 스코어, 월 검색량, 경쟁강도를 무료로 분석합니다. 스마트스토어·쿠팡 셀러를 위한 데이터 기반 아이템 소싱 도구.`,
    keywords: [decoded, `${decoded} 검색량`, `${decoded} 소싱`, `${decoded} 경쟁강도`, "키워드 분석", "아이템 소싱"],
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

  // 소싱 스코어 + 연관 키워드 — 실패해도 페이지는 표시
  const [sourcingScore, adData] = await Promise.allSettled([
    getSourcingScore(decoded),
    getKeywordAdData(decoded),
  ]).then(([s, a]) => [
    s.status === "fulfilled" ? s.value : null,
    a.status === "fulfilled" ? a.value : null,
  ]);

  const updatedAt = adData?.fetchedAt
    ? new Date(adData.fetchedAt).toLocaleString("ko-KR")
    : new Date().toLocaleDateString("ko-KR");

  // 소싱 기회 키워드: 검색량 높고 경쟁 낮음/보통 순 정렬
  const opportunityKeywords = getOpportunityKeywords(adData?.related ?? []);

  // stats 카드
  const monthlyTotal = sourcingScore?.monthlyTotal ?? 0;
  const stats = [
    {
      label: "소싱 스코어",
      value: sourcingScore ? `${sourcingScore.total}점` : "—",
      change: sourcingScore ? `${sourcingScore.grade}등급 · ${sourcingScore.label}` : "준비 중",
      changePositive: sourcingScore ? sourcingScore.total >= 50 : true,
    },
    {
      label: "월 검색량",
      value: monthlyTotal > 0
        ? monthlyTotal >= 10000 ? `${(monthlyTotal / 10000).toFixed(1)}만` : monthlyTotal.toLocaleString("ko-KR")
        : "—",
      change: sourcingScore ? `PC+모바일 합산` : "준비 중",
      changePositive: true,
    },
    {
      label: "경쟁강도",
      value: sourcingScore ? sourcingScore.compIdx : "—",
      change: sourcingScore?.compIdx === "낮음" ? "진입 유리" : sourcingScore?.compIdx === "보통" ? "보통 수준" : "경쟁 치열",
      changePositive: sourcingScore ? sourcingScore.compIdx !== "높음" : true,
    },
    {
      label: "트렌드",
      value: sourcingScore ? sourcingScore.direction : "—",
      change: sourcingScore ? `${sourcingScore.momentum > 0 ? "+" : ""}${sourcingScore.momentum}%` : "준비 중",
      changePositive: sourcingScore ? sourcingScore.momentum >= 0 : true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <KeywordPageJsonLd keyword={decoded} trendData={[]} />

      {/* 브레드크럼 */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-600">홈</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{decoded}</span>
      </nav>

      {/* 인라인 검색바 */}
      <div className="mb-5">
        <InlineKeywordSearch currentKeyword={decoded} />
      </div>

      {/* 헤더 */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-gray-900">
            &ldquo;{decoded}&rdquo; 키워드 분석
          </h1>
          {adData?.fromCache && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">캐시됨</span>
          )}
        </div>
        <p className="text-gray-400 text-sm">업데이트: {updatedAt}</p>
      </div>

      {/* 상단 광고 */}
      <div className="mb-6 flex justify-center">
        <div className="hidden sm:block w-full max-w-[728px]">
          <AdSlot format="leaderboard" label="광고" />
        </div>
        <div className="sm:hidden w-full max-w-[320px]">
          <AdSlot format="mobile-banner" label="광고" />
        </div>
      </div>

      {/* 키워드 소개 텍스트 — 고유 콘텐츠 */}
      <div className="mb-6 prose-custom">
        <KeywordIntro
          keyword={decoded}
          monthlyTotal={sourcingScore?.monthlyTotal ?? adData?.monthlyTotalQcCnt ?? 0}
          compIdx={sourcingScore?.compIdx ?? adData?.compIdx ?? ""}
          score={sourcingScore?.total ?? null}
          relatedSample={(adData?.related ?? []).slice(0, 3).map((r) => r.relKeyword)}
        />
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
                검색량·경쟁강도·트렌드를 종합해 이 키워드가 <strong>지금 팔기 좋은지</strong> 0~100점으로 평가합니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-base shrink-0 mt-0.5">💡</span>
            <div>
              <p className="text-sm font-medium text-gray-800">대체 소싱 키워드 발굴</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                연관 키워드 중 <strong>검색량 대비 경쟁이 낮은</strong> 소싱 기회 아이템을 자동으로 추려드립니다.
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

          {/* 소싱 가이드 텍스트 섹션 */}
          <KeywordGuideSection
            keyword={decoded}
            monthlyTotal={sourcingScore?.monthlyTotal ?? 0}
            compIdx={sourcingScore?.compIdx ?? adData?.compIdx ?? ""}
            score={sourcingScore?.total ?? null}
            direction={sourcingScore?.direction ?? ""}
            momentum={sourcingScore?.momentum ?? 0}
          />

          {/* 모바일 전용 — 소싱 스코어 카드 (API 실패해도 항상 표시) */}
          <div className="lg:hidden">
            <SourcingScoreCard keyword={decoded} score={sourcingScore} />
          </div>

          {/* 모바일 중간 광고 */}
          <div className="sm:hidden flex justify-center">
            <AdSlot format="large-rectangle" label="광고" />
          </div>

          {/* 연관 키워드 — 검색광고 API 실데이터 우선, fallback 수동 생성 */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">연관 키워드</h2>
              {adData?.related && adData.related.length > 0 && (
                <span className="text-xs text-gray-400">월 검색량 순</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {(adData?.related && adData.related.length > 0
                ? adData.related.slice(0, 12)
                : relatedKeywords(decoded)
              ).map((item) => {
                const kw = typeof item === "string" ? item : item.relKeyword;
                const cnt = typeof item === "string" ? 0 : item.monthlyTotalQcCnt;
                return (
                  <Link
                    key={kw}
                    href={`/keyword/${encodeURIComponent(kw)}`}
                    rel="nofollow"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    <span>{kw}</span>
                    {cnt > 0 && (
                      <span className="text-xs text-blue-400">
                        {cnt >= 10000 ? `${(cnt / 10000).toFixed(0)}만` : cnt.toLocaleString("ko-KR")}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 대체 가능한 아이템 — 소싱 기회 키워드 */}
          {opportunityKeywords.length > 0 && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-semibold text-gray-900">💡 지금 노려볼 만한 아이템</h2>
                <span className="text-xs text-gray-400">검색량 대비 경쟁 낮음 순</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                &ldquo;{decoded}&rdquo; 연관 키워드 중 검색량은 충분하고 경쟁강도가 낮은 소싱 기회 키워드입니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {opportunityKeywords.map((item) => (
                  <Link
                    key={item.relKeyword}
                    href={`/keyword/${encodeURIComponent(item.relKeyword)}`}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-100 px-4 py-3 transition-colors group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium text-gray-800 truncate group-hover:text-blue-700">
                        {item.relKeyword}
                      </span>
                      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.compIdx === "낮음"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {item.compIdx}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-xs text-gray-500">
                        {item.monthlyTotalQcCnt >= 10000
                          ? `${(item.monthlyTotalQcCnt / 10000).toFixed(1)}만`
                          : item.monthlyTotalQcCnt.toLocaleString("ko-KR")}
                      </span>
                      <span className="text-xs text-gray-300">검색/월</span>
                      <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

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

        {/* ── 사이드바 (데스크톱 전용) ── */}
        <aside className="hidden lg:flex flex-col gap-4 w-[300px] shrink-0">
          {/* 소싱 스코어 카드 — API 실패해도 항상 표시 */}
          <SourcingScoreCard keyword={decoded} score={sourcingScore} />

          <div className="sticky top-20">
            <AdSlot format="rectangle" label="광고" />
          </div>
        </aside>
      </div>
    </div>
  );
}

// ── 키워드 소싱 가이드 섹션 ───────────────────────────────────
interface KeywordGuideSectionProps {
  keyword: string;
  monthlyTotal: number;
  compIdx: string;
  score: number | null;
  direction: string;
  momentum: number;
}

function KeywordGuideSection({ keyword, monthlyTotal, compIdx, score, direction, momentum }: KeywordGuideSectionProps) {
  if (!compIdx) return null;

  // ① 시장 분석
  const marketPara = (() => {
    const vol =
      monthlyTotal >= 100000 ? "월 10만 건 이상 검색되는 대형 카테고리" :
      monthlyTotal >= 30000  ? `월 약 ${(monthlyTotal / 10000).toFixed(1)}만 건 검색되는 인기 카테고리` :
      monthlyTotal >= 10000  ? `월 약 ${(monthlyTotal / 10000).toFixed(1)}만 건 검색되는 꾸준한 수요 카테고리` :
      monthlyTotal >= 3000   ? `월 약 ${monthlyTotal.toLocaleString("ko-KR")}건 검색되는 중간 규모 아이템` :
      monthlyTotal >= 500    ? `월 약 ${monthlyTotal.toLocaleString("ko-KR")}건 검색되는 틈새 아이템` :
      "검색 수요가 있는 아이템";

    if (compIdx === "낮음" && monthlyTotal >= 10000)
      return `"${keyword}"은(는) ${vol}임에도 경쟁강도가 낮은 편입니다. 아직 시장이 충분히 개척되지 않았거나 공급이 수요를 따라가지 못하는 상태일 가능성이 높습니다. 지금 진입하면 후발 경쟁자보다 유리한 위치를 선점할 수 있습니다.`;
    if (compIdx === "낮음")
      return `"${keyword}"은(는) ${vol}으로, 경쟁강도가 낮아 신규 셀러가 진입하기 좋은 조건입니다. 수요 대비 공급이 적은 만큼 적절한 품질의 상품만으로도 상위 노출이 가능합니다.`;
    if (compIdx === "보통" && monthlyTotal >= 30000)
      return `"${keyword}"은(는) ${vol}입니다. 경쟁강도는 보통 수준으로, 수요는 충분하지만 이미 여러 셀러가 활동 중입니다. 상세페이지 완성도와 초기 리뷰 확보가 경쟁력을 좌우합니다.`;
    if (compIdx === "보통")
      return `"${keyword}"은(는) ${vol}입니다. 경쟁강도가 보통 수준으로, 차별화된 소싱과 최적화된 상세페이지가 있다면 충분히 수익을 낼 수 있는 시장입니다.`;
    if (monthlyTotal >= 30000)
      return `"${keyword}"은(는) ${vol}이지만 경쟁강도가 높습니다. 상위 판매자들이 수백 개 이상의 리뷰와 낮은 가격으로 시장을 점유하고 있어, 같은 키워드로 정면 경쟁하면 마진이 빠르게 줄어듭니다.`;
    return `"${keyword}"은(는) ${vol}으로 경쟁이 치열합니다. 동일 키워드로 진입하기보다 아래 연관 키워드 중 경쟁이 낮은 틈새를 공략하는 것이 더 현실적인 전략입니다.`;
  })();

  // ② 소싱 전략
  const strategyPara = (() => {
    if (compIdx === "낮음")
      return `소싱 전략으로는 먼저 10~30개 소량 테스트 발주를 권장합니다. 경쟁이 낮은 만큼 기본적인 품질과 상세페이지만으로도 상위 노출이 가능하며, 판매 데이터가 쌓이면 재발주량을 늘리는 방식으로 안전하게 스케일업할 수 있습니다. 지금이 선점 효과를 누릴 수 있는 적기입니다.`;
    if (compIdx === "보통")
      return `소싱 전략은 차별화에 집중하는 것이 핵심입니다. 동일한 스펙의 상품보다는 번들 구성, 사은품 추가, 또는 특정 타깃을 위한 패키지로 가치를 높이세요. 소량 테스트로 시작해 전환율과 리뷰 반응을 확인한 뒤, 성과가 좋은 상품에 집중 투자하는 방식이 효과적입니다.`;
    return `이 키워드에서 수익을 내려면 차별화가 필수입니다. 가격 경쟁 대신 번들 구성, 독점 디자인, 특수 기능 추가 등으로 비교가 어렵게 만드는 전략이 필요합니다. 또는 아래 '지금 노려볼 만한 아이템'처럼 경쟁이 낮은 연관 키워드를 공략하는 것이 장기적으로 더 효율적입니다.`;
  })();

  // ③ 주의사항
  const warningPara = (() => {
    const trendPart =
      direction === "하락" ? `최근 ${Math.abs(momentum)}% 검색량이 감소하는 추세로, 시즌 종료나 트렌드 변화 가능성을 열어두고 대량 재고 선주문은 피하는 것이 좋습니다.` :
      direction === "상승" ? `검색량이 ${momentum}% 상승 중이라 시장이 성장하고 있지만, 상승 구간에는 신규 셀러 진입도 빠르게 늘어납니다. 빠른 소싱 결정이 유리합니다.` :
      "검색량이 안정적으로 유지되고 있어 예측 가능한 수요를 기대할 수 있습니다.";

    if (compIdx === "높음")
      return `주의사항: ${trendPart} 마진 계산 없이 진입하면 수수료·배송비·광고비를 빼고 남는 것이 거의 없는 경우가 많습니다. 소싱 전 반드시 마진 계산기로 손익을 확인하세요.`;
    return `주의사항: ${trendPart} 소량 테스트 후 반품률과 CS 빈도를 확인하고 발주량을 결정하세요. 예상치 못한 반품은 마진을 빠르게 잠식합니다.`;
  })();

  // ④ 관련 가이드
  const guides = [
    { href: "/guides/item-sourcing-guide", label: "아이템 소싱 방법 가이드", desc: "데이터 기반 소싱 전략" },
    { href: "/guides/margin-rate-calculation", label: "마진율 계산법", desc: "소싱 전 수익성 확인" },
    ...(compIdx === "높음" ? [{ href: "/guides/smartstore-beginners-guide", label: "스마트스토어 SEO 최적화", desc: "상위 노출 전략" }] : []),
    ...(compIdx === "낮음" ? [{ href: "/guides/online-shopping-startup-guide", label: "온라인 쇼핑몰 창업 가이드", desc: "처음 시작하는 법" }] : []),
  ];

  return (
    <div className="card p-6 space-y-5">
      <h2 className="text-base font-semibold text-gray-900">
        📋 &ldquo;{keyword}&rdquo; 소싱 가이드
      </h2>

      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>{marketPara}</p>
        <p>{strategyPara}</p>
        <p>{warningPara}</p>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">관련 가이드</p>
        <div className="flex flex-wrap gap-2">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
            >
              {g.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 키워드 소개 텍스트 컴포넌트 ──────────────────────────────
interface KeywordIntroProps {
  keyword: string;
  monthlyTotal: number;
  compIdx: string;
  score: number | null;
  relatedSample: string[];
}

function KeywordIntro({ keyword, monthlyTotal, compIdx, score, relatedSample }: KeywordIntroProps) {
  // 검색량 구간 표현
  const volumeDesc =
    monthlyTotal >= 100000
      ? `월 ${(monthlyTotal / 10000).toFixed(0)}만 건 이상 검색되는 대형 카테고리`
      : monthlyTotal >= 30000
      ? `월 약 ${(monthlyTotal / 10000).toFixed(1)}만 건 검색되는 인기 카테고리`
      : monthlyTotal >= 10000
      ? `월 약 ${(monthlyTotal / 10000).toFixed(1)}만 건 검색되는 꾸준한 수요 아이템`
      : monthlyTotal >= 3000
      ? `월 약 ${monthlyTotal.toLocaleString("ko-KR")}건 검색되는 중간 규모 아이템`
      : monthlyTotal >= 500
      ? `월 약 ${monthlyTotal.toLocaleString("ko-KR")}건 검색되는 틈새 아이템`
      : "네이버 쇼핑에서 검색 수요가 있는 아이템";

  // 경쟁강도 설명
  const compDesc =
    compIdx === "낮음"
      ? "경쟁강도가 낮아 신규 셀러도 진입하기 유리한 편입니다."
      : compIdx === "보통"
      ? "경쟁강도가 보통 수준으로, 상품 품질과 상세페이지 최적화가 당락을 가릅니다."
      : compIdx === "높음"
      ? "경쟁강도가 높아 가격·리뷰·상세페이지 등 전방위 경쟁이 필요합니다."
      : "경쟁 데이터를 분석 중입니다.";

  // 소싱 스코어 기반 총평
  const scoreDesc =
    score === null
      ? null
      : score >= 70
      ? `소싱 스코어 ${score}점으로, 검색량과 경쟁 구도 모두 셀러에게 유리한 상황입니다.`
      : score >= 50
      ? `소싱 스코어 ${score}점으로 평균 이상입니다. 연관 키워드 중 더 좋은 기회를 찾아볼 수 있습니다.`
      : score >= 30
      ? `소싱 스코어 ${score}점입니다. 경쟁이 있는 편이므로, 아래 '지금 노려볼 만한 아이템'을 참고해 틈새 키워드를 노려보세요.`
      : `소싱 스코어 ${score}점으로 진입 난이도가 높습니다. 연관 키워드 중 경쟁이 낮은 대안을 찾는 것을 권장합니다.`;

  // 연관 키워드 언급
  const relatedText =
    relatedSample.length >= 2
      ? `연관 키워드로는 ${relatedSample.slice(0, 3).join(", ")} 등이 함께 검색됩니다.`
      : null;

  return (
    <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
      <p>
        <strong className="text-gray-800">&ldquo;{keyword}&rdquo;</strong>은(는) {volumeDesc}입니다.{" "}
        {compDesc}
        {relatedText && ` ${relatedText}`}
      </p>
      {scoreDesc && (
        <p>{scoreDesc} 아래 소싱 스코어 세부 지표와 AI 분석을 통해 소싱 전략을 세워보세요.</p>
      )}
    </div>
  );
}

function relatedKeywords(base: string) {
  return [`${base} 추천`, `${base} 가성비`, `${base} 인기`, `저렴한 ${base}`, `${base} 순위`];
}

// 소싱 기회 키워드: 낮음/보통 경쟁강도 우선, 검색량 높은 순 top 8
function getOpportunityKeywords(related: KeywordAdItem[]): KeywordAdItem[] {
  const compMultiplier = (c: string) => c === "낮음" ? 1.5 : c === "보통" ? 1.0 : 0;
  return [...related]
    .filter((item) => item.compIdx !== "높음" && item.monthlyTotalQcCnt >= 100)
    .sort((a, b) => {
      const scoreA = a.monthlyTotalQcCnt * compMultiplier(a.compIdx);
      const scoreB = b.monthlyTotalQcCnt * compMultiplier(b.compIdx);
      return scoreB - scoreA;
    })
    .slice(0, 8);
}
