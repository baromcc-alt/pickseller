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
