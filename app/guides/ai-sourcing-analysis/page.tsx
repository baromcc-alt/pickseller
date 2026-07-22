import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";
const PAGE_URL = `${BASE_URL}/guides/ai-sourcing-analysis`;

export const metadata: Metadata = {
  title: "AI 소싱 분석이란? 작동 원리 & 활용법 완벽 가이드 | 픽셀러",
  description:
    "픽셀러의 AI 소싱 분석 기능을 알아보세요. 네이버 검색량 데이터와 Claude AI가 키워드의 소싱 가능성을 50점 만점으로 평가하고 셀러 전략을 제안합니다.",
  keywords: [
    "AI 소싱 분석", "키워드 소싱 분석", "아이템 소싱 방법", "스마트스토어 소싱",
    "쿠팡 소싱 도구", "소싱 스코어", "픽셀러", "AI 셀러 도구",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI 소싱 분석이란? 작동 원리 & 활용법 | 픽셀러",
    description:
      "네이버 검색량 + Claude AI가 키워드 소싱 가능성을 분석합니다. 50점 만점 소싱 스코어와 셀러 전략 제안 원리를 알아보세요.",
    url: PAGE_URL,
    type: "article",
  },
};

export default function AiSourcingAnalysisGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* 브레드크럼 */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-blue-600 transition-colors">가이드</Link>
        <span>/</span>
        <span className="text-gray-600">AI 소싱 분석</span>
      </nav>

      {/* 헤더 */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          기능 가이드
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          AI 소싱 분석이란?<br />작동 원리 & 활용법
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          픽셀러의 AI 소싱 분석은 네이버 검색량 데이터와 Claude AI를 결합해
          키워드의 소싱 가능성을 자동으로 평가하고 셀러 전략을 제안합니다.
          셀러가 직접 하던 시장 조사를 몇 초 만에 처리합니다.
        </p>
      </header>

      {/* 목차 */}
      <nav className="card p-5 mb-10 bg-gray-50 border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">목차</p>
        <ol className="space-y-1.5 text-sm">
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="prose-content space-y-12">

        {/* 1. AI 소싱 분석이란 */}
        <section id="what-is">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. AI 소싱 분석이란?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            AI 소싱 분석은 셀러가 <strong className="text-gray-800">"이 키워드로 판매를 시작해도 될까?"</strong>를 판단할 때
            필요한 시장 조사를 자동화한 기능입니다.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            기존에는 셀러가 직접 네이버 쇼핑에서 검색량을 확인하고, 경쟁 상품 수를 세고, 가격대를 분석한 뒤
            경험에 의존해 판단해야 했습니다. 이 과정을 픽셀러는 두 가지 기술로 자동화합니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <div className="card p-5 border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📊</span>
                <h3 className="font-semibold text-gray-900 text-sm">소싱 스코어</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                네이버 DataLab 검색량 데이터를 기반으로 소싱 가능성을 <strong>0~50점</strong>으로 정량화합니다.
                숫자로 객관적 비교가 가능합니다.
              </p>
            </div>
            <div className="card p-5 border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">✨</span>
                <h3 className="font-semibold text-gray-900 text-sm">AI 전략 분석</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Claude AI가 데이터를 해석해 <strong>시장 상황, 소싱 적합도, 셀러 전략 팁</strong>을
                자연어로 제안합니다. 데이터 해석의 부담을 덜어줍니다.
              </p>
            </div>
          </div>
        </section>

        {/* 2. 작동 원리 */}
        <section id="how-it-works">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 작동 원리 3단계</h2>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1 card p-4">
                  <h3 className="font-semibold text-gray-900 mb-1.5">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 소싱 스코어 구성 */}
        <section id="scoring">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 소싱 스코어 구성 (50점 만점)</h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            소싱 스코어는 두 가지 항목으로 구성되며, 합산 점수로 등급을 부여합니다.
            쇼핑 API 종료(2026년 7월)로 경쟁 상품 수 항목은 제거하고 순수 검색량 기반으로 운영합니다.
          </p>

          {/* 점수 구성 */}
          <div className="card overflow-hidden mb-6">
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">검색량 점수</span>
                  <span className="text-xl font-bold text-blue-600">30점</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-3">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: "60%" }} />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  최근 4주 평균 검색량 지수(0~100)를 30점으로 환산.
                  검색량이 높을수록 수요가 충분하다는 의미.
                </p>
                <p className="text-xs text-gray-400 mt-2">예: 검색량 지수 80 → 24점</p>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">트렌드 점수</span>
                  <span className="text-xl font-bold text-purple-600">20점</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-3">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: "40%" }} />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  최근 4주 vs 이전 4주 검색량 변화율로 방향성 평가.
                  상승 추세일수록 지금이 진입 적기.
                </p>
                <p className="text-xs text-gray-400 mt-2">상승 +10% 이상: 20점 / 안정: 13점 / 하락: 5점</p>
              </div>
            </div>
          </div>

          {/* 등급 테이블 */}
          <h3 className="font-semibold text-gray-900 mb-3">등급 기준표</h3>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">등급</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">점수 범위</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">의미</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">판단</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {grades.map((g) => (
                  <tr key={g.grade} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${g.bg} ${g.color}`}>
                        {g.grade}등급
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">{g.range}</td>
                    <td className="px-4 py-3 text-gray-600">{g.label}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{g.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. AI가 분석하는 내용 */}
        <section id="ai-analysis">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. AI가 분석하는 내용</h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            소싱 스코어 카드에서 <strong>"AI 소싱 분석 요청"</strong> 버튼을 누르면
            Claude AI(Haiku)가 아래 3가지를 분석해 자연어로 답변합니다.
            검색량 데이터를 불러오지 못한 경우에도 키워드 카테고리 특성을 바탕으로 분석을 제공합니다.
          </p>

          <div className="space-y-3">
            {aiOutputs.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${item.bg} ${item.color}`}>
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  <p className="text-xs text-gray-400 mt-1 italic">예: {item.example}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 실제 예시 박스 */}
          <div className="mt-6 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-purple-700">AI 소싱 분석 예시 — "무선이어폰"</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>시장 상황:</strong> 검색량이 높고 지속 상승 중으로 수요가 견고합니다.
              시장은 활성화되어 있으나 경쟁도 치열한 편입니다.{" "}
              <strong>소싱 적합도:</strong> 검색량 기반 A등급으로 진입을 검토해볼 만합니다.
              단, 차별화 전략 없이는 가격 경쟁에 휘말릴 수 있습니다.{" "}
              <strong>셀러 전략 팁:</strong> 노이즈 캔슬링·배터리 용량 등 구체적 스펙을 타이틀에 명시하고,
              리뷰 초기 확보에 집중하세요.
            </p>
          </div>
        </section>

        {/* 5. 언제 사용하면 좋은가 */}
        <section id="when-to-use">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 언제 사용하면 좋은가?</h2>

          <div className="space-y-3">
            {useCases.map((item, i) => (
              <div key={i} className="flex gap-3 items-start card p-4">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. 자주 묻는 질문 */}
        <section id="faq">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 자주 묻는 질문</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-blue-600 shrink-0">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="try-it" className="card p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">직접 분석해보세요</h2>
          <p className="text-gray-500 text-sm mb-5">
            관심 있는 키워드를 검색하면 소싱 스코어와 AI 분석을 바로 확인할 수 있습니다.
            회원가입 없이 완전 무료.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              키워드 AI 분석 시작하기
            </Link>
            <Link
              href="/guides/item-sourcing-guide"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all"
            >
              아이템 소싱 가이드 읽기
            </Link>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">관련 가이드</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedGuides.map((g) => (
              <Link key={g.href} href={g.href} className="card p-4 hover:border-blue-200 hover:shadow-sm transition-all group">
                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${g.badgeColor}`}>{g.badge}</span>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">{g.title}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const toc = [
  { id: "what-is", label: "1. AI 소싱 분석이란?" },
  { id: "how-it-works", label: "2. 작동 원리 3단계" },
  { id: "scoring", label: "3. 소싱 스코어 구성 (50점 만점)" },
  { id: "ai-analysis", label: "4. AI가 분석하는 내용" },
  { id: "when-to-use", label: "5. 언제 사용하면 좋은가?" },
  { id: "faq", label: "6. 자주 묻는 질문" },
  { id: "try-it", label: "직접 분석해보기" },
];

const steps = [
  {
    title: "검색량 데이터 수집",
    desc: "키워드를 입력하면 픽셀러가 네이버 DataLab API에서 최근 3개월 주간 검색량 트렌드를 수집합니다. 같은 키워드는 최대 7일간 캐시해 API 호출을 최소화합니다.",
  },
  {
    title: "소싱 스코어 계산",
    desc: "수집된 검색량 데이터를 바탕으로 검색량 점수(30점)와 트렌드 방향 점수(20점)를 계산해 합산합니다. S·A·B·C·D 5단계 등급으로 변환됩니다.",
  },
  {
    title: "Claude AI 해석 및 전략 제안",
    desc: '"AI 소싱 분석 요청" 버튼을 누르면 소싱 스코어 데이터가 Anthropic의 Claude AI(Haiku 모델)로 전달됩니다. AI는 이커머스 전문가 역할로 시장 상황, 소싱 적합도, 셀러 전략 팁을 200자 이내로 제안합니다.',
  },
];

const grades = [
  { grade: "S", range: "40~50점", label: "강력 추천", action: "즉시 진입 검토", bg: "bg-purple-50", color: "text-purple-700" },
  { grade: "A", range: "32~39점", label: "소싱 적합", action: "적극 검토 권장", bg: "bg-blue-50", color: "text-blue-700" },
  { grade: "B", range: "23~31점", label: "검토 필요", action: "차별화 전략 수립 후 진입", bg: "bg-green-50", color: "text-green-700" },
  { grade: "C", range: "13~22점", label: "주의", action: "리스크 고려 후 결정", bg: "bg-yellow-50", color: "text-yellow-700" },
  { grade: "D", range: "0~12점", label: "비추천", action: "다른 키워드 탐색 권장", bg: "bg-red-50", color: "text-red-700" },
];

const aiOutputs = [
  {
    title: "시장 상황",
    desc: "검색량과 트렌드 방향을 바탕으로 현재 시장이 어떤 상태인지 설명합니다. 수요가 늘고 있는지, 포화 상태인지 등을 직관적으로 알 수 있습니다.",
    example: '"검색량이 꾸준히 상승 중으로 수요가 견고합니다. 시장은 활성화되어 있으나…"',
    bg: "bg-blue-100", color: "text-blue-700",
  },
  {
    title: "소싱 적합도",
    desc: "소싱 스코어와 등급을 근거로 지금 이 키워드로 판매를 시작하기 좋은지 솔직하게 평가합니다. 무조건 긍정이 아닌 리스크도 함께 제시합니다.",
    example: '"A등급으로 진입을 검토해볼 만합니다. 단, 차별화 없이는 가격 경쟁에 휘말릴 수 있습니다."',
    bg: "bg-purple-100", color: "text-purple-700",
  },
  {
    title: "셀러 전략 팁",
    desc: "이 키워드로 판매할 때 실제로 써먹을 수 있는 구체적인 조언을 제공합니다. 상품 페이지 전략, 타이밍, 포지셔닝 등 실용적인 내용입니다.",
    example: '"노이즈 캔슬링 스펙을 타이틀에 명시하고, 초기 리뷰 확보에 집중하세요."',
    bg: "bg-green-100", color: "text-green-700",
  },
];

const useCases = [
  {
    icon: "🆕",
    title: "새 아이템을 소싱하기 전",
    desc: "판매할 상품을 결정하기 전에 키워드를 검색해 수요와 트렌드를 확인하세요. 경험과 감이 아닌 데이터로 판단할 수 있습니다.",
  },
  {
    icon: "📈",
    title: "시즌 트렌드 모니터링",
    desc: "계절성이 있는 상품(캠핑용품, 난방용품 등)은 시즌 전에 검색량 트렌드를 확인해 재입고 타이밍을 잡는 데 활용하세요.",
  },
  {
    icon: "🔍",
    title: "여러 키워드 비교",
    desc: "비슷한 카테고리의 키워드 여러 개를 비교 분석해 가장 점수가 높은 키워드에 집중하는 전략을 세울 수 있습니다.",
  },
  {
    icon: "💡",
    title: "전략 아이디어 발굴",
    desc: "AI의 전략 팁에서 상품 페이지 개선 아이디어, 포지셔닝 힌트, 경쟁 차별화 포인트를 발견하는 데 활용하세요.",
  },
];

const faqs = [
  {
    q: "AI 소싱 분석은 완전 무료인가요?",
    a: "네, 현재 픽셀러의 모든 기능은 회원가입 없이 완전 무료로 제공됩니다. AI 소싱 분석도 횟수 제한 없이 사용할 수 있습니다.",
  },
  {
    q: "검색량 데이터는 어디서 가져오나요?",
    a: "네이버 DataLab API를 통해 실제 네이버 검색량 트렌드 데이터를 수집합니다. 지수는 0~100 상대 비율로 표시되며, 같은 키워드는 최대 7일간 캐시됩니다.",
  },
  {
    q: '"데이터를 불러오지 못했습니다"가 표시될 때는?',
    a: "네이버 DataLab API의 일일 호출 한도가 소진된 경우입니다. 이 경우에도 AI 소싱 분석은 키워드 카테고리 특성을 바탕으로 분석을 제공합니다. 데이터는 보통 다음 날 복구됩니다.",
  },
  {
    q: "50점 만점인 이유가 뭔가요?",
    a: "2026년 7월 네이버 쇼핑 검색 API 서비스가 종료되면서 경쟁 상품 수·평균 판매가 항목이 제거되었습니다. 현재는 네이버 DataLab 검색량 데이터만으로 산출 가능한 검색량(30점)과 트렌드 방향(20점)으로 구성됩니다.",
  },
  {
    q: "AI 분석은 얼마나 정확한가요?",
    a: "AI 분석은 소싱 스코어 데이터와 AI의 이커머스 카테고리 지식을 결합한 참고 의견입니다. 실제 소싱 결정 전에는 추가적인 경쟁 분석, 공급처 확인, 마진 계산을 함께 진행하시길 권장합니다.",
  },
  {
    q: "소싱 스코어가 낮으면 절대 판매하면 안 되나요?",
    a: "반드시 그렇지는 않습니다. C·D 등급이어도 명확한 틈새 전략이나 강력한 차별화가 있다면 성공적인 판매가 가능합니다. 소싱 스코어는 참고 지표로 활용하고, 최종 결정은 다양한 요소를 종합해 판단하세요.",
  },
];

const relatedGuides = [
  {
    href: "/guides/item-sourcing-guide",
    badge: "소싱 가이드",
    badgeColor: "bg-purple-50 text-purple-600",
    title: "아이템 소싱 방법 완벽 가이드 2026",
  },
  {
    href: "/guides/margin-rate-calculation",
    badge: "마진율 계산",
    badgeColor: "bg-green-50 text-green-600",
    title: "마진율 계산법 완전 정복 — 공식·ROI·손익분기",
  },
  {
    href: "/guides/smartstore-fee-guide",
    badge: "수수료 가이드",
    badgeColor: "bg-blue-50 text-blue-600",
    title: "스마트스토어 수수료 완벽 가이드 2026",
  },
  {
    href: "/guides/coupang-margin-calculator",
    badge: "마진 계산기",
    badgeColor: "bg-orange-50 text-orange-600",
    title: "쿠팡 마진 계산기 완벽 가이드 2026",
  },
];
