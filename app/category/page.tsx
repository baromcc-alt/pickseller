import type { Metadata } from "next";
import Link from "next/link";
import { KEYWORD_CATEGORIES } from "@/lib/constants/categories";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";

export const metadata: Metadata = {
  title: "카테고리별 인기 키워드 — 픽셀러",
  description:
    "전자기기, 생활/건강, 패션/뷰티, 스포츠, 캠핑, 반려동물 등 카테고리별 인기 키워드 트렌드를 확인하세요.",
  alternates: { canonical: `${BASE_URL}/category` },
  openGraph: { url: `${BASE_URL}/category` },
};

export default function CategoryIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">카테고리별 키워드</h1>
        <p className="text-gray-500">
          관심 카테고리를 선택하면 인기 키워드 랭킹과 트렌드를 확인할 수 있어요.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {KEYWORD_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
            className="card p-6 hover:border-blue-200 hover:shadow-md transition-all group"
          >
            <div className="text-3xl mb-3">{cat.emoji}</div>
            <h2 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors mb-1">
              {cat.label}
            </h2>
            <p className="text-sm text-gray-400">
              {cat.keywords.length}개 키워드 분석
            </p>
            <div className="mt-4 flex flex-wrap gap-1">
              {cat.keywords.slice(0, 4).map((kw) => (
                <span
                  key={kw}
                  className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                >
                  {kw}
                </span>
              ))}
              <span className="text-xs text-gray-400 px-1 py-0.5">
                +{cat.keywords.length - 4}개
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
