/**
 * 소싱 스코어 계산 로직
 *
 * 총점 100점 = 검색량(40) + 경쟁강도(30) + 트렌드방향(30)
 *
 * 검색량·경쟁강도: 네이버 검색광고 API (실제 월 검색수)
 * 트렌드방향:      네이버 DataLab API  (0~100 상대 지수, 없으면 중간값)
 */

export type TrendDirection = "상승" | "안정" | "하락";
export type CompLevel = "낮음" | "보통" | "높음";

export interface SourcingScore {
  total: number;            // 0~100
  grade: "S" | "A" | "B" | "C" | "D";
  label: string;
  color: string;
  bgColor: string;

  // 세부 점수
  volumeScore: number;      // 0~40  (검색량)
  compScore: number;        // 0~30  (경쟁강도)
  trendScore: number;       // 0~30  (트렌드 방향)

  // 원본 데이터
  monthlyTotal: number;     // 월 총 검색수 (PC+모바일)
  monthlyPc: number;
  monthlyMobile: number;
  compIdx: CompLevel;
  recentAvg: number;        // DataLab 최근 4주 평균 (0~100)
  olderAvg: number;
  direction: TrendDirection;
  momentum: number;         // 변화율 (%)
}

// ── 검색량 점수 (0~40) ────────────────────────────────
function calcVolumeScore(monthlyTotal: number): number {
  if (monthlyTotal >= 200000) return 40;
  if (monthlyTotal >= 100000) return 34;
  if (monthlyTotal >= 50000)  return 28;
  if (monthlyTotal >= 20000)  return 21;
  if (monthlyTotal >= 10000)  return 15;
  if (monthlyTotal >= 3000)   return 9;
  if (monthlyTotal >= 1000)   return 5;
  return 2;
}

// ── 경쟁강도 점수 (0~30) ─────────────────────────────
function calcCompScore(compIdx: CompLevel): number {
  if (compIdx === "낮음") return 30;
  if (compIdx === "보통") return 18;
  return 6; // 높음
}

// ── 트렌드 점수 (0~30) ───────────────────────────────
function calcTrendScore(momentum: number): { score: number; direction: TrendDirection } {
  if (momentum >= 10)  return { score: 30, direction: "상승" };
  if (momentum >= -5)  return { score: 20, direction: "안정" };
  return { score: 8, direction: "하락" };
}

// ── 등급 ─────────────────────────────────────────────
function calcGrade(total: number): Pick<SourcingScore, "grade" | "label" | "color" | "bgColor"> {
  if (total >= 80) return { grade: "S", label: "강력 추천",  color: "text-purple-700", bgColor: "bg-purple-50" };
  if (total >= 65) return { grade: "A", label: "소싱 적합",  color: "text-blue-700",   bgColor: "bg-blue-50"   };
  if (total >= 48) return { grade: "B", label: "검토 필요",  color: "text-green-700",  bgColor: "bg-green-50"  };
  if (total >= 30) return { grade: "C", label: "주의",       color: "text-yellow-700", bgColor: "bg-yellow-50" };
  return                  { grade: "D", label: "비추천",      color: "text-red-700",    bgColor: "bg-red-50"    };
}

// ── 메인 계산 함수 ────────────────────────────────────
export function calcSourcingScore(params: {
  monthlyPc: number;
  monthlyMobile: number;
  compIdx: CompLevel;
  trendData?: { period: string; ratio: number }[];
}): SourcingScore {
  const { monthlyPc, monthlyMobile, compIdx, trendData = [] } = params;
  const monthlyTotal = monthlyPc + monthlyMobile;

  const volumeScore = calcVolumeScore(monthlyTotal);
  const compScore   = calcCompScore(compIdx);

  // DataLab 데이터가 없으면 "안정" 중간값(20점) 사용
  let trendScore = 20;
  let direction: TrendDirection = "안정";
  let momentum = 0;
  let recentAvg = 0;
  let olderAvg  = 0;

  if (trendData.length >= 4) {
    const recent4 = trendData.slice(-4);
    const older4  = trendData.slice(-8, -4);

    recentAvg = recent4.reduce((s, d) => s + d.ratio, 0) / recent4.length;
    olderAvg  = older4.length > 0
      ? older4.reduce((s, d) => s + d.ratio, 0) / older4.length
      : recentAvg;

    momentum = olderAvg > 0
      ? Math.round(((recentAvg - olderAvg) / olderAvg) * 100)
      : 0;

    const t = calcTrendScore(momentum);
    trendScore = t.score;
    direction  = t.direction;
  }

  const total = volumeScore + compScore + trendScore;

  return {
    total,
    ...calcGrade(total),
    volumeScore,
    compScore,
    trendScore,
    monthlyTotal,
    monthlyPc,
    monthlyMobile,
    compIdx,
    recentAvg:  Math.round(recentAvg * 10) / 10,
    olderAvg:   Math.round(olderAvg  * 10) / 10,
    direction,
    momentum,
  };
}
