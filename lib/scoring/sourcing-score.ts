/**
 * 소싱 스코어 계산 로직
 *
 * 총점 100점 = 검색량(40) + 트렌드방향(30) + 경쟁강도(30)
 */

export type TrendDirection = "상승" | "안정" | "하락";
export type CompetitionLevel = "블루오션" | "보통" | "경쟁심함" | "레드오션";

export interface SourcingScore {
  total: number;            // 0~100
  grade: "S" | "A" | "B" | "C" | "D";
  label: string;            // 한국어 등급 설명
  color: string;            // tailwind text color
  bgColor: string;          // tailwind bg color

  // 세부 점수
  trendScore: number;       // 0~40
  directionScore: number;   // 0~30
  competitionScore: number; // 0~30

  // 분석 데이터
  recentAvg: number;        // 최근 4주 평균 검색량 (0~100)
  olderAvg: number;         // 이전 4주 평균 검색량
  direction: TrendDirection;
  momentum: number;         // 변화율 (%)
  productCount: number;     // 네이버 쇼핑 등록 상품 수
  competitionLevel: CompetitionLevel;
  avgPrice: number | null;  // 평균 판매가
}

export function calcSourcingScore(
  trendData: { period: string; ratio: number }[],
  productCount: number,
  avgPrice: number | null,
): SourcingScore {
  // ── 1. 검색량 점수 (0~40) ──────────────────────────────
  const recent4 = trendData.slice(-4);
  const older4  = trendData.slice(-8, -4);

  const recentAvg = recent4.length > 0
    ? recent4.reduce((s, d) => s + d.ratio, 0) / recent4.length
    : 0;
  const olderAvg = older4.length > 0
    ? older4.reduce((s, d) => s + d.ratio, 0) / older4.length
    : recentAvg;

  const trendScore = Math.min(Math.round((recentAvg / 100) * 40), 40);

  // ── 2. 트렌드 방향 점수 (0~30) ────────────────────────
  const momentum = olderAvg > 0
    ? Math.round(((recentAvg - olderAvg) / olderAvg) * 100)
    : 0;

  let direction: TrendDirection;
  let directionScore: number;

  if (momentum >= 10) {
    direction = "상승"; directionScore = 30;
  } else if (momentum >= -5) {
    direction = "안정"; directionScore = 20;
  } else {
    direction = "하락"; directionScore = 8;
  }

  // ── 3. 경쟁 강도 점수 (0~30) ──────────────────────────
  // 상품 수가 적을수록 블루오션 → 높은 점수
  let competitionScore: number;
  let competitionLevel: CompetitionLevel;

  if (productCount < 2_000) {
    competitionScore = 30; competitionLevel = "블루오션";
  } else if (productCount < 10_000) {
    competitionScore = 24; competitionLevel = "보통";
  } else if (productCount < 50_000) {
    competitionScore = 16; competitionLevel = "경쟁심함";
  } else {
    competitionScore = 6;  competitionLevel = "레드오션";
  }

  // ── 4. 총점 & 등급 ────────────────────────────────────
  const total = trendScore + directionScore + competitionScore;

  let grade: SourcingScore["grade"];
  let label: string;
  let color: string;
  let bgColor: string;

  if (total >= 80) {
    grade = "S"; label = "강력 추천"; color = "text-purple-700"; bgColor = "bg-purple-50";
  } else if (total >= 65) {
    grade = "A"; label = "소싱 적합"; color = "text-blue-700";   bgColor = "bg-blue-50";
  } else if (total >= 50) {
    grade = "B"; label = "검토 필요"; color = "text-green-700";  bgColor = "bg-green-50";
  } else if (total >= 35) {
    grade = "C"; label = "주의";      color = "text-yellow-700"; bgColor = "bg-yellow-50";
  } else {
    grade = "D"; label = "비추천";    color = "text-red-700";    bgColor = "bg-red-50";
  }

  return {
    total, grade, label, color, bgColor,
    trendScore, directionScore, competitionScore,
    recentAvg: Math.round(recentAvg * 10) / 10,
    olderAvg: Math.round(olderAvg * 10) / 10,
    direction, momentum, productCount, competitionLevel, avgPrice,
  };
}
