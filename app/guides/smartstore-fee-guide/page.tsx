import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixeller.co.kr";
const PAGE_URL = `${BASE_URL}/guides/smartstore-fee-guide`;

export const metadata: Metadata = {
  title: "스마트스토어 수수료 완벽 가이드 2026 — 수수료 계산법 총정리",
  description:
    "네이버 스마트스토어 수수료 구조를 한눈에 정리했습니다. 매출연동수수료 5.6%, 네이버페이 결제수수료 3.74% 등 실제 수수료 계산 예시와 절약 팁까지 완벽 가이드.",
  keywords: [
    "스마트스토어 수수료",
    "스마트스토어 수수료 계산",
    "네이버 스마트스토어 수수료",
    "스마트스토어 판매 수수료",
    "스마트스토어 마진",
    "스마트스토어 정산",
    "네이버페이 수수료",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "스마트스토어 수수료 완벽 가이드 2026",
    description: "매출연동수수료·결제수수료·배송비 등 스마트스토어 수수료 구조 완전 정리.",
    url: PAGE_URL,
    type: "article",
  },
};

export default function SmartstoreFeeGuidePage() {
  return (
    <>
      <ArticleJsonLd
        title="스마트스토어 수수료 완벽 가이드 2026"
        description="네이버 스마트스토어 수수료 구조를 한눈에 정리했습니다. 매출연동수수료, 네이버페이 결제수수료 계산법과 절약 팁."
        url={PAGE_URL}
        datePublished="2026-01-01"
        dateModified="2026-07-01"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 브레드크럼 */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-blue-600 transition-colors">가이드</Link>
          <span>/</span>
          <span className="text-gray-600">스마트스토어 수수료</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            📘 수수료 가이드
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            스마트스토어 수수료 완벽 가이드 2026
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            스마트스토어를 운영하면서 가장 헷갈리는 것 중 하나가 수수료 구조입니다.
            이 글에서는 수수료 항목별 계산법과 실제 예시를 통해 정확한 마진을 계산하는 방법을 안내합니다.
          </p>
          <p className="text-xs text-gray-400 mt-3">최종 업데이트: 2026년 7월</p>
        </header>

        <div className="prose-custom space-y-10">

          {/* 1. 수수료 구조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">스마트스토어 수수료 구조</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              스마트스토어의 수수료는 크게 <strong>매출연동수수료</strong>와 <strong>결제수수료(네이버페이)</strong> 두 가지로 나뉩니다.
              두 수수료를 합산하면 실질적인 총 수수료율이 됩니다.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">수수료 항목</th>
                    <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">요율</th>
                    <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border border-gray-200 text-gray-800">매출연동수수료</td>
                    <td className="px-4 py-3 border border-gray-200 text-right font-medium text-blue-600">5.6%</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">전 카테고리 동일</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 border border-gray-200 text-gray-800">네이버페이 결제수수료</td>
                    <td className="px-4 py-3 border border-gray-200 text-right font-medium text-blue-600">3.74%</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">연간 매출 6억 미만 기준</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-800">합계</td>
                    <td className="px-4 py-3 border border-gray-200 text-right font-bold text-blue-700 text-base">9.34%</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">실질 수수료율</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              <strong>💡 참고:</strong> 연간 매출 6억 원 이상이면 결제수수료가 달라집니다. 네이버 파트너센터에서 내 등급을 확인하세요.
            </div>
          </section>

          {/* 2. 실제 계산 예시 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">실제 수수료 계산 예시</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              판매가 30,000원 상품을 예로 들어 실제 정산금액을 계산해 보겠습니다.
            </p>

            <div className="card p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">판매가</span>
                <span className="font-medium text-gray-900">30,000원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">매출연동수수료 (5.6%)</span>
                <span className="text-red-400">−1,680원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">결제수수료 (3.74%)</span>
                <span className="text-red-400">−1,122원</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-gray-700">총 수수료</span>
                <span className="text-red-500">−2,802원 (9.34%)</span>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">정산 예상 금액</span>
                <span className="font-bold text-blue-600 text-lg">27,198원</span>
              </div>
            </div>

            <p className="text-gray-500 text-sm mt-3">
              * 배송비, 매입가, 광고비는 별도입니다. 아래 마진 계산기로 순이익까지 한 번에 계산하세요.
            </p>
          </section>

          {/* 3. 수수료 절약 팁 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">수수료 절약 & 마진 높이는 팁</h2>
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2">① 네이버 광고를 활용해 자연유입 늘리기</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  스마트스토어 수수료는 고정이지만, 광고비는 조절 가능합니다. SEO를 통해 자연 유입을 늘리면 CPC 광고 의존도를 낮출 수 있습니다.
                  키워드 분석 도구로 검색량이 높고 경쟁이 낮은 키워드를 찾아 상품명과 태그에 적용하세요.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2">② 묶음배송 & 포장 최적화</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  배송비는 개당 원가에 직결됩니다. 박스 사이즈 최적화, 포장재 비용 절감으로 건당 500~1,000원 절약이 가능합니다.
                  월 1,000건 판매 시 연간 최대 1,200만 원 절약 효과가 있습니다.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2">③ 목표 마진율 설정 후 매입가 역산</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  수수료 구조를 알면 목표 마진율에서 역으로 최대 매입가를 계산할 수 있습니다.
                  마진율 20%를 목표로 할 때 판매가 30,000원 상품의 최대 매입가는
                  30,000 × (1 − 0.20 − 0.0934) − 배송비로 계산합니다.
                </p>
              </div>
            </div>
          </section>

          {/* 4. 마진 계산기 CTA */}
          <section className="card p-8 text-center bg-blue-50 border-blue-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">스마트스토어 마진 지금 바로 계산하기</h2>
            <p className="text-gray-600 text-sm mb-6">
              매입가, 판매가를 입력하면 스마트스토어 수수료를 자동 반영해 순이익·마진율·손익분기를 계산합니다.
            </p>
            <Link
              href="/margin-calculator"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              무료 마진 계산기 열기 →
            </Link>
          </section>

          {/* 5. 자주 묻는 질문 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <div className="space-y-4">
              {[
                {
                  q: "스마트스토어 수수료는 언제 바뀌나요?",
                  a: "네이버는 정책 변경 시 파트너센터 공지를 통해 사전 안내합니다. 2024년 이후 기본 매출연동수수료(5.6%)는 변동이 없었으나, 결제수수료는 매출 등급에 따라 달라집니다.",
                },
                {
                  q: "스마트스토어와 쿠팡 중 어디가 수수료가 낮나요?",
                  a: "스마트스토어 총 수수료는 약 9.34%이며, 쿠팡 아이템위너는 약 10.8% 수준입니다. 단순 수수료만 보면 스마트스토어가 낮지만, 쿠팡은 자체 물류(로켓그로스) 이용 시 광고비 절감 효과가 있어 실질 마진은 케이스바이케이스입니다.",
                },
                {
                  q: "정산은 언제 이루어지나요?",
                  a: "구매확정 후 영업일 기준 1일 이내에 정산됩니다. 단, 환불/취소 건은 별도 처리됩니다.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="card p-5 group">
                  <summary className="cursor-pointer font-semibold text-gray-900 list-none flex items-center justify-between">
                    {q}
                    <span className="text-gray-400 text-lg group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* 관련 가이드 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">관련 가이드</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/guides/coupang-margin-calculator" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-blue-500 mb-1">마진 계산기</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">쿠팡 마진 계산기 완벽 가이드</h3>
                <p className="text-xs text-gray-400 mt-1">쿠팡 수수료 구조와 실제 마진 계산법</p>
              </Link>
              <Link href="/guides/margin-rate-calculation" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-blue-500 mb-1">마진율 계산</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">마진율 계산법 완전 정복</h3>
                <p className="text-xs text-gray-400 mt-1">마진율·ROI·손익분기 개념과 계산 공식</p>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
