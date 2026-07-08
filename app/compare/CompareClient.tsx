"use client";

import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getKeywordsTrend } from "@/app/actions/keyword-trends";
import type { KeywordTrendData } from "@/types/naver";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];
const MAX_KEYWORDS = 5;

interface SeriesData {
  keyword: string;
  data: KeywordTrendData[];
}

// 여러 키워드 데이터를 차트용 포맷으로 병합
function mergeChartData(series: SeriesData[]) {
  if (series.length === 0) return [];

  // 첫 번째 시리즈의 기간 목록을 기준으로
  const periods = series[0].data.map((d) => d.period);
  return periods.map((period) => {
    const row: Record<string, string | number> = { period };
    for (const s of series) {
      const point = s.data.find((d) => d.period === period);
      row[s.keyword] = point ? point.ratio : 0;
    }
    return row;
  });
}

function formatPeriod(period: string) {
  // "2024-01-01" → "1월"
  const [, month] = period.split("-");
  return `${parseInt(month)}월`;
}

interface CompareClientProps {
  initialKeywords: string[];
}

export default function CompareClient({ initialKeywords }: CompareClientProps) {
  const router = useRouter();
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [input, setInput] = useState("");
  const [series, setSeries] = useState<SeriesData[]>([]);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [hasSearched, setHasSearched] = useState(false);

  const updateUrl = useCallback(
    (kws: string[]) => {
      if (kws.length > 0) {
        router.replace(`/compare?keywords=${encodeURIComponent(kws.join(","))}`, {
          scroll: false,
        });
      } else {
        router.replace("/compare", { scroll: false });
      }
    },
    [router]
  );

  const addKeyword = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (keywords.includes(trimmed)) {
      setError("이미 추가된 키워드입니다.");
      return;
    }
    if (keywords.length >= MAX_KEYWORDS) {
      setError(`최대 ${MAX_KEYWORDS}개까지 추가할 수 있습니다.`);
      return;
    }
    setError("");
    setInput("");
    setKeywords((prev) => [...prev, trimmed]);
  };

  const removeKeyword = (kw: string) => {
    setKeywords((prev) => prev.filter((k) => k !== kw));
    setSeries((prev) => prev.filter((s) => s.keyword !== kw));
  };

  const handleCompare = () => {
    if (keywords.length < 2) {
      setError("키워드를 2개 이상 입력해주세요.");
      return;
    }
    setError("");
    setHasSearched(true);
    updateUrl(keywords);

    startTransition(async () => {
      try {
        const results = await getKeywordsTrend(keywords, 12);
        const newSeries: SeriesData[] = results
          .filter((r) => r.trends.length > 0)
          .map((r) => ({ keyword: r.keyword, data: r.trends }));
        setSeries(newSeries);
      } catch {
        setError("데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    });
  };

  const chartData = mergeChartData(series);

  return (
    <div className="space-y-6">
      {/* 키워드 입력 */}
      <div className="card p-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addKeyword()}
            placeholder="키워드 입력 후 Enter 또는 추가 버튼"
            className="input flex-1"
            disabled={keywords.length >= MAX_KEYWORDS}
          />
          <button
            onClick={addKeyword}
            disabled={!input.trim() || keywords.length >= MAX_KEYWORDS}
            className="btn-secondary px-4 shrink-0"
          >
            추가
          </button>
        </div>

        {/* 키워드 태그 */}
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {keywords.map((kw, idx) => (
              <span
                key={kw}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: COLORS[idx] }}
              >
                {kw}
                <button
                  onClick={() => removeKeyword(kw)}
                  className="hover:opacity-70 transition-opacity"
                  aria-label={`${kw} 삭제`}
                >
                  ×
                </button>
              </span>
            ))}
            <span className="text-xs text-gray-400 self-center">
              {keywords.length}/{MAX_KEYWORDS}
            </span>
          </div>
        )}

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            최대 5개 키워드 · 최근 12개월 데이터
          </p>
          <button
            onClick={handleCompare}
            disabled={keywords.length < 2 || isPending}
            className="btn-primary px-6"
          >
            {isPending ? "분석 중..." : "비교 분석"}
          </button>
        </div>
      </div>

      {/* 차트 */}
      {isPending && (
        <div className="card p-10 flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">키워드 데이터를 불러오는 중...</p>
        </div>
      )}

      {!isPending && hasSearched && series.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">검색량 트렌드 비교</h2>
            <button
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
              }}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              링크 복사
            </button>
          </div>

          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="period"
                tickFormatter={formatPeriod}
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value.toFixed(1)}`,
                  name,
                ]}
                labelFormatter={(label: string) => `기간: ${label}`}
                contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb" }}
              />
              <Legend />
              {series.map((s, idx) => (
                <Line
                  key={s.keyword}
                  type="monotone"
                  dataKey={s.keyword}
                  stroke={COLORS[idx]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>

          <p className="text-xs text-gray-400 text-center mt-3">
            네이버 데이터랩 기준 · 수치는 상대적 검색량 (0~100)
          </p>
        </div>
      )}

      {!isPending && hasSearched && series.length === 0 && (
        <div className="card p-10 text-center text-sm text-gray-400">
          검색 결과가 없습니다. 키워드를 다시 확인해주세요.
        </div>
      )}

      {/* 예시 비교 링크 */}
      {!hasSearched && (
        <div className="card p-5">
          <h3 className="font-semibold text-gray-700 text-sm mb-3">💡 이런 비교는 어떨까요?</h3>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => {
                  setKeywords(ex.keywords);
                  setInput("");
                  setError("");
                }}
                className="text-sm bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const EXAMPLES = [
  { label: "무선이어폰 vs 블루투스이어폰", keywords: ["무선이어폰", "블루투스이어폰"] },
  { label: "캠핑의자 vs 캠핑테이블 vs 텐트", keywords: ["캠핑의자", "캠핑테이블", "텐트"] },
  { label: "요가매트 vs 폼롤러 vs 밴드운동기구", keywords: ["요가매트", "폼롤러", "밴드운동기구"] },
  { label: "강아지간식 vs 고양이간식", keywords: ["강아지간식", "고양이간식"] },
];
