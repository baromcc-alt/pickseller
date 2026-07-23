import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixeller.co.kr";
const PAGE_URL = `${BASE_URL}/about`;

export const metadata: Metadata = {
  title: "픽셀러 소개 — 무료 셀러 키워드 분석 도구",
  description:
    "픽셀러는 스마트스토어·쿠팡 셀러를 위한 무료 키워드 분석 & AI 소싱 분석 도구입니다. 네이버 검색량, 경쟁강도, AI 소싱 조언을 한 곳에서 확인하세요.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "픽셀러 소개 | 무료 셀러 키워드 분석",
    description: "스마트스토어·쿠팡 셀러를 위한 무료 키워드 분석 & AI 소싱 도구.",
    url: PAGE_URL,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      {/* 헤더 */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          픽셀러 소개
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          스마트스토어·쿠팡 셀러를 위한 무료 키워드 분석 & AI 소싱 분석 도구입니다.
        </p>
      </div>

      {/* 픽셀러가 만들어진 이유 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">왜 만들었나요?</h2>
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
          <p>
            이커머스 셀러로 활동하면서 항상 답하기 어려운 질문이 있었습니다.
            <strong className="text-gray-800"> "지금 이 아이템, 소싱해도 될까?"</strong>
          </p>
          <p>
            검색량은 얼마나 되는지, 경쟁자는 얼마나 많은지, 지금이 진입 타이밍인지 — 이 정보를 얻으려면
            네이버 검색광고 도구, DataLab, 각종 유료 솔루션을 여러 개 열어두고 일일이 비교해야 했습니다.
            게다가 데이터를 보더라도 "그래서 이 아이템을 소싱해야 하는가, 말아야 하는가"라는 판단은
            여전히 셀러 본인 몫이었습니다.
          </p>
          <p>
            픽셀러는 이 과정을 단순하게 만들기 위해 만들어졌습니다. 키워드 하나를 입력하면
            검색량·경쟁강도·트렌드를 종합한 소싱 스코어와, AI가 해석한 전략 조언을 바로 받을 수 있습니다.
            누구나 무료로 사용할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 주요 기능 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-5">주요 기능</h2>
        <div className="grid gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5">
              <span className="text-2xl shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 이런 분께 추천 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">이런 분께 추천합니다</h2>
        <ul className="space-y-3">
          {targets.map((t) => (
            <li key={t} className="flex items-start gap-3 text-gray-600">
              <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 데이터 출처 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">데이터 출처</h2>
        <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-3 text-sm">
          <p>
            픽셀러는 <strong className="text-gray-800">네이버 검색광고 API</strong>를 통해 실제 월간 검색량과
            경쟁강도 데이터를 수집합니다. 이 데이터는 네이버 검색광고 플랫폼에서 광고주에게 제공하는
            공식 지표와 동일한 수치로, 키워드의 실제 시장 규모를 가장 정확하게 반영합니다.
          </p>
          <p>
            소싱 스코어는 월 검색량(40점), 경쟁강도(30점), 트렌드(30점) 세 가지 요소를 종합해
            0~100점으로 산출하며, AI 분석은 Anthropic Claude 모델을 활용해 데이터를 해석하고
            셀러 관점의 전략 조언을 생성합니다.
          </p>
          <p>
            모든 데이터는 24시간 단위로 캐싱되며, 사용자에게는 항상 최신 상태를 유지합니다.
          </p>
        </div>
      </section>

      {/* 무료 정책 */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">무료로 운영하는 이유</h2>
        <div className="text-sm text-gray-600 leading-relaxed space-y-3">
          <p>
            픽셀러의 모든 핵심 기능은 무료입니다. 처음 셀러를 시작하는 분들이 비용 부담 없이
            데이터 기반 의사결정을 할 수 있도록 돕고 싶었습니다.
          </p>
          <p>
            서비스 운영 비용은 페이지 내 Google 광고를 통해 충당합니다. 광고가 불편하게 느껴지실 수 있지만,
            서비스를 지속하기 위한 최소한의 수단임을 이해해 주시면 감사하겠습니다.
          </p>
        </div>
      </section>

      {/* 연락처 */}
      <section className="mb-12 rounded-xl border border-blue-100 bg-blue-50/50 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">문의 & 피드백</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          서비스 개선 의견, 버그 제보, 협업 문의 모두 환영합니다.
          셀러 현장에서 필요한 기능이 있다면 알려주세요 — 적극 반영하겠습니다.
        </p>
        <a
          href="mailto:baromcc@gmail.com"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          baromcc@gmail.com
        </a>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          키워드 분석 시작하기
        </Link>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "🎯",
    title: "소싱 스코어 (0~100점)",
    desc: "월 검색량·경쟁강도·트렌드를 종합한 소싱 적합도 점수. S~D 등급으로 한눈에 판단할 수 있습니다.",
  },
  {
    icon: "🔍",
    title: "실제 검색량 데이터",
    desc: "네이버 검색광고 API 기반 월간 PC·모바일 실제 검색 횟수. 추정치가 아닌 실데이터입니다.",
  },
  {
    icon: "💡",
    title: "소싱 기회 키워드 발굴",
    desc: "연관 키워드 중 검색량은 충분하고 경쟁강도가 낮은 '틈새 아이템'을 자동으로 추려줍니다.",
  },
  {
    icon: "✨",
    title: "AI 소싱 분석",
    desc: "데이터를 AI가 해석해 시장 상황, 소싱 적합도, 셀러 전략 팁을 즉시 제공합니다. Claude 기반.",
  },
  {
    icon: "🧮",
    title: "마진 계산기",
    desc: "판매가·원가·수수료를 입력하면 예상 마진과 마진율을 즉시 계산합니다. 역산 기능 포함.",
  },
  {
    icon: "📚",
    title: "셀러 가이드",
    desc: "스마트스토어 수수료, 쿠팡 로켓그로스, 아이템 소싱 방법 등 실전 가이드를 무료로 제공합니다.",
  },
];

const targets = [
  "스마트스토어·쿠팡에서 새 아이템을 소싱하려는 셀러",
  "어떤 키워드가 지금 팔기 좋은지 데이터로 확인하고 싶은 분",
  "처음 이커머스를 시작하는 초보 셀러",
  "유료 도구 없이 데이터 기반으로 아이템 선정을 하고 싶은 분",
  "경쟁이 낮은 틈새 키워드를 찾고 있는 셀러",
];
