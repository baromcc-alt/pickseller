import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixeller.co.kr";
const PAGE_URL = `${BASE_URL}/guides/online-shopping-startup-guide`;

export const metadata: Metadata = {
  title: "온라인 쇼핑몰 창업 완벽 가이드 2026 — 처음 시작하는 법",
  description:
    "온라인 쇼핑몰 창업 방법을 단계별로 정리했습니다. 마켓 선택부터 사업자 등록, 상품 소싱, 첫 판매까지 — 2026년 최신 기준 완벽 가이드.",
  keywords: [
    "온라인 쇼핑몰 창업",
    "온라인 판매 시작",
    "쇼핑몰 창업 방법",
    "온라인 부업",
    "이커머스 창업",
    "온라인 판매 방법",
    "부업 쇼핑몰",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "온라인 쇼핑몰 창업 완벽 가이드 2026",
    description: "마켓 선택부터 사업자 등록, 상품 소싱, 첫 판매까지 온라인 쇼핑몰 창업 단계별 가이드.",
    url: PAGE_URL,
    type: "article",
  },
};

export default function OnlineShoppingStartupGuidePage() {
  return (
    <>
      <ArticleJsonLd
        title="온라인 쇼핑몰 창업 완벽 가이드 2026"
        description="온라인 쇼핑몰 창업 방법. 마켓 선택부터 사업자 등록, 상품 소싱, 첫 판매까지 단계별 가이드."
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
          <span className="text-gray-600">온라인 쇼핑몰 창업</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            🏪 창업 가이드
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            온라인 쇼핑몰 창업 완벽 가이드 2026
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            온라인 쇼핑몰은 초기 자본 없이 시작할 수 있는 대표적인 사업 모델입니다.
            어떤 마켓에서 시작할지, 사업자 등록은 언제 해야 하는지, 첫 상품은 어떻게 고르는지
            처음 시작하는 분을 위해 단계별로 정리했습니다.
          </p>
          <p className="text-xs text-gray-400 mt-3">최종 업데이트: 2026년 7월</p>
        </header>

        <div className="prose-custom space-y-10">

          {/* 1. 마켓 비교 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">주요 판매 채널 비교</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              처음 시작할 때 가장 많이 고민하는 것이 어떤 마켓에서 시작할지입니다.
              각 채널의 특징을 비교해 자신에게 맞는 플랫폼을 선택하세요.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">플랫폼</th>
                    <th className="text-center px-4 py-3 border border-gray-200 font-semibold text-gray-700">수수료</th>
                    <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">특징</th>
                    <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">추천 대상</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["스마트스토어", "9.34%", "네이버 쇼핑 자동 노출, 초기 비용 없음", "초보, 개인, 소규모"],
                    ["쿠팡 (아이템위너)", "10.8%", "국내 최대 거래량, 경쟁 치열", "가격 경쟁력 있는 상품"],
                    ["11번가", "8~12%", "안정적 플랫폼, 다양한 카테고리", "중간 규모 셀러"],
                    ["지마켓/옥션", "8~12%", "G마켓·옥션 동시 입점", "다양한 채널 노출 희망"],
                    ["자사몰 (카페24 등)", "0~3%", "수수료 낮음, 브랜드 구축 가능", "장기 브랜드 사업자"],
                  ].map(([platform, fee, feature, target]) => (
                    <tr key={platform} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border border-gray-200 font-medium text-gray-900">{platform}</td>
                      <td className="px-4 py-3 border border-gray-200 text-center font-medium text-blue-600">{fee}</td>
                      <td className="px-4 py-3 border border-gray-200 text-gray-600 text-xs">{feature}</td>
                      <td className="px-4 py-3 border border-gray-200 text-gray-500 text-xs">{target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <strong>💡 처음 시작한다면:</strong> 스마트스토어를 추천합니다. 개설 비용 없이 네이버 쇼핑에 자동 노출되며, 운영이 가장 간단합니다.
            </div>
          </section>

          {/* 2. 창업 단계 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">온라인 쇼핑몰 창업 7단계</h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "아이템 선정 (가장 중요)",
                  desc: "팔릴 아이템을 고르는 것이 창업의 핵심입니다. 검색량이 있고, 경쟁이 적으며, 마진이 남는 상품을 데이터로 찾으세요. 감에 의존하지 말고 반드시 키워드 분석 데이터를 활용하세요.",
                  color: "bg-indigo-600",
                },
                {
                  step: "02",
                  title: "마켓 선택 & 계정 개설",
                  desc: "처음에는 스마트스토어 1개 채널로 시작하는 것을 권장합니다. 여러 채널을 동시에 운영하면 관리 부담이 커져 초보에게는 비효율적입니다.",
                  color: "bg-indigo-600",
                },
                {
                  step: "03",
                  title: "소싱처 선정 & 견본 주문",
                  desc: "알리익스프레스, 국내 도매 사이트 등에서 소싱처를 찾습니다. 대량 주문 전에 반드시 샘플을 먼저 받아 품질을 확인하세요.",
                  color: "bg-indigo-600",
                },
                {
                  step: "04",
                  title: "사업자 등록",
                  desc: "처음에는 사업자 없이 시작 가능하지만 연 매출 4,800만 원 초과 시 의무입니다. 매입 세금계산서를 받으려면 사업자가 필요하므로, 도매 거래를 시작하는 시점에 등록하는 것이 좋습니다.",
                  color: "bg-indigo-600",
                },
                {
                  step: "05",
                  title: "상품 등록 & 상세페이지 제작",
                  desc: "상품명에 핵심 키워드를 포함하고, 고화질 대표 이미지(흰 배경 1000×1000px)를 준비합니다. 상세페이지는 모바일 최적화가 필수입니다.",
                  color: "bg-indigo-600",
                },
                {
                  step: "06",
                  title: "소량 테스트 판매",
                  desc: "10~30개로 시작해 전환율·리뷰·반품률을 확인합니다. 데이터가 좋으면 재고를 늘리고, 좋지 않으면 상세페이지나 가격을 조정하거나 아이템을 교체합니다.",
                  color: "bg-indigo-600",
                },
                {
                  step: "07",
                  title: "성장 & 채널 확장",
                  desc: "하나의 채널에서 안정적인 매출이 나오면 다른 마켓으로 확장하거나 광고를 통해 트래픽을 늘립니다. 이 단계에서 자사몰 브랜딩도 고려해볼 수 있습니다.",
                  color: "bg-indigo-600",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 card p-5">
                  <div className={`w-10 h-10 rounded-full ${item.color} text-white flex items-center justify-center text-sm font-bold shrink-0`}>
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

          {/* 3. 초기 비용 가이드 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">초기 창업 비용 가이드</h2>
            <div className="card p-6 space-y-3">
              {[
                { item: "마켓 입점비", cost: "0원", note: "스마트스토어, 쿠팡 등 무료" },
                { item: "초도 재고 (소량 테스트)", cost: "30~100만원", note: "10~30개 × 단가" },
                { item: "상품 사진 촬영", cost: "0~20만원", note: "직접 촬영 시 0원" },
                { item: "사업자 등록", cost: "0원", note: "세무서 방문 또는 홈택스 무료" },
                { item: "광고비 (선택)", cost: "월 10~30만원", note: "초기에는 없이 시작 가능" },
              ].map((row) => (
                <div key={row.item} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <span className="text-gray-800 font-medium">{row.item}</span>
                    <span className="text-xs text-gray-400 ml-2">{row.note}</span>
                  </div>
                  <span className="font-semibold text-indigo-600">{row.cost}</span>
                </div>
              ))}
              <div className="pt-2 flex items-center justify-between font-bold">
                <span className="text-gray-900">총 최소 창업 비용</span>
                <span className="text-indigo-700 text-lg">30~150만원</span>
              </div>
            </div>
          </section>

          {/* 4. 세금·세무 기초 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">온라인 셀러가 알아야 할 세금 기초</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              처음에는 세금이 복잡하게 느껴지지만, 온라인 셀러에게 실질적으로 중요한 세금은 딱 두 가지입니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2">부가가치세 (VAT)</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 일반과세자: 매출의 10% → 매입 세금계산서로 공제 가능</li>
                  <li>• 간이과세자: 연 매출 1억400만원 미만, 낮은 세율 적용</li>
                  <li>• 신고 주기: 1월·7월 (반기별 신고)</li>
                  <li className="text-blue-600">✅ 팁: 매입 세금계산서 수령 시 VAT 환급 가능</li>
                </ul>
              </div>
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2">종합소득세</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 매년 5월 신고 (전년도 사업 소득)</li>
                  <li>• 세율: 소득에 따라 6%~45% 누진세</li>
                  <li>• 경비 처리: 매입비, 배송비, 포장재 등 비용 공제</li>
                  <li className="text-blue-600">✅ 팁: 경비 영수증은 꼭 보관하세요</li>
                </ul>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              <strong>⚠️ 주의:</strong> 연 매출 4,800만원 이상이면 사업자 등록 의무. 미등록 시 가산세 부과됩니다. 세무 신고가 처음이라면 국세청 홈택스 또는 세무사 상담을 권장합니다.
            </div>
          </section>

          {/* 5. 온라인 쇼핑몰 실패 원인 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">온라인 쇼핑몰 실패 원인 TOP 5</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              처음 시작하는 분들이 가장 많이 하는 실수입니다. 사전에 알고 피하면 성공 확률이 높아집니다.
            </p>
            <div className="space-y-3">
              {[
                { rank: "01", title: "아이템 선정 실패", desc: "감으로 상품을 고르는 경우입니다. '이거 좋아 보인다'로 주문하면 재고가 쌓입니다. 반드시 검색량 데이터와 경쟁강도를 확인한 후 소싱하세요.", color: "text-red-500" },
                { rank: "02", title: "마진 계산 없이 판매 시작", desc: "수수료, 배송비, 포장비, 반품비를 빼면 마진이 거의 없거나 손해인 경우가 많습니다. 판매가 설정 전 반드시 마진 계산기로 순이익을 확인하세요.", color: "text-red-500" },
                { rank: "03", title: "대량 재고 선주문", desc: "검증 없이 대량 재고를 미리 잡는 것은 초보의 전형적인 실수입니다. 반드시 소량 테스트 후 판매 가능성을 검증하고 재주문하세요.", color: "text-orange-500" },
                { rank: "04", title: "상세페이지 품질 저하", desc: "낮은 품질의 사진과 정보 부재 상세페이지는 구매 전환율을 떨어뜨립니다. 모바일에서 보기 좋은 세로형 상세페이지를 만들어야 합니다.", color: "text-orange-500" },
                { rank: "05", title: "CS 방치", desc: "리뷰와 문의에 응답하지 않으면 마켓 노출이 하락합니다. 하루 1~2회 빠르게 응답하는 습관만으로도 경쟁 셀러보다 노출에서 유리해집니다.", color: "text-yellow-600" },
              ].map((item) => (
                <div key={item.rank} className="card p-4 flex gap-4 items-start">
                  <span className={`font-black text-lg shrink-0 ${item.color}`}>{item.rank}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. 멀티채널 전략 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">성장 단계별 멀티채널 전략</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              처음에는 1개 채널 집중이 옳습니다. 안정적인 매출이 나온 후 단계적으로 확장하세요.
            </p>
            <div className="space-y-3">
              {[
                {
                  phase: "1단계 · 0~3개월",
                  color: "bg-gray-100 text-gray-600",
                  channels: "스마트스토어 1개",
                  goal: "소량 테스트, 판매 데이터 확보, CS 루틴 만들기",
                  memo: "이 단계에서 채널을 늘리면 집중력이 분산됩니다."
                },
                {
                  phase: "2단계 · 3~6개월",
                  color: "bg-blue-100 text-blue-700",
                  channels: "스마트스토어 + 쿠팡 아이템위너",
                  goal: "쿠팡 트래픽으로 판매량 확장, 수익성 검증",
                  memo: "스마트스토어 판매가 안정되면 동일 상품을 쿠팡에도 등록."
                },
                {
                  phase: "3단계 · 6개월 이후",
                  color: "bg-indigo-100 text-indigo-700",
                  channels: "전 채널 + 자사몰 브랜딩 준비",
                  goal: "채널 의존도 분산, 브랜드 구축, 단가 상향",
                  memo: "수익이 안정되면 자사몰·SNS 마케팅으로 브랜드화."
                },
              ].map((row) => (
                <div key={row.phase} className="card p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.color}`}>{row.phase}</span>
                    <span className="text-sm font-semibold text-gray-900">{row.channels}</span>
                  </div>
                  <p className="text-sm text-gray-600">{row.goal}</p>
                  <p className="text-xs text-gray-400 mt-1">💬 {row.memo}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. CTA */}
          <section className="card p-8 text-center bg-indigo-50 border-indigo-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">아이템 수익성, 미리 계산해보세요</h2>
            <p className="text-gray-600 text-sm mb-6">
              소싱 전에 마진 계산기로 예상 순이익·마진율을 먼저 확인하세요.
              수수료와 배송비가 자동 반영됩니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/margin-calculator"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                마진 계산기 열기 →
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                키워드 소싱 스코어 확인 →
              </Link>
            </div>
          </section>

          {/* 5. FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <div className="space-y-4">
              {[
                {
                  q: "직장인도 부업으로 온라인 쇼핑몰을 할 수 있나요?",
                  a: "가능합니다. 스마트스토어는 주문 처리를 하루 1~2회만 해도 운영 가능합니다. 다만, 회사 취업규칙에서 겸업을 금지하는 경우가 있으니 사전에 확인하세요. 사업자를 내지 않고 개인 자격으로 시작하면 회사 측에서 인지하기 어렵습니다.",
                },
                {
                  q: "얼마나 빨리 수익이 날 수 있나요?",
                  a: "상품 선택과 마진 관리가 잘 되면 첫 달부터 수익이 가능합니다. 그러나 평균적으로 안정적인 월 수익을 내기까지 3~6개월이 걸리는 경우가 많습니다. 빠른 수익보다 올바른 데이터 기반 소싱 습관을 만드는 것이 장기적으로 유리합니다.",
                },
                {
                  q: "통신판매업 신고는 언제 해야 하나요?",
                  a: "온라인으로 상품을 판매하려면 통신판매업 신고가 필요합니다. 정부24 또는 관할 구청에서 신고할 수 있으며, 사업자등록 후 진행합니다. 신고비는 지자체마다 다르며 무료인 경우도 있습니다.",
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
              <Link href="/guides/smartstore-beginners-guide" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-blue-500 mb-1">초보 가이드</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">스마트스토어 시작하기 완벽 가이드</h3>
                <p className="text-xs text-gray-400 mt-1">개설부터 첫 판매까지 단계별 안내</p>
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
