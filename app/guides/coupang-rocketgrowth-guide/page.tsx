import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixeller.co.kr";
const PAGE_URL = `${BASE_URL}/guides/coupang-rocketgrowth-guide`;

export const metadata: Metadata = {
  title: "쿠팡 로켓그로스 완벽 가이드 2026 — 수수료·장단점·신청 방법",
  description:
    "쿠팡 로켓그로스 수수료 구조, 아이템위너와 비교, 신청 조건과 방법까지. 로켓그로스로 매출을 높이는 방법을 2026년 기준으로 정리했습니다.",
  keywords: [
    "쿠팡 로켓그로스",
    "로켓그로스 수수료",
    "쿠팡 위탁판매",
    "로켓그로스 신청",
    "쿠팡 풀필먼트",
    "로켓그로스 마진",
    "쿠팡 판매 방법",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "쿠팡 로켓그로스 완벽 가이드 2026",
    description: "로켓그로스 수수료·장단점·신청 방법. 아이템위너와 비교해 최적 판매 방식을 선택하세요.",
    url: PAGE_URL,
    type: "article",
  },
};

export default function CoupangRocketgrowthGuidePage() {
  return (
    <>
      <ArticleJsonLd
        title="쿠팡 로켓그로스 완벽 가이드 2026"
        description="쿠팡 로켓그로스 수수료 구조, 아이템위너와 비교, 신청 조건과 방법까지 2026년 기준으로 정리."
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
          <span className="text-gray-600">쿠팡 로켓그로스</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            🚀 쿠팡 판매 가이드
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            쿠팡 로켓그로스 완벽 가이드 2026
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            로켓그로스는 쿠팡의 풀필먼트 서비스입니다. 상품을 쿠팡 물류센터에 입고하면
            쿠팡이 보관·포장·배송·반품까지 대신 처리해줍니다.
            아이템위너 방식과 무엇이 다른지, 언제 선택하면 유리한지 정리했습니다.
          </p>
          <p className="text-xs text-gray-400 mt-3">최종 업데이트: 2026년 7월</p>
        </header>

        <div className="prose-custom space-y-10">

          {/* 1. 로켓그로스 vs 아이템위너 비교 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">로켓그로스 vs 아이템위너 핵심 비교</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">항목</th>
                    <th className="text-center px-4 py-3 border border-gray-200 font-semibold text-orange-600">로켓그로스</th>
                    <th className="text-center px-4 py-3 border border-gray-200 font-semibold text-blue-600">아이템위너</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["배송 주체", "쿠팡 물류센터", "셀러 직접 발송"],
                    ["배송 속도", "로켓배송 (당일/익일)", "셀러 설정에 따라 다름"],
                    ["판매 수수료", "카테고리별 5~10.8%", "카테고리별 5~10.8%"],
                    ["물류비", "입고비+보관비+출고비 별도", "없음 (직접 처리)"],
                    ["재고 위치", "쿠팡 물류센터", "셀러 보관"],
                    ["노출 우선순위", "로켓배송 배지로 높음", "상대적으로 낮음"],
                    ["최소 입고 수량", "있음 (상품별 상이)", "없음"],
                  ].map(([item, rocket, winner]) => (
                    <tr key={item} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border border-gray-200 text-gray-700 font-medium">{item}</td>
                      <td className="px-4 py-3 border border-gray-200 text-center text-gray-600">{rocket}</td>
                      <td className="px-4 py-3 border border-gray-200 text-center text-gray-600">{winner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2. 로켓그로스 수수료 구조 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">로켓그로스 수수료 구조</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              로켓그로스는 판매 수수료 외에 <strong>물류 비용(입고비·보관비·출고비)</strong>이 추가로 발생합니다.
              아이템위너보다 수수료 합계가 높아질 수 있지만, 광고비 절감과 높은 전환율로 실질 수익이 높은 경우가 많습니다.
            </p>
            <div className="space-y-3">
              {[
                { label: "판매 수수료", value: "카테고리별 5~10.8%", note: "아이템위너와 동일" },
                { label: "입고비", value: "박스당 약 500~1,000원", note: "물류센터에 입고할 때 1회 발생" },
                { label: "보관비", value: "CBM당 일별 부과", note: "재고가 많을수록 증가" },
                { label: "출고비", value: "건당 약 700~1,500원", note: "주문 1건당 발생" },
              ].map((row) => (
                <div key={row.label} className="card p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{row.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{row.note}</p>
                  </div>
                  <span className="text-orange-600 font-medium text-sm shrink-0">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              <strong>💡 팁:</strong> 단가가 낮은 상품(5,000원 이하)은 물류비 비중이 커서 로켓그로스보다 아이템위너가 유리할 수 있습니다.
              마진 계산기로 두 방식을 비교해보세요.
            </div>
          </section>

          {/* 3. 로켓그로스가 유리한 경우 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">로켓그로스가 유리한 경우</h2>
            <div className="space-y-4">
              {[
                {
                  icon: "📦",
                  title: "반복 구매가 많은 소모품",
                  desc: "세제, 휴지, 식품 등 재구매율이 높은 상품은 로켓배송 배지 효과가 커서 전환율이 높습니다.",
                },
                {
                  icon: "🏋️",
                  title: "부피·무게가 큰 상품",
                  desc: "직접 배송 시 택배비가 높은 상품은 쿠팡 물류를 활용하면 배송비를 절감할 수 있습니다.",
                },
                {
                  icon: "📈",
                  title: "판매량이 안정적인 상품",
                  desc: "매출이 예측 가능해 재고 계획이 가능한 상품은 보관비 관리가 용이합니다.",
                },
                {
                  icon: "🕐",
                  title: "배송 처리에 시간을 쓰기 어려운 경우",
                  desc: "부업으로 운영하거나 1인 셀러라면 배송·반품 처리를 쿠팡에 위임해 운영 부담을 줄일 수 있습니다.",
                },
              ].map((item) => (
                <div key={item.title} className="card p-5 flex gap-4">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. 신청 방법 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">로켓그로스 신청 방법</h2>
            <div className="space-y-4">
              {[
                { step: "01", title: "쿠팡 Wing 판매자 가입", desc: "wing.coupang.com에서 판매자 계정을 생성합니다. 사업자등록증이 필요합니다." },
                { step: "02", title: "상품 등록", desc: "판매할 상품을 Wing에 등록합니다. GTIN(바코드) 또는 쿠팡 로켓 아이디가 필요한 경우도 있습니다." },
                { step: "03", title: "로켓그로스 신청", desc: "Wing → 로켓그로스 메뉴에서 신청. 쿠팡 심사 후 승인 시 이용 가능합니다." },
                { step: "04", title: "재고 입고", desc: "승인 후 지정 물류센터로 상품을 발송합니다. 입고 수량·포장 기준을 반드시 확인하세요." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 card p-5">
                  <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. 로켓그로스 적합 상품 기준 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">로켓그로스에 적합한 상품 기준</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              모든 상품이 로켓그로스에 유리한 것은 아닙니다. 아래 기준을 충족할수록 로켓그로스 효과가 높습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {[
                { check: "✅", title: "단가 15,000원 이상", desc: "물류비(출고비 700~1,500원) 비중이 마진에 미치는 영향이 작아집니다." },
                { check: "✅", title: "월 50개 이상 판매 가능", desc: "재고 회전율이 높아야 보관비 부담이 줄어듭니다." },
                { check: "✅", title: "표준 포장 가능한 상품", desc: "불규칙한 모양이나 과도하게 무거운 상품은 물류 비용이 추가됩니다." },
                { check: "✅", title: "반품률 5% 이하 예상", desc: "로켓그로스 반품도 셀러 비용이 발생하므로 반품이 적은 상품이 유리합니다." },
                { check: "❌", title: "단가 5,000원 이하 소품", desc: "물류비가 마진의 30~50%를 차지해 수익이 거의 없을 수 있습니다." },
                { check: "❌", title: "시즌성 강한 상품", desc: "시즌 종료 후 재고가 남으면 장기 보관료가 발생합니다. 재고 예측이 어렵습니다." },
              ].map((item) => (
                <div key={item.title} className="card p-4 flex gap-3">
                  <span className="text-lg shrink-0">{item.check}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. 재고 관리 전략 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">로켓그로스 재고 관리 전략</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              로켓그로스에서 수익을 극대화하려면 <strong>재고 회전율 관리</strong>가 핵심입니다.
              재고가 60일 이상 물류센터에 쌓이면 장기 보관료가 급증합니다.
            </p>
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-3">재고 수량 계산 공식</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 mb-3">
                  입고 수량 = 일 평균 판매량 × 리드타임(일) × 안전재고 배수(1.3~1.5)
                </div>
                <p className="text-xs text-gray-500">
                  예: 하루 5개 판매 × 소싱 리드타임 14일 × 1.3 = <strong>약 91개</strong> 입고 권장
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: "📊", title: "Wing 재고 현황 주 1회 확인", desc: "판매속도 대비 재고일수(DOH)를 항상 파악하세요." },
                  { icon: "⚡", title: "30일치 재고 기준 유지", desc: "60일치 이상 쌓이면 장기 보관료 발생. 30일 기준이 최적입니다." },
                  { icon: "🔄", title: "시즌 전 재고 회수 계획", desc: "시즌 종료 4~6주 전에 재고 회수 신청을 준비하세요." },
                ].map((tip) => (
                  <div key={tip.title} className="card p-4 text-center">
                    <div className="text-2xl mb-2">{tip.icon}</div>
                    <h4 className="font-semibold text-gray-900 text-xs mb-1">{tip.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. 실제 비용 비교 예시 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">아이템위너 vs 로켓그로스 실제 비용 비교</h2>
            <p className="text-gray-600 leading-relaxed mb-4">판매가 30,000원 상품 100개 판매 기준 비교입니다.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-center">아이템위너</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ["판매 수수료 (10.8%)", "−324,000원"],
                    ["직접 배송비 (3,000원×100)", "−300,000원"],
                    ["포장재 (500원×100)", "−50,000원"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-red-400">{val}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 pt-2 flex justify-between font-bold">
                    <span className="text-gray-700">총 비용</span>
                    <span className="text-red-500">−674,000원</span>
                  </div>
                </div>
              </div>
              <div className="card p-5 border-orange-200 bg-orange-50/30">
                <h3 className="font-semibold text-gray-900 mb-3 text-center">로켓그로스</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ["판매 수수료 (10.8%)", "−324,000원"],
                    ["출고비 (1,000원×100)", "−100,000원"],
                    ["입고비 + 보관비 (추산)", "−50,000원"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-red-400">{val}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 pt-2 flex justify-between font-bold">
                    <span className="text-gray-700">총 비용</span>
                    <span className="text-orange-600">−474,000원</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">※ 로켓그로스가 약 20만원 절감. 단, 전환율·노출 우위 효과는 별도.</p>
          </section>

          {/* 8. 마진 계산기 CTA */}
          <section className="card p-8 text-center bg-orange-50 border-orange-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">로켓그로스 마진 지금 계산하기</h2>
            <p className="text-gray-600 text-sm mb-6">
              쿠팡 수수료와 물류비를 반영해 로켓그로스 방식의 실제 순이익을 계산해보세요.
            </p>
            <Link
              href="/margin-calculator"
              className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              무료 마진 계산기 열기 →
            </Link>
          </section>

          {/* 6. FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <div className="space-y-4">
              {[
                {
                  q: "로켓그로스와 로켓배송의 차이가 뭔가요?",
                  a: "로켓배송은 쿠팡이 직접 소싱해 판매하는 방식(직매입)이고, 로켓그로스는 셀러가 재고를 쿠팡 물류센터에 맡기고 쿠팡이 배송만 처리하는 위탁 방식입니다. 고객 입장에서는 둘 다 '로켓배송' 배지로 표시됩니다.",
                },
                {
                  q: "개인사업자도 로켓그로스를 이용할 수 있나요?",
                  a: "네, 개인사업자도 가능합니다. 단, 사업자등록증이 있어야 하며 일부 카테고리는 법인만 신청 가능한 경우가 있습니다.",
                },
                {
                  q: "재고가 팔리지 않으면 어떻게 되나요?",
                  a: "보관비가 계속 발생하므로 재고 관리가 중요합니다. 쿠팡 Wing에서 회수 신청을 하면 상품을 돌려받을 수 있으며, 이때 회수 비용이 별도로 부과됩니다.",
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
                <p className="text-xs text-gray-400 mt-1">아이템위너·로켓그로스 수수료 구조 비교</p>
              </Link>
              <Link href="/guides/item-sourcing-guide" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-blue-500 mb-1">소싱 가이드</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">아이템 소싱 방법 완벽 가이드</h3>
                <p className="text-xs text-gray-400 mt-1">팔릴 아이템 찾는 데이터 기반 소싱법</p>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
