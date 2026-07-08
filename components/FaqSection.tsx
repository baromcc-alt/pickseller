"use client";

import { useState } from "react";

const faqs = [
  {
    q: "픽셀러는 무료인가요?",
    a: "네, 완전 무료입니다. 키워드 분석, 트렌드 조회, 마진 계산기 모두 회원가입 없이 사용 가능합니다.",
  },
  {
    q: "키워드 데이터는 어디서 가져오나요?",
    a: "네이버 데이터랩 API를 통해 실제 네이버 쇼핑 검색량 트렌드 데이터를 가져옵니다. 동일 키워드는 24시간 캐시되어 빠르게 제공됩니다.",
  },
  {
    q: "마진율 몇 % 이상이어야 수익이 나나요?",
    a: "일반적으로 쿠팡·스마트스토어 기준 마진율 20% 이상이면 안정적인 수익 구조로 봅니다. 광고비와 반품률을 감안하면 25~30% 이상을 목표로 하는 것이 좋습니다. 픽셀러 마진 시뮬레이터에서 목표 마진율에 맞는 최대 매입가를 역산할 수 있습니다.",
  },
  {
    q: "어떤 마켓을 지원하나요?",
    a: "쿠팡, 네이버 스마트스토어, 자사몰, 지마켓/옥션, 11번가의 수수료 구조를 지원합니다. 마진 계산기에서 마켓을 선택하면 수수료가 자동 반영됩니다.",
  },
  {
    q: "스마트스토어 초보 셀러도 사용할 수 있나요?",
    a: "물론입니다. 픽셀러는 초보 셀러를 위해 복잡한 데이터를 쉽게 이해할 수 있도록 설계되었습니다. 키워드 트렌드 차트, 마진 계산기, 인기 카테고리 랭킹 등 소싱에 바로 활용할 수 있는 정보를 제공합니다.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto py-14 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">자주 묻는 질문</h2>
      <p className="text-gray-500 text-center mb-8 text-sm">픽셀러 사용에 대한 궁금증을 해결해드립니다</p>
      <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              aria-expanded={openIdx === i}
            >
              <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
              <svg
                className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIdx === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
