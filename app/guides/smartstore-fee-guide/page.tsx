import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixeller.co.kr";
const PAGE_URL = `${BASE_URL}/guides/smartstore-fee-guide`;

export const metadata: Metadata = {
  title: "스마트스토어 수수료 & 마진 계산 완벽 가이드 2026",
  description:
    "스마트스토어 수수료 구조와 마진 계산법을 완벽 정리했습니다. 매출연동수수료 5.6%, 네이버페이 결제수수료, 등급별 차이, 실제 마진 계산 예시까지 한눈에 확인하세요.",
  keywords: [
    "스마트스토어 수수료",
    "스마트스토어 마진",
    "스마트스토어 마진 계산",
    "스마트스토어 마진율 계산",
    "스마트스토어 마진 계산 방법",
    "스마트스토어 수수료 계산",
    "네이버 스마트스토어 수수료",
    "스마트스토어 마진율",
    "스마트스토어 정산",
    "네이버페이 수수료",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "스마트스토어 수수료 & 마진 계산 완벽 가이드 2026",
    description: "매출연동수수료·결제수수료·등급별 차이·실제 마진 계산 예시까지 완벽 정리.",
    url: PAGE_URL,
    type: "article",
  },
};

export default function SmartstoreFeeGuidePage() {
  return (
    <>
      <ArticleJsonLd
        title="스마트스토어 수수료 & 마진 계산 완벽 가이드 2026"
        description="스마트스토어 수수료 구조와 마진 계산법을 완벽 정리했습니다. 매출연동수수료, 네이버페이 결제수수료, 등급별 차이, 실제 마진 계산 예시."
        url={PAGE_URL}
        datePublished="2026-01-01"
        dateModified="2026-07-20"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 브레드크럼 */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-blue-600 transition-colors">가이드</Link>
          <span>/</span>
          <span className="text-gray-600">스마트스토어 수수료 & 마진</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            📘 수수료 & 마진 가이드
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            스마트스토어 수수료 & 마진 계산 완벽 가이드 2026
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            스마트스토어 수수료 구조와 실제 마진 계산법을 한 번에 정리했습니다.
            수수료 항목별 계산부터 등급별 차이, 마진율 공식, 손익분기 계산까지 모두 다룹니다.
          </p>
          <p className="text-xs text-gray-400 mt-3">최종 업데이트: 2026년 7월</p>
        </header>

        <div className="prose-custom space-y-12">

          {/* 목차 */}
          <nav className="card p-6 bg-gray-50">
            <p className="text-sm font-semibold text-gray-700 mb-3">📋 목차</p>
            <ol className="space-y-1.5 text-sm text-blue-600">
              {[
                ["#fee-structure", "스마트스토어 수수료 구조"],
                ["#grade", "매출 등급별 결제수수료 차이"],
                ["#margin-formula", "스마트스토어 마진 계산 공식"],
                ["#margin-examples", "실제 마진 계산 예시 3가지"],
                ["#tips", "마진 높이는 실전 팁"],
                ["#faq", "자주 묻는 질문"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:underline">{label}</a>
                </li>
              ))}
            </ol>
          </nav>

          {/* 1. 수수료 구조 */}
          <section id="fee-structure">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">스마트스토어 수수료 구조</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              스마트스토어의 수수료는 크게 <strong>매출연동수수료</strong>와 <strong>네이버페이 결제수수료</strong> 두 가지로 구성됩니다.
              두 수수료를 합산한 값이 실질적인 총 수수료율이 됩니다.
            </p>

            <div className="overflow-x-auto mb-4">
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
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">연매출 6억 미만 기준</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-800">합계 (실질 수수료)</td>
                    <td className="px-4 py-3 border border-gray-200 text-right font-bold text-blue-700 text-base">9.34%</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">연매출 6억 미만</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              <strong>💡 참고:</strong> 매출연동수수료 5.6%는 모든 셀러에게 동일하게 적용됩니다. 단, 결제수수료는 연간 매출 등급에 따라 달라집니다.
            </div>
          </section>

          {/* 2. 등급별 수수료 */}
          <section id="grade">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">매출 등급별 결제수수료 차이</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              네이버페이 결제수수료는 직전 연도 연간 매출 기준으로 등급이 결정되며, 매년 1월에 갱신됩니다.
              매출이 높을수록 수수료율이 낮아집니다.
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">등급</th>
                    <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">연간 매출 기준</th>
                    <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">결제수수료</th>
                    <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">총 수수료</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["씨앗", "6억 미만", "3.74%", "9.34%"],
                    ["새싹", "6억 ~ 30억", "3.63%", "9.23%"],
                    ["파워", "30억 ~ 100억", "2.97%", "8.57%"],
                    ["빅파워", "100억 ~ 500억", "2.42%", "8.02%"],
                    ["프리미엄", "500억 이상", "1.98%", "7.58%"],
                  ].map(([grade, sales, fee, total], i) => (
                    <tr key={grade} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                      <td className="px-4 py-3 border border-gray-200 text-gray-800 font-medium">{grade}</td>
                      <td className="px-4 py-3 border border-gray-200 text-right text-gray-600">{sales}</td>
                      <td className="px-4 py-3 border border-gray-200 text-right text-blue-600 font-medium">{fee}</td>
                      <td className="px-4 py-3 border border-gray-200 text-right font-bold text-gray-800">{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <strong>📌 초보 셀러:</strong> 처음 시작하면 씨앗 등급(9.34%)이 적용됩니다. 마진 계산 시 항상 9.34%를 기준으로 잡으세요.
            </div>
          </section>

          {/* 3. 마진 계산 공식 */}
          <section id="margin-formula">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">스마트스토어 마진 계산 공식</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              스마트스토어에서 실제로 남는 돈을 계산하려면 수수료 외에 매입가, 배송비, 광고비, 포장비를 모두 반영해야 합니다.
            </p>

            <div className="space-y-4">
              <div className="card p-5 border-l-4 border-blue-500">
                <p className="text-xs text-blue-500 font-semibold mb-2">공식 1 — 순이익</p>
                <p className="font-mono text-sm text-gray-800 leading-relaxed">
                  순이익 = 판매가 − 수수료(9.34%) − 매입가 − 배송비 − 광고비 − 포장비
                </p>
              </div>
              <div className="card p-5 border-l-4 border-green-500">
                <p className="text-xs text-green-600 font-semibold mb-2">공식 2 — 마진율</p>
                <p className="font-mono text-sm text-gray-800 leading-relaxed">
                  마진율(%) = 순이익 ÷ 판매가 × 100
                </p>
              </div>
              <div className="card p-5 border-l-4 border-orange-500">
                <p className="text-xs text-orange-600 font-semibold mb-2">공식 3 — 손익분기 판매가 (목표 마진율 역산)</p>
                <p className="font-mono text-sm text-gray-800 leading-relaxed">
                  손익분기가 = (매입가 + 배송비 + 광고비 + 포장비) ÷ (1 − 0.0934 − 목표마진율)
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
              <strong>📊 일반적인 마진율 기준:</strong> 스마트스토어 기준 마진율 <strong>20% 이상</strong>이면 안정적, <strong>25~30%</strong>를 목표로 하면 광고비와 반품을 감안해도 수익이 납니다.
            </div>
          </section>

          {/* 4. 실제 계산 예시 3가지 */}
          <section id="margin-examples">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">실제 마진 계산 예시 3가지</h2>

            {/* 예시 1 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">예시 1 — 판매가 30,000원 상품 (마진율 계산)</h3>
              <div className="card p-6 space-y-3">
                {[
                  ["판매가", "30,000원", ""],
                  ["매출연동수수료 (5.6%)", "−1,680원", "red"],
                  ["결제수수료 (3.74%)", "−1,122원", "red"],
                  ["매입가 (예시)", "−15,000원", "red"],
                  ["배송비 (예시)", "−3,000원", "red"],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-600">{label}</span>
                    <span className={color === "red" ? "text-red-400" : "font-medium text-gray-900"}>{value}</span>
                  </div>
                ))}
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">순이익</span>
                  <span className="font-bold text-blue-600 text-lg">9,198원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">마진율</span>
                  <span className="font-semibold text-green-600">30.7%</span>
                </div>
              </div>
            </div>

            {/* 예시 2 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">예시 2 — 목표 마진율 20%, 최대 매입가 역산</h3>
              <div className="card p-6 space-y-3">
                {[
                  ["판매가", "30,000원", ""],
                  ["목표 마진율", "20%", ""],
                  ["수수료 (9.34%)", "−2,802원", "red"],
                  ["배송비 (예시)", "−3,000원", "red"],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-600">{label}</span>
                    <span className={color === "red" ? "text-red-400" : "font-medium text-gray-900"}>{value}</span>
                  </div>
                ))}
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">최대 매입가</span>
                  <span className="font-bold text-blue-600 text-lg">18,198원</span>
                </div>
                <p className="text-xs text-gray-400">이 금액 이하로 매입해야 마진율 20% 달성 가능</p>
              </div>
            </div>

            {/* 예시 3 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">예시 3 — 광고비 포함 손익분기 계산</h3>
              <div className="card p-6 space-y-3">
                {[
                  ["매입가", "15,000원", ""],
                  ["배송비", "3,000원", ""],
                  ["광고비 (CPC 예시)", "1,500원", ""],
                  ["포장비", "500원", ""],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-600">{label}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">손익분기 최소 판매가</span>
                  <span className="font-bold text-orange-500 text-lg">22,052원</span>
                </div>
                <p className="text-xs text-gray-400">22,052원 이상 판매 시 수익 발생 (수수료 포함)</p>
              </div>
            </div>
          </section>

          {/* 마진 계산기 CTA */}
          <section className="card p-8 text-center bg-blue-50 border-blue-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">스마트스토어 마진 지금 바로 계산하기</h2>
            <p className="text-gray-600 text-sm mb-6">
              매입가·판매가를 입력하면 수수료 자동 반영 후 순이익·마진율·손익분기를 즉시 계산합니다.
            </p>
            <Link
              href="/margin-calculator"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              무료 마진 계산기 열기 →
            </Link>
          </section>

          {/* 5. 마진 높이는 팁 */}
          <section id="tips">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">스마트스토어 마진 높이는 실전 팁</h2>
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2">① 키워드 분석으로 광고비 줄이기</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  검색량이 높고 경쟁이 낮은 키워드를 상품명과 태그에 적용하면 자연 유입이 늘어 CPC 광고 의존도가 낮아집니다.
                  광고비를 건당 1,000원 줄이면 마진율이 3~5%p 개선됩니다.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2">② 묶음배송 & 포장 최적화</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  박스 사이즈 최적화와 포장재 비용 절감으로 건당 500~1,000원 절약 가능합니다.
                  월 1,000건 판매 시 연간 최대 1,200만 원 절약 효과가 있습니다.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2">③ 매입처 분산으로 원가 낮추기</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  국내 도매 → 1688.com → 직접 제조사 순으로 원가가 낮아집니다. 월 판매량이 300개 이상이면 제조사 직접 거래를 검토하세요.
                  원가를 10% 낮추면 마진율은 직접적으로 10%p 개선됩니다.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2">④ 반품률 관리</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  반품 1건 처리 시 왕복 배송비 + 상품 재판매 손실로 평균 5,000~10,000원이 빠져나갑니다.
                  상세페이지에 사이즈, 색상, 소재를 명확히 표기해 반품률을 낮추는 것이 마진 관리의 핵심입니다.
                </p>
              </div>
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2">⑤ 목표 마진율 설정 후 역산 소싱</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  판매가를 먼저 정하고 목표 마진율(25%)을 설정한 뒤, 역산으로 최대 매입가를 계산하세요.
                  이 가격 이하로 매입할 수 없는 상품은 처음부터 포기하는 것이 현명합니다.
                </p>
              </div>
            </div>
          </section>

          {/* 6. FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <div className="space-y-3">
              {[
                {
                  q: "스마트스토어 수수료는 총 몇 %인가요?",
                  a: "초보 셀러(씨앗 등급) 기준 매출연동수수료 5.6% + 결제수수료 3.74% = 총 9.34%입니다. 연매출이 올라갈수록 결제수수료가 낮아져 최저 7.58%(프리미엄 등급)까지 내려갑니다.",
                },
                {
                  q: "스마트스토어 마진 계산은 어떻게 하나요?",
                  a: "순이익 = 판매가 − 수수료(9.34%) − 매입가 − 배송비 − 광고비 − 포장비로 계산합니다. 마진율(%) = 순이익 ÷ 판매가 × 100입니다. 일반적으로 마진율 20% 이상이면 안정적인 수익 구조입니다.",
                },
                {
                  q: "스마트스토어와 쿠팡 중 어디가 수수료가 낮나요?",
                  a: "스마트스토어 총 수수료는 약 9.34%, 쿠팡 아이템위너는 약 10.8% 수준입니다. 단순 수수료만 보면 스마트스토어가 낮지만, 쿠팡은 로켓그로스 이용 시 광고비 절감 효과가 있어 실질 마진은 상품에 따라 다릅니다.",
                },
                {
                  q: "정산은 언제 이루어지나요?",
                  a: "구매확정 후 영업일 기준 1일 이내에 정산됩니다. 소비자가 구매확정을 하지 않으면 배송완료 후 7일(자동 구매확정) 뒤 정산됩니다.",
                },
                {
                  q: "수수료 말고 추가로 내야 하는 비용이 있나요?",
                  a: "네이버 쇼핑 검색광고(CPC), 브랜드 스토어 운영 시 월정액, 프리미엄 등록비 등이 별도로 발생할 수 있습니다. 하지만 기본 스마트스토어 운영에는 수수료 외에 별도 고정비가 없습니다.",
                },
                {
                  q: "수수료는 언제 바뀌나요?",
                  a: "네이버는 정책 변경 시 파트너센터 공지를 통해 사전 안내합니다. 매출연동수수료(5.6%)는 장기간 유지되고 있으며, 결제수수료는 매년 1월 매출 등급 기준으로 갱신됩니다.",
                },
                {
                  q: "반품이 발생하면 수수료가 돌아오나요?",
                  a: "환불 처리 시 수수료는 환급됩니다. 단, 배송비와 포장비는 환급되지 않으며, 단순 변심 반품의 경우 왕복 배송비 부담이 발생할 수 있습니다.",
                },
                {
                  q: "마진율 20%를 달성하려면 매입가를 어떻게 잡아야 하나요?",
                  a: "최대 매입가 = 판매가 × (1 − 목표마진율 − 수수료율) − 배송비 − 기타비용으로 계산합니다. 예를 들어 판매가 30,000원에서 마진율 20%, 배송비 3,000원이라면 최대 매입가는 약 18,198원입니다.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="card p-5 group">
                  <summary className="cursor-pointer font-semibold text-gray-900 list-none flex items-center justify-between gap-4">
                    <span>{q}</span>
                    <span className="text-gray-400 text-lg shrink-0 group-open:rotate-180 transition-transform">▾</span>
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
              <Link href="/guides/item-sourcing-guide" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-purple-500 mb-1">소싱 가이드</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">아이템 소싱 방법 완벽 가이드</h3>
                <p className="text-xs text-gray-400 mt-1">데이터로 팔릴 아이템 찾는 5단계 프로세스</p>
              </Link>
              <Link href="/guides/smartstore-beginners-guide" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-green-500 mb-1">초보 가이드</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">스마트스토어 시작하기 완벽 가이드</h3>
                <p className="text-xs text-gray-400 mt-1">개설부터 첫 주문 처리까지 단계별 안내</p>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
