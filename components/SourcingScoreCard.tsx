"use client";

import { useState } from "react";
import type { SourcingScore } from "@/lib/scoring/sourcing-score";

interface Props {
  keyword: string;
  score: SourcingScore | null;
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
    } catch {
      setAnalysis("분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // ── score null: 데이터 없음 카드 ──────────────────────
  if (!score) {
    return (
      <div className="card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <h2 className="font-bold text-gray-900">소싱 스코어</h2>
        </div>
        <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 flex items-center gap-3">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
          </svg>
          <p className="text-sm text-gray-500">
            검색량 데이터를 불러오지 못했습니다.
            <br />
            <span className="text-xs text-gray-400">AI 분석은 키워드 특성을 바탕으로 진행됩니다.</span>
          </p>
        </div>
        <div className="border-t border-gray-100 pt-4">
          {!analysis && !loading && <AiButton onClick={handleAiAnalysis} />}
          {(loading || analysis) && (
            <AiAnalysisBox loading={loading} analysis={analysis} done={done}
              onReset={() => { setAnalysis(""); setDone(false); }} />
          )}
        </div>
      </div>
    );
  }

  // ── 정상 카드 ─────────────────────────────────────────
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
        <div className="relative shrink-0">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="12" />
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
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold" style={{ color: gaugeColor }}>{score.total}</span>
            <span className="text-xs text-gray-400 -mt-0.5">/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold mb-3 ${score.bgColor} ${score.color}`}>
            <span>{score.grade}등급</span>
            <span>·</span>
            <span>{score.label}</span>
          </div>
          <div className="space-y-2">
            <ScoreBar label="검색량" value={score.volumeScore} max={40} color={gaugeColor} />
            <ScoreBar label="경쟁강도" value={score.compScore} max={30} color={gaugeColor} />
            <ScoreBar label="트렌드" value={score.trendScore} max={30} color={gaugeColor} />
          </div>
        </div>
      </div>

      {/* 데이터 요약 */}
      <div className="grid grid-cols-2 gap-3">
        <DataChip
          label="월 검색량"
          value={formatCount(score.monthlyTotal)}
          sub={`PC ${formatCount(score.monthlyPc)} · 모바일 ${formatCount(score.monthlyMobile)}`}
          icon="🔍"
        />
        <DataChip
          label="경쟁강도"
          value={score.compIdx}
          sub={compSubText(score.compIdx)}
          icon={score.compIdx === "낮음" ? "🟢" : score.compIdx === "보통" ? "🟡" : "🔴"}
        />
        <DataChip
          label="트렌드"
          value={score.direction}
          sub={score.momentum !== 0 ? `${score.momentum > 0 ? "+" : ""}${score.momentum}%` : "변화 없음"}
          icon={score.direction === "상승" ? "▲" : score.direction === "하락" ? "▼" : "—"}
          iconColor={score.direction === "상승" ? "text-red-500" : score.direction === "하락" ? "text-blue-500" : "text-gray-400"}
        />
        <DataChip
          label="DataLab 지수"
          value={score.recentAvg > 0 ? `${score.recentAvg}` : "—"}
          sub="최근 4주 평균 (0~100)"
          icon="📊"
        />
      </div>

      {/* AI 분석 */}
      <div className="border-t border-gray-100 pt-4">
        {!analysis && !loading && <AiButton onClick={handleAiAnalysis} />}
        {(loading || analysis) && (
          <AiAnalysisBox loading={loading} analysis={analysis} done={done}
            onReset={() => { setAnalysis(""); setDone(false); }} />
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

// ── 유틸 ──────────────────────────────────────────────

function formatCount(n: number): string {
  if (n === 0) return "—";
  if (n >= 10000) return `${(n / 10000).toFixed(1)}만`;
  return n.toLocaleString("ko-KR");
}

function compSubText(compIdx: string): string {
  if (compIdx === "낮음") return "진입 유리";
  if (compIdx === "보통") return "보통 수준";
  return "경쟁 치열";
}

// ── 서브 컴포넌트 ─────────────────────────────────────

function AiButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
      AI 소싱 분석 요청
    </button>
  );
}

function AiAnalysisBox({ loading, analysis, done, onReset }: {
  loading: boolean; analysis: string; done: boolean; onReset: () => void;
}) {
  return (
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
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400"
                style={{ animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
        {analysis}
        {loading && <span className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 animate-pulse align-middle" />}
      </p>
      {done && (
        <button onClick={onReset} className="mt-3 text-xs text-purple-500 hover:text-purple-700 transition-colors">
          다시 분석하기
        </button>
      )}
    </div>
  );
}

function ScoreBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-400 w-14 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }} />
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
