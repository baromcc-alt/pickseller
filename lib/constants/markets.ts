// ────────────────────────────────────────────
// 마켓별 수수료 상수
// 실제 수수료는 카테고리·조건에 따라 다를 수 있으니 직접 확인 후 수정하세요
// ────────────────────────────────────────────

export interface MarketFee {
  id: string;
  name: string;
  platformFeeRate: number;  // 판매 수수료 (%)
  settlementFeeRate: number; // 정산 수수료 / PG 수수료 (%)
  shippingCost: number;      // 기본 배송비 (원) — 0이면 판매자 무료배송
  notes: string;
}

export const MARKETS: MarketFee[] = [
  {
    id: "coupang",
    name: "쿠팡",
    platformFeeRate: 10.8,
    settlementFeeRate: 0,
    shippingCost: 0, // 로켓배송 위탁 기준 (배송비 별도 협의)
    notes: "아이템위너 기준 / 카테고리마다 상이",
  },
  {
    id: "smartstore",
    name: "스마트스토어",
    platformFeeRate: 5.6,
    settlementFeeRate: 3.74, // 네이버페이 결제 수수료
    shippingCost: 3000,
    notes: "매출연동수수료 5.6% + 네이버페이 3.74%",
  },
  {
    id: "own",
    name: "자사몰",
    platformFeeRate: 0,
    settlementFeeRate: 3.3, // PG사 평균 (카드 결제 기준)
    shippingCost: 3000,
    notes: "PG 수수료만 발생 / 호스팅비 별도",
  },
  {
    id: "gmarket",
    name: "지마켓/옥션",
    platformFeeRate: 12.0,
    settlementFeeRate: 0,
    shippingCost: 3000,
    notes: "기본 수수료 / 프리미엄 회원 할인 가능",
  },
  {
    id: "11st",
    name: "11번가",
    platformFeeRate: 11.0,
    settlementFeeRate: 0,
    shippingCost: 3000,
    notes: "카테고리에 따라 8~12% 상이",
  },
];

export const DEFAULT_MARKET_ID = "smartstore";

export function getMarket(id: string): MarketFee {
  return MARKETS.find((m) => m.id === id) ?? MARKETS[0];
}
