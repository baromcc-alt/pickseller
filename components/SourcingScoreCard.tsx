"use client";

import { useState } from "react";
import type { SourcingScore } from "@/lib/scoring/sourcing-score";

interface Props {
  keyword: string;
  score: SourcingScore;
}

export default function SourcingScoreCard({ keyword, score }: Props) {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleAiAnalysis = async () => {
    if (loading || done) return;
    setLoading(true);
    setAnalysis("");

    try {
      const res = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, score }),
      });

      if (!res.ok || !res.body) throw new Error("API 오류");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done: doneReading, value } = await reader.read();
        if (doneReading) break;
        text += decoder.decode(value, { stream: true });
        setAnalysis(text);
      }

      setDone(true);
    } catch (e) {
      setAnalysis("분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 원형 게이지용 SVG 계산
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score.total / 100) * circumference;

  const gaugeColor =
    score.grade === "S" ? "#7c3aed" :
    score.grade === "A" ? "#2563eb" :
    score.grade === "B" ? "#16a34a" :
    score.grade === "C" ? "#d97706" : "#dc2626";

  return (
    <div className="card p-6 space-y-5">
      {/* 헤더 */}
      <div className="flex items-center gap-2">
        <span className="text-lg">🎯</span>
        <h2 className="font-bold text-gray-900">소싱 스코어</h2>
      </div>

      {/* 게이지 + 등급 */}
      <div className="flex items-center gap-6">
        {/* 원형 게이지 */}
        <div className="relative shrink-0">
          <svg width="128" height="128" viewBox="0 0 128 128">
            {/* 배경 원 */}
            <circle cx="64" cy="64" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="12" />
            {/* 점수 원 */}
            <circle
              cx="64" cy="64" r={radius}
              fill="none"
              stroke={gaugeColor}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 64 64)"
              style={{ transition: "stroke-dashoffset 0.8s ease" }}
            />
          </svg>
          {/* 중앙 텍스트 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold" style={{ color: gaugeColor }}>{score.total}</span>
            <span className="text-xs text-gray-400 -mt-0.5">/ 100</span>
          </div>
        </div>

        {/* 등급 + 세부 점수 */}
        <div className="flex-1">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold mb-3 ${score.bgColor} ${score.color}`}>
            <span>{score.grade}등급</span>
            <span>·</span>
            <span>{score.label}</span>
          </div>

          <div className="space-y-2">
            <ScoreBar label="검색량" value={score.trendScore} max={40} color={gaugeColor} />
            <ScoreBar label="트렌드" value={score.directionScore} max={30} color={gaugeColor} />
            <ScoreBar label="경쟁강도" value={score.competitionScore} max={30} color={gaugeColor} />
          </div>
        </div>
      </div>

      {/* 데이터 요약 */}
      <div className="grid grid-cols-2 gap-3">
        <DataChip
          label="트렌드"
          value={score.direction}
          sub={`${score.momentum > 0 ? "+" : ""}${score.momentum}%`}
          icon={score.direction === "상승" ? "▲" : score.direction === "하락" ? "▼" : "—"}
          iconColor={score.direction === "상승" ? "text-red-500" : score.direction === "하락" ? "text-blue-500" : "text-gray-400"}
        />
        <DataChip
          label="경쟁 강도"
          value={score.competitionLevel}
          sub={`상품 ${score.productCount.toLocaleString()}개`}
          icon="📦"
        />
        <DataChip
          label="검색량 지수"
          value={`${score.recentAvg} / 100`}
          sub="최근 4주 평균"
          icon="🔍"
        />
        {score.avgPrice && (
          <DataChip
            label="평균 판매가"
            value={`${score.avgPrice.toLocaleString()}원`}
            sub="네이버 쇼핑 기준"
            icon="💰"
          />
        )}
      </div>

      {/* AI 분석 */}
      <div className="border-t border-gray-100 pt-4">
        {!analysis && !loading && (
          <button
            onClick={handleAiAnalysis}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
            AI 소싱 분석 요청
          </button>
        )}

        {(loading || analysis) && (
          <div className="rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-purple-700">AI 소싱 분석</span>
              {loading && (
                <span className="flex gap-0.5 ml-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-purple-400"
                      style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }}
                    />
                  ))}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {analysis}
              {loading && <span className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 animate-pulse align-middle" />}
            </p>
            {done && (
              <button
                onClick={() => { setAnalysis(""); setDone(false); }}
                className="mt-3 text-xs text-purple-500 hover:text-purple-700 transition-colors"
              >
                다시 분석하기
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ScoreBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-400 w-14 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-gray-500 w-10 text-right">{value}/{max}</span>
    </div>
  );
}

function DataChip({ label, value, sub, icon, iconColor }: {
  label: string; value: string; sub: string; icon: string; iconColor?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <div className="flex items-center gap-1">
        <span className={`text-sm ${iconColor ?? ""}`}>{icon}</span>
        <span className="text-sm font-semibold text-gray-800">{value}</span>
      </div>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}
