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
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
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
        <div className="shrink-0">
          <InlineKeywordSearch currentKeyword={decoded} />
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
