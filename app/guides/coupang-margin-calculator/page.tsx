import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixeller.co.kr";
const PAGE_URL = `${BASE_URL}/guides/coupang-margin-calculator`;

export const metadata: Metadata = {
  title: "쿠팡 마진 계산기 완벽 가이드 2026 — 수수료·마진율 계산법",
  description:
    "쿠팡 아이템위너·로켓그로스 수수료 구조와 실제 마진 계산법을 정리했습니다. 판매가·매입가·배송비를 입력해 순이익과 마진율을 바로 계산하세요.",
  keywords: [
    "쿠팡 마진 계산기",
    "쿠팡 수수료",
    "쿠팡 마진율",
    "쿠팡 아이템위너 수수료",
    "쿠팡 판매 마진",
    "쿠팡 셀러 수수료",
    "쿠팡 로켓그로스 수수료",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "쿠팡 마진 계산기 완벽 가이드 2026",
    description: "쿠팡 아이템위너·로켓그로스 수수료와 마진 계산법 완전 정리.",
    url: PAGE_URL,
    type: "article",
  },
};

export default function CoupangMarginCalculatorPage() {
  return (
    <>
      <ArticleJsonLd
        title="쿠팡 마진 계산기 완벽 가이드 2026"
        description="쿠팡 아이템위너·로켓그로스 수수료 구조와 실제 마진 계산법을 정리했습니다."
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
          <span className="text-gray-600">쿠팡 마진 계산기</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            🛒 마진 계산기 가이드
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            쿠팡 마진 계산기 완벽 가이드 2026
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            쿠팡에서 팔면 실제로 얼마나 남을까요? 아이템위너·로켓그로스 수수료 구조를 이해하고,
            정확한 마진을 계산하는 방법을 안내합니다.
          </p>
          <p className="text-xs text-gray-400 mt-3">최종 업데이트: 2026년 7월</p>
        </header>

        <div className="space-y-10">

          {/* 1. 쿠팡 수수료 구조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">쿠팡 수수료 구조</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              쿠팡에서 판매하는 방식은 크게 <strong>아이템위너(일반 마켓플레이스)</strong>와
              <strong>로켓그로스(쿠팡 물류 위탁)</strong>로 나뉩니다. 방식에 따라 수수료와 비용 구조가 크게 다릅니다.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">아이템위너 수수료</h3>
            <div className="overflow-x-auto mb-6">
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
                    <td className="px-4 py-3 border border-gray-200 text-gray-800">판매 수수료</td>
                    <td className="px-4 py-3 border border-gray-200 text-right font-medium text-orange-600">약 10.8%</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">카테고리별 상이 (8~12%)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 border border-gray-200 text-gray-800">배송비</td>
                    <td className="px-4 py-3 border border-gray-200 text-right font-medium text-orange-600">셀러 부담</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">보통 2,500~3,500원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-800">실질 총비용율</td>
                    <td className="px-4 py-3 border border-gray-200 text-right font-bold text-orange-700 text-base">~10.8%+</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">배송비 별도</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">로켓그로스 수수료</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">수수료 항목</th>
                    <th className="text-right px-4 py-3 border border-gray-200 font-semibold text-gray-700">요율/금액</th>
                    <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border border-gray-200 text-gray-800">판매 수수료</td>
                    <td className="px-4 py-3 border border-gray-200 text-right font-medium text-orange-600">약 10.8%</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">아이템위너와 동일</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 border border-gray-200 text-gray-800">입고/보관료</td>
                    <td className="px-4 py-3 border border-gray-200 text-right font-medium text-orange-600">건당 과금</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">물류센터 입고 처리비</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-gray-200 text-gray-800">배송비 (쿠팡 부담)</td>
                    <td className="px-4 py-3 border border-gray-200 text-right font-medium text-green-600">쿠팡 부담</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">로켓배송 셀러 배송비 없음</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <strong>💡 로켓그로스 장점:</strong> 배송비를 쿠팡이 부담하므로 고가 상품일수록 실질 마진이 높아질 수 있습니다.
              단, 입고/보관료가 추가되므로 재고 회전율이 높은 상품에 유리합니다.
            </div>
          </section>

          {/* 2. 실제 마진 계산 예시 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">실제 마진 계산 예시</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              판매가 25,000원 상품 (아이템위너 기준) 마진 계산 예시입니다.
            </p>

            <div className="card p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">판매가</span>
                <span className="font-medium text-gray-900">25,000원</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">매입가 (원가)</span>
                <span className="text-red-400">−9,000원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">판매 수수료 (10.8%)</span>
                <span className="text-red-400">−2,700원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">배송비</span>
                <span className="text-red-400">−3,000원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">포장비</span>
                <span className="text-red-400">−500원</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-gray-700">총 비용</span>
                <span className="text-red-500">−15,200원</span>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">순이익</span>
                <span className="font-bold text-green-600 text-lg">+9,800원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">마진율</span>
                <span className="font-semibold text-blue-600">39.2%</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              * 광고비(CPC)를 추가하면 마진율이 낮아집니다. 아래 계산기에서 광고비까지 포함해 계산해보세요.
            </p>
          </section>

          {/* 3. 마진율별 쿠팡 판매 전략 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">마진율별 쿠팡 판매 전략</h2>
            <div className="space-y-3">
              <div className="card p-5 border-green-200 bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-600 font-bold text-lg">마진율 30% 이상</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">안정</span>
                </div>
                <p className="text-sm text-gray-600">광고비와 반품률 5~10%를 감안해도 수익이 나는 구조. 확장 투자가 가능한 구간입니다.</p>
              </div>
              <div className="card p-5 border-yellow-200 bg-yellow-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-700 font-bold text-lg">마진율 20~30%</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">주의</span>
                </div>
                <p className="text-sm text-gray-600">광고비 관리가 중요한 구간. CPC 단가를 지속 모니터링하고 자연 유입 비중을 높여야 합니다.</p>
              </div>
              <div className="card p-5 border-red-200 bg-red-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-600 font-bold text-lg">마진율 20% 미만</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">위험</span>
                </div>
                <p className="text-sm text-gray-600">광고비·반품·CS 비용 감안 시 손실 가능성이 높습니다. 매입가 협상 또는 가격 인상을 검토하세요.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="card p-8 text-center bg-orange-50 border-orange-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">쿠팡 마진 지금 계산해보기</h2>
            <p className="text-gray-600 text-sm mb-6">
              쿠팡 수수료(10.8%)가 자동 반영됩니다. 매입가와 판매가만 입력하면 마진율·손익분기를 즉시 확인하세요.
            </p>
            <Link
              href="/margin-calculator"
              className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              무료 마진 계산기 열기 →
            </Link>
          </section>

          {/* 4. 쿠팡 반품·CS 비용 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">마진 계산 시 놓치기 쉬운 숨은 비용</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              수수료와 배송비만 계산하면 실제 마진보다 높게 나옵니다.
              아래 비용 항목도 반드시 포함해 계산하세요.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "↩️",
                  title: "반품·교환 비용",
                  desc: "쿠팡 평균 반품율은 3~8%. 반품 시 왕복 배송비 5,000~7,000원이 셀러 부담입니다. 카테고리 반품율을 파악해 마진에 반영하세요.",
                },
                {
                  icon: "📦",
                  title: "포장재 비용",
                  desc: "박스·완충재·테이프·라벨 등 포장재 비용은 건당 200~1,500원 수준. 상품 크기에 따라 달라지며 박스 구매 단위에 따라 단가 차이가 큽니다.",
                },
                {
                  icon: "💻",
                  title: "광고비 (CPC)",
                  desc: "쿠팡 검색광고 CPC는 키워드당 100~500원 이상. 매출 대비 광고비율(ACoS)을 항상 모니터링하고, 목표 ACoS를 미리 마진에서 빼두세요.",
                },
                {
                  icon: "🏷️",
                  title: "할인·쿠폰 비용",
                  desc: "쿠팡 로켓배송 상품에 자주 붙는 쿠폰·할인은 실질 마진을 줄입니다. 판매 촉진을 위한 할인 여력이 있는지 사전에 계산하세요.",
                },
                {
                  icon: "🏢",
                  title: "보관료 (로켓그로스)",
                  desc: "로켓그로스 이용 시 재고가 60일 이상 쌓이면 장기 보관료가 발생합니다. 재고 회전율이 낮은 상품은 보관료가 마진을 잠식할 수 있습니다.",
                },
                {
                  icon: "📞",
                  title: "CS 처리 시간 비용",
                  desc: "고객 문의·분쟁 처리에 드는 시간도 비용입니다. 특히 상품 불량·누락 클레임이 많은 카테고리는 CS 비용을 반영해 판매가를 책정해야 합니다.",
                },
              ].map((item) => (
                <div key={item.title} className="card p-4 flex gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. 손익분기 계산 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">손익분기 수량 계산하기</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              손익분기(BEP) 수량이란 고정비를 회수하는 데 필요한 최소 판매 수량입니다.
              초기 재고 매입비·포장재 구매비 등 고정 지출이 있다면 반드시 계산해두세요.
            </p>
            <div className="card p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 text-sm">
                <p className="font-semibold text-gray-700 mb-2">손익분기 수량 공식</p>
                <div className="font-mono text-blue-700">
                  BEP 수량 = 고정비 합계 ÷ 건당 순이익
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>예시:</strong> 포장재 구입비 20만원을 고정비로 지출했고, 건당 순이익이 5,000원이라면</p>
                <p className="font-mono text-gray-800">200,000 ÷ 5,000 = <strong className="text-green-600">40개</strong> 이상 판매해야 초기 비용 회수</p>
              </div>
              <p className="text-xs text-gray-400">픽셀러 마진 계산기에서 손익분기 수량을 자동으로 계산해드립니다.</p>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <div className="space-y-4">
              {[
                {
                  q: "쿠팡 카테고리별 수수료가 다른가요?",
                  a: "네, 카테고리마다 수수료율이 다릅니다. 식품·건강식품은 약 8~10%, 전자제품은 약 11~13% 수준입니다. 정확한 수수료는 쿠팡 파트너스퀘어에서 카테고리별로 확인할 수 있습니다.",
                },
                {
                  q: "쿠팡 vs 스마트스토어 어디가 유리한가요?",
                  a: "쿠팡은 높은 트래픽으로 초반 판매량 확보가 쉽지만 수수료(10.8%)가 상대적으로 높습니다. 스마트스토어는 수수료(9.34%)가 낮고 SEO를 통한 자연 유입이 가능하지만 초기 트래픽이 적습니다. 두 플랫폼을 병행 운영하는 멀티채널 전략이 가장 효과적입니다.",
                },
                {
                  q: "쿠팡 광고비(CPC)는 마진에 얼마나 영향을 주나요?",
                  a: "카테고리 경쟁도에 따라 다르지만, 일반적으로 판매가의 5~15%가 광고비로 나갑니다. 마진 계산기에 광고비를 입력하면 실제 순이익을 정확히 파악할 수 있습니다.",
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
              <Link href="/guides/smartstore-fee-guide" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-blue-500 mb-1">수수료 가이드</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">스마트스토어 수수료 완벽 가이드</h3>
                <p className="text-xs text-gray-400 mt-1">매출연동수수료 5.6% + 결제수수료 3.74%</p>
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
