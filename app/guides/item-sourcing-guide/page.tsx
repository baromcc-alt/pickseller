import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixeller.co.kr";
const PAGE_URL = `${BASE_URL}/guides/item-sourcing-guide`;

export const metadata: Metadata = {
  title: "아이템 소싱 방법 완벽 가이드 2026 — 팔릴 상품 찾는 법",
  description:
    "데이터 기반 아이템 소싱 방법을 정리했습니다. 검색량 분석, 경쟁 강도 체크, 마진 계산까지 — 초보 셀러도 팔릴 상품을 찾는 실전 소싱 가이드.",
  keywords: [
    "아이템 소싱",
    "소싱 방법",
    "온라인 판매 아이템",
    "상품 소싱",
    "이커머스 소싱",
    "팔릴 상품 찾기",
    "쿠팡 소싱",
    "스마트스토어 소싱",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "아이템 소싱 방법 완벽 가이드 2026",
    description: "검색량 분석·경쟁 강도·마진 계산으로 팔릴 아이템을 찾는 데이터 기반 소싱 가이드.",
    url: PAGE_URL,
    type: "article",
  },
};

export default function ItemSourcingGuidePage() {
  return (
    <>
      <ArticleJsonLd
        title="아이템 소싱 방법 완벽 가이드 2026"
        description="데이터 기반 아이템 소싱 방법. 검색량 분석, 경쟁 강도 체크, 마진 계산까지 실전 소싱 가이드."
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
          <span className="text-gray-600">아이템 소싱 방법</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            🎯 소싱 가이드
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            아이템 소싱 방법 완벽 가이드 2026
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            온라인 판매에서 가장 중요한 것은 <strong>팔릴 상품을 고르는 것</strong>입니다.
            감이 아닌 데이터로 소싱하는 방법 — 검색량 분석부터 경쟁 강도 체크, 마진 계산까지
            단계별로 정리했습니다.
          </p>
          <p className="text-xs text-gray-400 mt-3">최종 업데이트: 2026년 7월</p>
        </header>

        <div className="prose-custom space-y-10">

          {/* 1. 소싱의 기본 원칙 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">좋은 아이템의 3가지 조건</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: "🔍",
                  title: "검색량 (수요)",
                  desc: "사람들이 실제로 검색하는 키워드여야 합니다. 검색량이 없으면 아무리 좋은 상품도 팔리지 않습니다.",
                },
                {
                  icon: "⚔️",
                  title: "경쟁 강도",
                  desc: "경쟁 상품이 너무 많으면 상위 노출이 어렵습니다. 검색량 대비 경쟁이 적은 블루오션을 찾는 것이 핵심입니다.",
                },
                {
                  icon: "💰",
                  title: "마진 (수익성)",
                  desc: "수수료·배송비·매입가를 빼고도 이익이 남아야 합니다. 마진율 20% 이상을 목표로 하세요.",
                },
              ].map((item) => (
                <div key={item.title} className="card p-5 text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2. 데이터 기반 소싱 프로세스 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">데이터 기반 소싱 5단계 프로세스</h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "카테고리 트렌드 파악",
                  desc: "네이버 데이터랩 쇼핑인사이트에서 카테고리별 검색 트렌드를 확인합니다. 상승 중인 카테고리에서 상품을 고르면 유리합니다. 픽셀러의 카테고리 랭킹에서 인기 카테고리를 확인하세요.",
                  link: { href: "/category", label: "카테고리 랭킹 보기 →" },
                },
                {
                  step: "02",
                  title: "키워드 검색량 분석",
                  desc: "카테고리 내 구체적인 키워드의 검색량을 확인합니다. 월 검색량 1,000회 이상이면 어느 정도 수요가 있다고 볼 수 있습니다. 키워드 트렌드가 상승 중인 것을 우선 선택하세요.",
                  link: { href: "/", label: "키워드 검색량 분석하기 →" },
                },
                {
                  step: "03",
                  title: "경쟁 강도 체크",
                  desc: "네이버 쇼핑에서 키워드를 검색해 등록된 상품 수를 확인합니다. 상품 수가 2,000개 미만이면 블루오션, 5만 개 이상이면 레드오션으로 볼 수 있습니다. 픽셀러 소싱 스코어에서 경쟁 강도를 자동으로 분석해줍니다.",
                },
                {
                  step: "04",
                  title: "마진 계산",
                  desc: "경쟁 상품 평균 판매가에서 매입가·수수료·배송비를 뺀 순이익을 계산합니다. 마진율 20% 이상이 나와야 안정적인 수익 구조입니다. 마진율이 낮으면 더 저렴한 소싱처를 찾거나 판매가를 높일 방법을 검토하세요.",
                  link: { href: "/margin-calculator", label: "마진 계산기로 계산하기 →" },
                },
                {
                  step: "05",
                  title: "소량 테스트 판매",
                  desc: "분석이 끝났다고 대량 주문은 금물입니다. 10~30개로 테스트 판매 후 전환율·반품률·리뷰를 확인한 뒤 본격적으로 재고를 늘리세요.",
                },
              ].map((item) => (
                <div key={item.step} className="card p-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      {item.link && (
                        <Link href={item.link.href} className="inline-block mt-2 text-xs text-purple-600 hover:text-purple-800 font-medium transition-colors">
                          {item.link.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. 좋은 소싱처 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">주요 소싱처 비교</h2>
            <div className="space-y-4">
              {[
                {
                  name: "알리익스프레스 / 타오바오",
                  pros: "단가 낮음, 다양한 상품군, 소량 주문 가능",
                  cons: "배송 기간 길음 (7~20일), 품질 편차, 관세 주의",
                  fit: "테스트 판매, 단가 경쟁이 중요한 상품",
                },
                {
                  name: "국내 도매 사이트 (도매꾹, 도매토피아)",
                  pros: "빠른 배송, 품질 안정적, 반품 처리 용이",
                  cons: "단가가 해외 대비 높음",
                  fit: "빠른 재고 보충이 필요한 소모품류",
                },
                {
                  name: "1688 (중국 도매)",
                  pros: "알리익스프레스보다 단가 30~50% 저렴",
                  cons: "MOQ(최소 주문수량) 있음, 중국어 필요, 배대지 이용",
                  fit: "안정적인 매출 확인 후 대량 소싱",
                },
                {
                  name: "국내 중소 제조사 직접 거래",
                  pros: "독점 공급 가능, 브랜드화 가능, 품질 관리 용이",
                  cons: "초기 MOQ·계약 진입 장벽",
                  fit: "PB 상품 개발, 장기 운영 목표",
                },
              ].map((source) => (
                <div key={source.name} className="card p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{source.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-green-600 font-medium">장점</span>
                      <p className="text-gray-500 mt-0.5">{source.pros}</p>
                    </div>
                    <div>
                      <span className="text-red-500 font-medium">단점</span>
                      <p className="text-gray-500 mt-0.5">{source.cons}</p>
                    </div>
                    <div>
                      <span className="text-blue-500 font-medium">적합한 경우</span>
                      <p className="text-gray-500 mt-0.5">{source.fit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. 시즌별 소싱 캘린더 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">시즌별 소싱 캘린더 — 언제 무엇을 준비할까</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              이커머스에서 타이밍은 매출을 2~3배 차이 나게 합니다.
              시즌 상품은 <strong>판매 시작 6~8주 전</strong>에 소싱을 완료해야 재고를 확보할 수 있습니다.
            </p>
            <div className="space-y-3">
              {[
                { month: "1~2월", items: "핫팩, 난방용품, 설 선물세트, 다이어트 용품 (새해 결심)", tip: "12월 중순부터 소싱 준비" },
                { month: "3~4월", items: "봄 의류·신발, 캠핑 용품, 꽃가루 마스크, 자전거 액세서리", tip: "2월 말부터 준비" },
                { month: "5~6월", items: "어버이날 선물, 스포츠용품, 여름 의류, 선크림·자외선차단제", tip: "4월부터 선물세트 구성" },
                { month: "7~8월", items: "에어컨·선풍기 주변기기, 수영용품, 캠핑·물놀이 용품, 제습제", tip: "6월부터 재고 확보" },
                { month: "9~10월", items: "추석 선물세트, 등산·아웃도어, 핼러윈 소품, 가을 의류", tip: "8월 초부터 명절 준비" },
                { month: "11~12월", items: "크리스마스 소품, 연말 선물, 패딩·방한용품, 가습기", tip: "10월부터 소싱 완료 필수" },
              ].map((row) => (
                <div key={row.month} className="card p-4 flex gap-4 items-start">
                  <div className="shrink-0 w-14 text-center">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{row.month}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 mb-0.5">{row.items}</p>
                    <p className="text-xs text-gray-400">💡 {row.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. 소싱 실패 사례 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">소싱 실패 사례 — 이것만은 피하세요</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              많은 셀러들이 비슷한 이유로 소싱에서 실패합니다. 아래 사례를 미리 파악하고 같은 실수를 반복하지 마세요.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "💸 마진 계산 없이 \"싸게 샀다\"만 믿고 주문",
                  desc: "매입가가 싸도 배송비·수수료·반품 손실을 합산하면 마진이 거의 없거나 마이너스가 되는 경우가 많습니다. 반드시 플랫폼 수수료(쿠팡 10~12%, 스마트스토어 9.34%)를 포함한 실제 마진을 계산해야 합니다.",
                },
                {
                  title: "📦 검증 없이 대량 재고 선주문",
                  desc: "테스트 없이 바로 500개, 1,000개를 주문했다가 판매가 안 돼 재고 창고비·폐기 비용이 발생하는 사례가 빈번합니다. 10~50개로 시장 반응을 먼저 확인하는 것이 원칙입니다.",
                },
                {
                  title: "🔴 레드오션 아이템 진입",
                  desc: "무선이어폰, 텀블러, 마스크팩 같은 인기 카테고리는 이미 대형 셀러·브랜드가 점유하고 있어 초보 셀러가 상위에 노출되기 거의 불가능합니다. 픽셀러로 경쟁강도를 먼저 확인하고, '낮음' 또는 '보통' 키워드에 집중하세요.",
                },
                {
                  title: "🚚 납기·품질 검증 없이 새 소싱처 거래",
                  desc: "중국 소싱처의 경우 실제 납품 품질이 샘플과 다르거나, 납기가 크게 지연되는 경우가 많습니다. 소량 시험 거래 후 품질·납기를 검증하고 본 거래로 이어가세요.",
                },
              ].map((item) => (
                <div key={item.title} className="card p-5 border-l-4 border-red-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. AI 소싱 분석 활용법 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI 소싱 분석으로 더 빠르게 판단하기</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              픽셀러의 AI 소싱 분석은 검색량·경쟁강도·트렌드 데이터를 Claude AI가 해석해
              셀러 관점의 판단을 즉시 제공합니다. 데이터는 있지만 "결국 소싱해야 하는가"라는 판단이 어려울 때 활용하세요.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {[
                { icon: "📊", title: "시장 상황 해석", desc: "검색량과 트렌드를 바탕으로 현재 시장이 성장 중인지, 포화 상태인지 분석합니다." },
                { icon: "🎯", title: "소싱 적합도 평가", desc: "이 키워드로 지금 판매를 시작하기 적합한지 솔직하게 평가합니다." },
                { icon: "💡", title: "전략 팁 제공", desc: "가격 포지셔닝, 키워드 전략, 차별화 방향 등 실용적인 조언을 제공합니다." },
                { icon: "⚡", title: "즉시 분석", desc: "키워드 입력 후 AI 분석 버튼 한 번으로 3~5초 내 결과를 받을 수 있습니다." },
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

          {/* 7. 소싱 스코어 CTA */}
          <section className="card p-8 text-center bg-purple-50 border-purple-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">키워드 소싱 스코어 무료 확인</h2>
            <p className="text-gray-600 text-sm mb-6">
              픽셀러의 소싱 스코어는 검색량·트렌드·경쟁 강도를 종합해 0~100점으로 평가합니다.
              어떤 키워드가 지금 팔기 좋은지 데이터로 확인하세요.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              키워드 소싱 스코어 확인하기 →
            </Link>
          </section>

          {/* 5. FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <div className="space-y-4">
              {[
                {
                  q: "소싱할 때 마진율은 얼마 이상이어야 하나요?",
                  a: "쿠팡·스마트스토어 기준 최소 마진율 20%를 목표로 하세요. 광고비·반품률·파손 손실까지 감안하면 실질 마진은 더 낮아지기 때문입니다. 여유 있게 25~30% 이상을 목표로 소싱처를 찾는 것이 좋습니다.",
                },
                {
                  q: "처음 소싱은 몇 개부터 시작하는 게 좋을까요?",
                  a: "처음에는 10~30개로 테스트 판매를 권장합니다. 전환율이 확인되고 재고 회전이 안정되면 발주량을 늘리세요. 처음부터 대량 주문 후 재고가 쌓이면 보관비·기회비용이 크게 발생합니다.",
                },
                {
                  q: "중국 소싱 시 관세는 어떻게 되나요?",
                  a: "개인 수입의 경우 150달러(약 20만 원) 이하는 관세가 면제됩니다. 사업자 명의로 수입 시 목록통관 한도는 150달러이며, 초과 시 관세·부가세가 부과됩니다. 소싱 단가 계산 시 관세·운임을 포함한 실제 원가(랜딩 코스트)를 반드시 계산하세요.",
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
              <Link href="/guides/margin-rate-calculation" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-blue-500 mb-1">마진율 계산</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">마진율 계산법 완전 정복</h3>
                <p className="text-xs text-gray-400 mt-1">마진율·ROI·손익분기 개념과 계산 공식</p>
              </Link>
              <Link href="/guides/smartstore-beginners-guide" className="card p-5 hover:border-blue-300 transition-colors group">
                <p className="text-xs text-blue-500 mb-1">초보 가이드</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">스마트스토어 시작하기 완벽 가이드</h3>
                <p className="text-xs text-gray-400 mt-1">개설부터 첫 판매까지 단계별 안내</p>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
