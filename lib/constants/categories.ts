// 카테고리별 키워드 시드 목록
// 네이버 데이터랩 API로 트렌드를 가져와 랭킹을 매기는 기준 데이터

export interface KeywordCategory {
  id: string;
  label: string;
  emoji: string;
  keywords: string[];
}

export const KEYWORD_CATEGORIES: KeywordCategory[] = [
  {
    id: "electronics",
    label: "전자기기",
    emoji: "📱",
    keywords: [
      "무선이어폰", "블루투스이어폰", "노이즈캔슬링이어폰",
      "보조배터리", "고속충전기", "c타입케이블",
      "스마트워치", "갤럭시버즈", "애플워치밴드",
      "게이밍마우스", "마우스패드", "노트북파우치",
    ],
  },
  {
    id: "living",
    label: "생활/건강",
    emoji: "🏠",
    keywords: [
      "텀블러", "보온병", "스탠리텀블러",
      "에어프라이어", "전기포트", "핸드블렌더",
      "무선청소기", "로봇청소기", "걸레청소기",
      "LED스탠드", "무드등", "비타민",
    ],
  },
  {
    id: "beauty",
    label: "패션/뷰티",
    emoji: "💄",
    keywords: [
      "마스크팩", "선크림", "비타민c세럼",
      "캐리어", "여행파우치", "여권케이스",
      "향수", "립스틱", "파운데이션",
    ],
  },
  {
    id: "sports",
    label: "스포츠/레저",
    emoji: "🏃",
    keywords: [
      "요가매트", "폼롤러", "밴드운동기구",
      "런닝화", "헬스장갑", "단백질쉐이크",
      "프로틴바", "다이어트식품", "체중계",
    ],
  },
  {
    id: "camping",
    label: "캠핑/아웃도어",
    emoji: "⛺",
    keywords: [
      "캠핑의자", "캠핑테이블", "텐트",
      "캠핑랜턴", "침낭", "캠핑매트",
      "버너", "코펠", "아이스박스",
    ],
  },
  {
    id: "pet",
    label: "반려동물",
    emoji: "🐾",
    keywords: [
      "강아지간식", "고양이간식", "펫케어",
      "강아지옷", "고양이장난감", "강아지하네스",
      "펫카메라", "자동급식기", "강아지샴푸",
    ],
  },
];

export const ALL_SEED_KEYWORDS = KEYWORD_CATEGORIES.flatMap((c) => c.keywords);

export function getCategoryById(id: string): KeywordCategory | undefined {
  return KEYWORD_CATEGORIES.find((c) => c.id === id);
}

export function getCategoryByKeyword(keyword: string): KeywordCategory | undefined {
  return KEYWORD_CATEGORIES.find((c) => c.keywords.includes(keyword));
}
