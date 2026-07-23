"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function KeywordSearchForm() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      router.push(`/keyword/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="키워드를 입력하세요 (예: 무선이어폰)"
        className="input flex-1"
      />
      <button type="submit" className="btn-primary px-5 shrink-0">
        분석
      </button>
    </form>
  );
}

/** 키워드 상세 페이지용 compact 인라인 검색바 */
export function InlineKeywordSearch({ currentKeyword }: { currentKeyword: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      setValue("");
      router.push(`/keyword/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
      <div className="relative flex-1 sm:w-64">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`"${currentKeyword}" 말고 다른 키워드…`}
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-gray-300"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        분석
      </button>
    </form>
  );
}
