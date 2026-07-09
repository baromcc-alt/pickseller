import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixeller.co.kr";
const PAGE_URL = `${BASE_URL}/guides/margin-rate-calculation`;

export const metadata: Metadata = {
  title: "마진율 계산법 완전 정복 — 공식·ROI·손익분기까지",
  description:
    "마진율 계산 공식부터 ROI, 손익분기 판매가까지 한 번에 정리했습니다. 쿠팡·스마트스토어 셀러가 반드시 알아야 할 마진율 계산 가이드.",
  keywords: [
    "마진율 계산",
    "마진율 계산법",
    "마진 계산기",
    "마진율 공식",
    "손익분기 계산",
    "ROI 계산",
    "이커머스 마진율",
    "온라인 판매 마진",
    "셀러 마진 계산",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "마진율 계산법 완전 정복 — 공식·ROI·손익분기까지",
    description: "마진율 공식, ROI, 손익분기 계산법을 예시와 함께 정리했습니다.",
    url: PAGE_URL,
    type: "article",
  },
};

export default function MarginRateCalculationPage() {
  return (
    <>
      <ArticleJsonLd
        title="마진율 계산법 완전 정복 — 공식·ROI·손익분기까지"
        description="마진율 계산 공식부터 ROI, 손익분기 판매가까지 쿠팡·스마트스토어 셀러를 위한 완벽 가이드."
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
          <span className="text-gray-600">마진율 계산법</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            📊 마진율 계산 가이드
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            마진율 계산법 완전 정복
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            이커머스 셀러라면 반드시 알아야 할 마진율 계산 공식, ROI(투자수익률), 손익분기 판매가까지
            실제 예시와 함께 완전히 정리했습니다.
          </p>
          <p className="text-xs text-gray-400 mt-3">최종 업데이트: 2026년 7월</p>
        </header>

        <div className="space-y-10">

          {/* 1. 마진율이란? */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">마진율이란?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              마진율은 <strong>판매가 대비 순이익의 비율</strong>을 뜻합니다.
              단순히 얼마를 팔았느냐가 아니라, 실제로 얼마를 남겼느냐를 보여주는 핵심 지표입니다.
              쿠팡·스마트스토어 셀러의 경우 플랫폼 수수료, 배송비, 광고비까지 모두 포함해 계산해야 진짜 마진율이 나옵니다.
            </p>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl text-center">
              <p className="text-sm text-gray-500 mb-2">마진율 공식</p>
              <p className="text-xl font-bold text-gray-900">
                마진율(%) = (순이익 ÷ 판매가) × 100
              </p>
              <p className="text-sm text-gray-500 mt-2">
                순이익 = 판매가 − 매입가 − 수수료 − 배송비 − 광고비 − 포장비
              </p>
            </div>
          </section>

          {/* 2. 마진율 계산 예시 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">마진율 계산 예시</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              스마트스토어에서 판매가 20,000원짜리 상품 마진율 계산 예시입니다.
            </p>

            <div className="card p-6 space-y-3 mb-4">
              <div className="flex justify-between text-sm font-semibold text-gray-700 border-b border-gray-100 pb-3">
                <span>항목</span>
                <span>금액</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">판매가</span>
                <span className="font-medium text-gray-900">20,000원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">매입가 (원가)</span>
                <span className="text-red-400">−7,000원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">스마트스토어 수수료 (9.34%)</span>
                <span className="text-red-400">−1,868원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">배송비</span>
                <span className="text-red-400">−3,000원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">포장비</span>
                <span className="text-red-400">−500원</span>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">순이익</span>
                <span className="font-bold text-green-600 text-lg">+7,632원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 font-medium">마진율</span>
                <span className="font-bold text-blue-600 text-base">38.2%</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <strong>계산:</strong> 7,632 ÷ 20,000 × 100 = 38.2%
            </div>
          </section>

          {/* 3. ROI 계산법 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ROI(투자수익률) 계산법</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              마진율이 판매가 기준이라면, ROI는 <strong>투자한 매입가 대비 얼마나 버는지</strong>를 보여줍니다.
              소싱 효율을 비교할 때 ROI가 더 유용합니다.
            </p>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl text-center mb-4">
              <p className="text-sm text-gray-500 mb-2">ROI 공식</p>
              <p className="text-xl font-bold text-gray-900">
                ROI(%) = (순이익 ÷ 매입가) × 100
              </p>
            </div>

            <div className="card p-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">위 예시로 ROI 계산</p>
              <p className="text-sm text-gray-600">ROI = 7,632 ÷ 7,000 × 100 = <strong className="text-blue-600">109%</strong></p>
              <p className="text-sm text-gray-500 mt-2">
                즉, 7,000원을 투자해 7,632원을 벌었으므로 투자금 대비 109% 수익이 발생했습니다.
                ROI 100% 이상이면 매입 비용의 2배 이상을 회수한 것입니다.
              </p>
            </div>
          </section>

          {/* 4. 손익분기 판매가 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">손익분기 판매가 계산법</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              손익분기 판매가(BEP)는 이익도 손실도 없는 최소 판매가입니다.
              할인 프로모션을 얼마까지 적용할 수 있는지 파악할 때 유용합니다.
            </p>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl text-center mb-4">
              <p className="text-sm text-gray-500 mb-2">손익분기 판매가 공식</p>
              <p className="text-lg font-bold text-gray-900">
                BEP = 고정비용 ÷ (1 − 수수료율)
              </p>
              <p className="text-sm text-gray-500 mt-2">
                고정비용 = 매입가 + 배송비 + 광고비 + 포장비
              </p>
            </div>

            <div className="card p-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">스마트스토어 손익분기 예시</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>고정비용 = 7,000 + 3,000 + 500 = 10,500원</p>
                <p>수수료율 = 9.34% = 0.0934</p>
                <p className="font-semibold text-gray-800 mt-2">
                  BEP = 10,500 ÷ (1 − 0.0934) = <strong className="text-blue-600">11,584원</strong>
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                즉, 이 상품은 11,584원 이상에 팔아야 손해를 보지 않습니다. 현재 판매가 20,000원이므로 8,416원의 여유가 있습니다.
              </p>
            </div>
          </section>

          {/* 5. 마진율 목표 설정 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">적정 마진율 기준</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              이커머스에서 일반적으로 권장하는 마진율 기준입니다.
              광고비·반품률·CS 비용을 감안해 목표를 설정하세요.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-4 card p-5">
                <div className="shrink-0 w-16 text-center">
                  <span className="text-2xl font-bold text-green-600">30%+</span>
                  <p className="text-xs text-green-600 mt-0.5">이상적</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">안정적인 수익 구조</p>
                  <p className="text-sm text-gray-600">광고비 10%를 써도 순마진 20% 확보 가능. 재투자 여력이 생깁니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 card p-5">
                <div className="shrink-0 w-16 text-center">
                  <span className="text-2xl font-bold text-yellow-500">20%</span>
                  <p className="text-xs text-yellow-600 mt-0.5">최소선</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">유지 가능한 최소 마진</p>
                  <p className="text-sm text-gray-600">광고비와 반품률을 타이트하게 관리해야 수익이 납니다. 자연 유입 비중을 높이는 것이 중요합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 card p-5">
                <div className="shrink-0 w-16 text-center">
                  <span className="text-2xl font-bold text-red-500">10%</span>
                  <p className="text-xs text-red-500 mt-0.5">위험</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">소량 실수로도 적자 가능</p>
                  <p className="text-sm text-gray-600">반품 1~2건으로 당일 이익이 사라집니다. 매입가 협상 또는 상품 교체를 검토하세요.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. 역산 계산 (목표 마진율에서 최대 매입가) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">목표 마진율에서 최대 매입가 역산하기</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              소싱 전에 "이 가격에 팔면 몇 원까지 사도 될까?"를 미리 계산하면 협상이 훨씬 쉬워집니다.
            </p>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl text-center mb-4">
              <p className="text-sm text-gray-500 mb-2">최대 매입가 역산 공식</p>
              <p className="text-base font-bold text-gray-900">
                최대 매입가 = 판매가 × (1 − 목표마진율 − 수수료율) − 기타비용
              </p>
            </div>

            <div className="card p-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">예시: 판매가 30,000원, 목표 마진율 25%, 스마트스토어</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>30,000 × (1 − 0.25 − 0.0934) − 3,000(배송) − 500(포장)</p>
                <p>= 30,000 × 0.6566 − 3,500</p>
                <p className="font-semibold text-gray-800 mt-2">
                  최대 매입가 = <strong className="text-blue-600">16,198원</strong>
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                이 상품은 16,198원 이하로 사야 마진율 25%를 달성할 수 있습니다.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="card p-8 text-center bg-green-50 border-green-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">마진율 자동 계산기로 바로 확인</h2>
            <p className="text-gray-600 text-sm mb-6">
              수식 없이 숫자만 입력하면 마진율·ROI·손익분기·최대 매입가를 즉시 계산합니다.
              마진 시뮬레이터로 목표 마진율에 맞는 최대 매입가도 역산해보세요.
            </p>
            <Link
              href="/margin-calculator"
              className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              무료 마진 계산기 열기 →
            </Link>
          </section>

          {/* 관련 가이드 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">관련 가이드</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/guides/smartstore-fee-guide" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-blue-500 mb-1">수수료 가이드</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">스마트스토어 수수료 완벽 가이드</h3>
                <p className="text-xs text-gray-400 mt-1">매출연동수수료 5.6% + 결제수수료 3.74%</p>
              </Link>
              <Link href="/guides/coupang-margin-calculator" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-blue-500 mb-1">마진 계산기</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">쿠팡 마진 계산기 완벽 가이드</h3>
                <p className="text-xs text-gray-400 mt-1">쿠팡 수수료 구조와 실제 마진 계산법</p>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
