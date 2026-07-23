import type { Metadata } from "next";
import Link from "next/link";
import { ArticleJsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixeller.co.kr";
const PAGE_URL = `${BASE_URL}/guides/smartstore-beginners-guide`;

export const metadata: Metadata = {
  title: "스마트스토어 시작하기 완벽 가이드 2026 — 개설부터 첫 판매까지",
  description:
    "스마트스토어 개설 방법부터 상품 등록, 첫 주문 처리까지 초보 셀러를 위한 단계별 완벽 가이드. 2026년 최신 기준으로 정리했습니다.",
  keywords: [
    "스마트스토어 시작하기",
    "스마트스토어 초보",
    "스마트스토어 개설",
    "스마트스토어 만들기",
    "스마트스토어 판매 방법",
    "네이버 스마트스토어 시작",
    "온라인 쇼핑몰 시작",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "스마트스토어 시작하기 완벽 가이드 2026",
    description: "개설부터 첫 판매까지, 스마트스토어 초보 셀러를 위한 단계별 가이드.",
    url: PAGE_URL,
    type: "article",
  },
};

export default function SmartstoreBeginnersGuidePage() {
  return (
    <>
      <ArticleJsonLd
        title="스마트스토어 시작하기 완벽 가이드 2026"
        description="스마트스토어 개설 방법부터 상품 등록, 첫 주문 처리까지 초보 셀러를 위한 단계별 완벽 가이드."
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
          <span className="text-gray-600">스마트스토어 시작하기</span>
        </nav>

        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            🛒 초보 셀러 가이드
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            스마트스토어 시작하기 완벽 가이드 2026
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            스마트스토어는 네이버가 운영하는 국내 최대 오픈마켓 플랫폼입니다.
            초기 비용 없이 누구나 시작할 수 있으며, 이 가이드에서는 개설부터 첫 판매까지
            모든 과정을 단계별로 안내합니다.
          </p>
          <p className="text-xs text-gray-400 mt-3">최종 업데이트: 2026년 7월</p>
        </header>

        <div className="prose-custom space-y-10">

          {/* 1. 스마트스토어란 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">스마트스토어란?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              스마트스토어는 네이버가 제공하는 무료 온라인 쇼핑몰 플랫폼입니다.
              네이버 쇼핑에 자동으로 노출되어 별도의 마케팅 없이도 검색 유입이 가능하고,
              개인사업자·법인·개인(일반인) 모두 개설할 수 있습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "💰", title: "초기 비용 없음", desc: "입점비·월정액 0원. 판매 수수료만 발생" },
                { icon: "🔍", title: "네이버 쇼핑 자동 노출", desc: "국내 최대 쇼핑 검색엔진에 자동 등록" },
                { icon: "📦", title: "간편한 배송 연동", desc: "CJ대한통운 등 주요 택배사 자동 연동" },
              ].map((item) => (
                <div key={item.title} className="card p-4 text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2. 개설 단계 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">스마트스토어 개설 단계</h2>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "네이버 계정 준비 & 스마트스토어 가입",
                  desc: "smartstore.naver.com 접속 → '판매자 가입' 클릭. 개인/개인사업자/법인 중 선택. 개인으로 시작해도 연 매출 4,800만 원 이상이면 사업자 등록이 필수입니다.",
                },
                {
                  step: "02",
                  title: "스토어 기본 정보 설정",
                  desc: "스토어명, 스토어 URL, 대표 이미지, 소개글을 입력합니다. 스토어명은 이후 변경이 어려우니 브랜드를 고려해 신중하게 정하세요.",
                },
                {
                  step: "03",
                  title: "정산 계좌 & 배송 설정",
                  desc: "정산받을 계좌를 등록합니다. 배송 방법(직접 배송/택배)과 기본 배송비를 설정하세요. 무료배송 설정 시 전환율이 높아지지만 마진에 영향을 줍니다.",
                },
                {
                  step: "04",
                  title: "상품 등록",
                  desc: "상품명, 카테고리, 판매가, 상세 이미지를 입력합니다. 네이버 쇼핑 SEO를 위해 상품명에 핵심 키워드를 포함시키는 것이 중요합니다.",
                },
                {
                  step: "05",
                  title: "첫 주문 처리",
                  desc: "주문 확인 → 송장 번호 입력 → 발송 처리 순서로 진행합니다. 구매확정 후 1영업일 내 정산됩니다.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 card p-5">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
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

          {/* 3. 초보 셀러 필수 체크리스트 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">초보 셀러 필수 체크리스트</h2>
            <div className="card p-6 space-y-3">
              {[
                "판매할 아이템의 마진율 계산 완료 (수수료 9.34% + 배송비 포함)",
                "경쟁 상품 최저가 조사 완료",
                "상품 대표 이미지 흰 배경 1000×1000px 이상 준비",
                "상세페이지 모바일 최적화 확인",
                "배송 소요일 현실적으로 설정 (초과 시 페널티)",
                "고객 문의 응답 시간 설정 (24시간 이내 권장)",
                "반품/교환 정책 명확히 고지",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. 초보가 자주 하는 실수 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">초보 셀러가 자주 하는 실수</h2>
            <div className="space-y-4">
              <div className="card p-5 border-l-4 border-red-300">
                <h3 className="font-semibold text-gray-900 mb-1">❌ 수수료 계산 없이 판매가 설정</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  스마트스토어 수수료 9.34% + 배송비를 빼면 생각보다 마진이 적습니다.
                  반드시 판매가를 설정하기 전에 마진 계산기로 순이익을 먼저 확인하세요.
                </p>
              </div>
              <div className="card p-5 border-l-4 border-red-300">
                <h3 className="font-semibold text-gray-900 mb-1">❌ 경쟁이 너무 치열한 아이템 선택</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  인기 상품은 이미 대형 셀러가 점유하고 있어 초보가 진입하기 어렵습니다.
                  검색량은 있지만 경쟁 상품이 적은 틈새 키워드를 찾는 것이 핵심입니다.
                </p>
              </div>
              <div className="card p-5 border-l-4 border-red-300">
                <h3 className="font-semibold text-gray-900 mb-1">❌ 상품명에 키워드 미포함</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  네이버 쇼핑은 상품명을 기반으로 검색 노출이 결정됩니다.
                  고객이 실제로 검색하는 키워드를 상품명 앞쪽에 배치해야 노출이 높아집니다.
                </p>
              </div>
            </div>
          </section>

          {/* 5. 상품명 최적화 & 네이버 쇼핑 SEO */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">상품명 최적화 & 네이버 쇼핑 SEO</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              네이버 쇼핑에서 상위에 노출되려면 <strong>상품명 구성</strong>이 가장 중요합니다.
              네이버 쇼핑은 상품명을 기반으로 검색 결과를 결정하기 때문에,
              고객이 실제로 검색하는 키워드를 상품명에 포함시켜야 합니다.
            </p>
            <div className="space-y-4">
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-3">효과적인 상품명 구성 공식</h3>
                <div className="bg-blue-50 rounded-lg p-4 font-mono text-sm text-blue-800 mb-3">
                  [핵심 키워드] + [세부 특성] + [브랜드 or 부가 정보]
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>❌ <span className="text-red-500">나쁜 예:</span> "프리미엄 에코백 신상품 예쁜 가방"</p>
                  <p>✅ <span className="text-green-600">좋은 예:</span> "캔버스 에코백 대용량 숄더백 여성 천가방 학생가방"</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "키워드 순서", desc: "가장 검색량이 많은 핵심 키워드를 상품명 앞쪽에 배치합니다. 뒤에 있는 키워드는 가중치가 낮습니다." },
                  { title: "중복 키워드 피하기", desc: "같은 단어를 반복 사용하면 스팸으로 처리될 수 있습니다. 유사어를 활용해 다양한 검색어를 커버하세요." },
                  { title: "특수문자 최소화", desc: "!, *, ~ 같은 특수문자는 검색 노출에 도움이 되지 않습니다. 슬래시(/)만 허용됩니다." },
                  { title: "픽셀러로 키워드 확인", desc: "상품명에 넣을 키워드를 결정하기 전, 픽셀러에서 실제 검색량과 경쟁강도를 먼저 확인하세요." },
                ].map((tip) => (
                  <div key={tip.title} className="card p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{tip.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. 스마트스토어 등급 혜택 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">스마트스토어 판매자 등급과 혜택</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              네이버는 판매자를 새싹, 씨앗, 스타트, 파워, 빅파워, 프리미엄 6단계로 분류합니다.
              등급이 높을수록 수수료 혜택, 광고 지원, 정산 주기 개선 등 다양한 혜택이 제공됩니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">등급</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">조건 (최근 3개월)</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold text-gray-700">주요 혜택</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { grade: "🌱 새싹", cond: "가입 후 3개월 미만", benefit: "기본 판매 환경" },
                    { grade: "🌾 씨앗", cond: "구매확정 50건 이상", benefit: "N페이 포인트 적립 연동" },
                    { grade: "⭐ 스타트", cond: "판매건수 300건·매출 800만원", benefit: "정산 주기 개선" },
                    { grade: "⚡ 파워", cond: "판매건수 1,500건·매출 4,000만원", benefit: "수수료 0.1%p 할인, 광고 크레딧" },
                    { grade: "🔥 빅파워", cond: "판매건수 4,500건·매출 1억2천만원", benefit: "수수료 0.2%p 할인, 우선 고객 지원" },
                    { grade: "👑 프리미엄", cond: "판매건수 1만건·매출 5억원", benefit: "수수료 0.3%p 할인, 전담 매니저" },
                  ].map((row) => (
                    <tr key={row.grade} className="border-b border-gray-100">
                      <td className="p-3 border border-gray-200 font-medium text-gray-800">{row.grade}</td>
                      <td className="p-3 border border-gray-200 text-gray-600">{row.cond}</td>
                      <td className="p-3 border border-gray-200 text-gray-600">{row.benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">※ 등급 기준은 네이버 정책 변경에 따라 바뀔 수 있습니다.</p>
          </section>

          {/* 7. 초기 마케팅 전략 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">초보 셀러를 위한 초기 마케팅 전략</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              처음에는 광고 없이 오가닉 판매를 목표로 합니다. 리뷰가 쌓이고 전환율이 검증된 후
              네이버 쇼핑 검색광고를 추가하면 ROI가 높아집니다.
            </p>
            <div className="space-y-3">
              {[
                { phase: "1단계 (0~30일)", title: "리뷰 0개 극복", desc: "지인을 통한 초기 구매 유도, 리뷰 작성 요청 쿠폰 발행. 리뷰 5개만 있어도 전환율이 크게 오릅니다." },
                { phase: "2단계 (30~90일)", title: "네이버 쇼핑 최적화", desc: "상품명·카테고리·태그 최적화. 배송 속도와 CS 응답 속도를 높여 구매 만족도 지수(판매자 점수)를 올립니다." },
                { phase: "3단계 (90일 이후)", title: "쇼핑검색광고 진입", desc: "검색광고 키워드를 소량·저단가로 테스트하며 전환율 높은 키워드를 찾습니다. ROAS 목표를 600% 이상으로 설정하세요." },
              ].map((item) => (
                <div key={item.phase} className="card p-5">
                  <div className="flex gap-4">
                    <div className="shrink-0 bg-gray-100 rounded-lg px-3 py-2 text-xs font-bold text-gray-500 h-fit">{item.phase}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. 마진 계산기 CTA */}
          <section className="card p-8 text-center bg-blue-50 border-blue-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">판매 전 마진부터 계산하세요</h2>
            <p className="text-gray-600 text-sm mb-6">
              스마트스토어 수수료 9.34%가 자동 반영됩니다. 매입가와 판매가를 입력하면
              순이익·마진율·손익분기 수량까지 한 번에 확인할 수 있습니다.
            </p>
            <Link
              href="/margin-calculator"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
                  q: "사업자 없이도 스마트스토어를 시작할 수 있나요?",
                  a: "네, 개인(간이과세자 미등록) 자격으로 시작할 수 있습니다. 단, 연 매출 4,800만 원을 초과하면 사업자 등록이 필수입니다. 처음에는 개인으로 시작해 매출이 생기면 사업자로 전환하는 것이 일반적입니다.",
                },
                {
                  q: "스마트스토어 개설 비용이 있나요?",
                  a: "개설 비용은 없습니다. 월정액·입점비 0원이며, 판매가 발생했을 때만 수수료(9.34%)가 부과됩니다. 판매가 없으면 비용이 전혀 발생하지 않습니다.",
                },
                {
                  q: "처음 어떤 상품을 팔면 좋을까요?",
                  a: "초보에게는 ① 단가가 낮아 재고 부담이 적고 ② 반품이 적으며 ③ 검색량이 있는 생활용품·소품류가 적합합니다. 픽셀러의 키워드 분석 기능으로 검색량과 경쟁 강도를 먼저 확인해보세요.",
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
                <p className="text-xs text-gray-400 mt-1">매출연동수수료·결제수수료 구조 정리</p>
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
