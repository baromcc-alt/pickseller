// JSON-LD 구조화 데이터 컴포넌트
// Google / ChatGPT / Perplexity 등 AI 검색엔진 인용 최적화 (GEO)

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";

// ────────────────────────────────────────────
// 사이트 전체 — WebSite 스키마 (홈에 삽입)
// ────────────────────────────────────────────

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "픽셀러",
    alternateName: "Pickseller",
    url: BASE_URL,
    description:
      "셀러를 위한 무료 키워드 분석 및 마진 계산 도구. 네이버 스마트스토어·쿠팡 셀러를 위한 데이터 기반 아이템 소싱 플랫폼.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/keyword/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "ko-KR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ────────────────────────────────────────────
// 키워드 상세 페이지 — WebPage + Dataset 스키마
// ────────────────────────────────────────────

interface KeywordPageJsonLdProps {
  keyword: string;
  trendData?: { period: string; ratio: number }[];
}

export function KeywordPageJsonLd({ keyword, trendData }: KeywordPageJsonLdProps) {
  const pageUrl = `${BASE_URL}/keyword/${encodeURIComponent(keyword)}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: `"${keyword}" 키워드 분석 — 검색량 트렌드, 경쟁 강도 | 픽셀러`,
        description: `네이버 쇼핑 "${keyword}" 키워드의 월별 검색량 트렌드, 경쟁 강도, 평균 판매가를 무료로 분석합니다. 스마트스토어·쿠팡 셀러를 위한 데이터 기반 아이템 소싱 도구.`,
        inLanguage: "ko-KR",
        isPartOf: { "@id": BASE_URL },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "홈", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "키워드 분석", item: `${BASE_URL}/keyword` },
            { "@type": "ListItem", position: 3, name: keyword, item: pageUrl },
          ],
        },
      },
      // 트렌드 데이터가 있으면 Dataset으로 표현
      ...(trendData && trendData.length > 0
        ? [
            {
              "@type": "Dataset",
              name: `${keyword} 네이버 검색량 트렌드 데이터`,
              description: `네이버 데이터랩 기준 "${keyword}" 키워드의 주간 상대 검색량 지수`,
              url: pageUrl,
              creator: { "@type": "Organization", name: "픽셀러" },
              temporalCoverage: `${trendData[0]?.period}/${trendData[trendData.length - 1]?.period}`,
              variableMeasured: "상대 검색량 지수 (0~100)",
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ────────────────────────────────────────────
// 마진 계산기 페이지 — SoftwareApplication + FAQPage
// ────────────────────────────────────────────

export function MarginCalculatorJsonLd() {
  const pageUrl = `${BASE_URL}/margin-calculator`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "픽셀러 마진 계산기",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: pageUrl,
        description:
          "쿠팡·스마트스토어·자사몰 등 마켓별 수수료를 반영한 무료 마진 계산기. 매입가와 판매가를 입력하면 순이익·마진율·손익분기 판매가를 자동으로 계산합니다.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "KRW",
        },
        featureList: [
          "마켓별 수수료 자동 반영 (쿠팡, 스마트스토어, 자사몰)",
          "순이익 및 마진율 계산",
          "손익분기 판매가 계산",
          "ROI(투자수익률) 계산",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "쿠팡 판매 수수료는 얼마인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "쿠팡 아이템위너 기준 판매 수수료는 약 10.8%입니다. 카테고리에 따라 다를 수 있으며, 배송비는 별도로 협의됩니다.",
            },
          },
          {
            "@type": "Question",
            name: "스마트스토어 수수료는 얼마인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "네이버 스마트스토어의 매출연동수수료는 5.6%이며, 네이버페이 결제 수수료 3.74%가 추가로 발생합니다. 합산 약 9.34%입니다.",
            },
          },
          {
            "@type": "Question",
            name: "마진율은 어떻게 계산하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "마진율(%) = (판매가 - 총비용) ÷ 판매가 × 100으로 계산합니다. 총비용에는 매입가, 배송비, 플랫폼 수수료, 광고비, 포장비가 포함됩니다. 일반적으로 마진율 20% 이상이 안정적인 수익 구조로 봅니다.",
            },
          },
          {
            "@type": "Question",
            name: "손익분기 판매가란 무엇인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "손익분기 판매가는 이익도 손실도 없는 최소 판매가입니다. 고정 비용(매입가 + 배송비 + 광고비 + 포장비)을 수수료율을 제외한 비율로 나누어 계산합니다.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ────────────────────────────────────────────
// 홈페이지 FAQPage
// ────────────────────────────────────────────

export function HomeFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "픽셀러는 무료인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 픽셀러의 모든 기능은 완전 무료입니다. 키워드 분석, 트렌드 조회, 마진 계산기 모두 로그인 없이 사용 가능합니다.",
        },
      },
      {
        "@type": "Question",
        name: "키워드 데이터는 어디서 가져오나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네이버 데이터랩 API를 통해 실제 네이버 쇼핑 검색량 트렌드 데이터를 가져옵니다. 동일 키워드는 24시간 캐시되어 빠르게 제공됩니다.",
        },
      },
      {
        "@type": "Question",
        name: "어떤 마켓을 지원하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "쿠팡, 네이버 스마트스토어, 자사몰, 지마켓/옥션, 11번가의 수수료 구조를 지원합니다. 마진 계산기에서 마켓을 선택하면 해당 수수료가 자동으로 적용됩니다.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
