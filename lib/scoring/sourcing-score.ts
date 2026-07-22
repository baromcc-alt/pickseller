/**
 * 소싱 스코어 계산 로직
 *
 * 총점 50점 = 검색량(30) + 트렌드방향(20)
 * ※ 쇼핑 검색 API 종료(2026.07.31)로 경쟁강도·평균판매가 항목 제거
 */

export type TrendDirection = "상승" | "안정" | "하락";

export interface SourcingScore {
  total: number;            // 0~50
  grade: "S" | "A" | "B" | "C" | "D";
  label: string;
  color: string;
  bgColor: string;

  // 세부 점수
  trendScore: number;       // 0~30
  directionScore: number;   // 0~20

  // 분석 데이터
  recentAvg: number;        // 최근 4주 평균 검색량 (0~100)
  olderAvg: number;         // 이전 4주 평균 검색량
  direction: TrendDirection;
  momentum: number;         // 변화율 (%)
}

export function calcSourcingScore(
  trendData: { period: string; ratio: number }[],
): SourcingScore {
  // ── 1. 검색량 점수 (0~30) ──────────────────────────────
  const recent4 = trendData.slice(-4);
  const older4  = trendData.slice(-8, -4);

  const recentAvg = recent4.length > 0
    ? recent4.reduce((s, d) => s + d.ratio, 0) / recent4.length
    : 0;
  const olderAvg = older4.length > 0
    ? older4.reduce((s, d) => s + d.ratio, 0) / older4.length
    : recentAvg;

  const trendScore = Math.min(Math.round((recentAvg / 100) * 30), 30);

  // ── 2. 트렌드 방향 점수 (0~20) ────────────────────────
  const momentum = olderAvg > 0
    ? Math.round(((recentAvg - olderAvg) / olderAvg) * 100)
    : 0;

  let direction: TrendDirection;
  let directionScore: number;

  if (momentum >= 10) {
    direction = "상승"; directionScore = 20;
  } else if (momentum >= -5) {
    direction = "안정"; directionScore = 13;
  } else {
    direction = "하락"; directionScore = 5;
  }

  // ── 3. 총점 & 등급 ────────────────────────────────────
  const total = trendScore + directionScore;

  let grade: SourcingScore["grade"];
  let label: string;
  let color: string;
  let bgColor: string;

  if (total >= 40) {
    grade = "S"; label = "강력 추천"; color = "text-purple-700"; bgColor = "bg-purple-50";
  } else if (total >= 32) {
    grade = "A"; label = "소싱 적합"; color = "text-blue-700";   bgColor = "bg-blue-50";
  } else if (total >= 23) {
    grade = "B"; label = "검토 필요"; color = "text-green-700";  bgColor = "bg-green-50";
  } else if (total >= 13) {
    grade = "C"; label = "주의";      color = "text-yellow-700"; bgColor = "bg-yellow-50";
  } else {
    grade = "D"; label = "비추천";    color = "text-red-700";    bgColor = "bg-red-50";
  }

  return {
    total, grade, label, color, bgColor,
    trendScore, directionScore,
    recentAvg: Math.round(recentAvg * 10) / 10,
    olderAvg: Math.round(olderAvg * 10) / 10,
    direction, momentum,
  };
}
