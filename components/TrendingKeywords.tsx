"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { KEYWORD_CATEGORIES } from "@/lib/constants/categories";
import { getCategoryRanking, refreshCategoryRanking } from "@/app/actions/trending-keywords";
import type { CategoryRanking, RankedKeyword } from "@/app/actions/trending-keywords";

interface TrendingKeywordsProps {
  initialRanking: CategoryRanking | null;
}

const TREND_CONFIG = {
  up:     { icon: "▲", color: "text-red-500",   label: "상승" },
  down:   { icon: "▼", color: "text-blue-500",  label: "하락" },
  stable: { icon: "—", color: "text-gray-400",  label: "유지" },
  new:    { icon: "N", color: "text-green-500", label: "신규" },
};

export default function TrendingKeywords({ initialRanking }: TrendingKeywordsProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(
    KEYWORD_CATEGORIES[0].id
  );
  const [rankings, setRankings] = useState<Record<string, CategoryRanking>>(() =>
    initialRanking ? { [initialRanking.category.id]: initialRanking } : {}
  );
  const [isPending, startTransition] = useTransition();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    if (rankings[categoryId]) return; // 이미 로드됨

    startTransition(async () => {
      const result = await getCategoryRanking(categoryId);
      if (result) {
        setRankings((prev) => ({ ...prev, [categoryId]: result }));
      }
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshError(null);
    startTransition(async () => {
      try {
        const result = await refreshCategoryRanking(activeCategoryId);
        if (result && result.keywords.length > 0) {
          setRankings((prev) => ({ ...prev, [activeCategoryId]: result }));
        } else {
          setRefreshError("네이버 API 호출에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
      } catch (e) {
        setRefreshError("갱신 중 오류가 발생했습니다.");
        console.error(e);
      } finally {
        setIsRefreshing(false);
      }
    });
  };

  const current = rankings[activeCategoryId];

  return (
    <div className="card overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <h2 className="font-bold text-gray-900">오늘의 인기 키워드</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {new Date().toLocaleDateString("ko-KR", { month: "long", day: "numeric" })} 기준
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isPending}
            className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 disabled:text-gray-300 transition-colors"
            title="최신 데이터로 갱신"
          >
            <svg
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isRefreshing ? "갱신 중..." : "갱신"}
          </button>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
        {KEYWORD_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
              activeCategoryId === cat.id
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 에러 메시지 */}
      {refreshError && (
        <div className="px-5 py-2 bg-red-50 text-xs text-red-500 text-center">
          {refreshError}
        </div>
      )}

      {/* 랭킹 리스트 */}
      <div className="divide-y divide-gray-50">
        {isPending || !current ? (
          // 로딩 스켈레톤
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 animate-pulse">
              <div className="w-5 h-4 bg-gray-200 rounded" />
              <div className="flex-1 h-4 bg-gray-200 rounded" />
              <div className="w-10 h-4 bg-gray-200 rounded" />
            </div>
          ))
        ) : current.keywords.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-gray-400">
            데이터를 불러오는 중입니다. 잠시 후 다시 시도해주세요.
          </div>
        ) : (
          current.keywords.map((item) => (
            <KeywordRow key={item.keyword} item={item} />
          ))
        )}
      </div>

      {/* 푸터 */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          네이버 데이터랩 기준 · 매일 업데이트
          {current?.fromCache === false && (
            <span className="ml-2 text-blue-400">· 방금 갱신됨</span>
          )}
        </p>
      </div>
    </div>
  );
}

function KeywordRow({ item }: { item: RankedKeyword }) {
  const trend = TREND_CONFIG[item.trend];

  return (
    <Link
      href={`/keyword/${encodeURIComponent(item.keyword)}`}
      className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50/50 transition-colors group"
    >
      {/* 순위 */}
      <span
        className={`w-6 text-center text-sm font-bold shrink-0 ${
          item.rank <= 3 ? "text-blue-600" : "text-gray-400"
        }`}
      >
        {item.rank}
      </span>

      {/* 키워드 */}
      <span className="flex-1 text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
        {item.keyword}
      </span>

      {/* 트렌드 */}
      <span className={`text-xs font-bold ${trend.color} w-4 text-center shrink-0`}>
        {trend.icon}
      </span>

      {/* 점수 */}
      <div className="flex items-center gap-1 shrink-0">
        <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: `${item.score}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 w-7 text-right">{item.score}</span>
      </div>
    </Link>
  );
}
