"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { KeywordTrendData } from "@/types/naver";

interface TrendChartProps {
  data: KeywordTrendData[];
  keyword: string;
}

function formatPeriod(period: string) {
  // YYYY-MM-DD → MM/DD
  const parts = period.split("-");
  if (parts.length === 3) return `${parts[1]}/${parts[2]}`;
  return period;
}

export default function TrendChart({ data, keyword }: TrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        트렌드 데이터가 없습니다.
      </div>
    );
  }

  const chartData = data.map((d) => ({
    period: formatPeriod(d.period),
    ratio: Math.round(d.ratio * 10) / 10,
  }));

  const maxRatio = Math.max(...chartData.map((d) => d.ratio));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          상대 검색량 지수 (최고점 = 100)
        </p>
        <span className="text-xs text-gray-400">
          최고 <span className="font-semibold text-blue-600">{maxRatio}</span>
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              fontSize: "12px",
            }}
            formatter={(value: number) => [`${value}`, "검색량 지수"]}
            labelFormatter={(label) => `기간: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="ratio"
            name={keyword}
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#3b82f6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
