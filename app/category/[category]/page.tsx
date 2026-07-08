import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/ads/AdSlot";
import { KEYWORD_CATEGORIES, getCategoryById } from "@/lib/constants/categories";
import { getCategoryRanking } from "@/app/actions/trending-keywords";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";

// SSG — 빌드 시 모든 카테고리 사전 생성
export function generateStaticParams() {
  return KEYWORD_CATEGORIES.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const cat = getCategoryById(params.category);
  if (!cat) return {};

  const title = `${cat.emoji} ${cat.label} 인기 키워드 랭킹 — 픽셀러`;
  const description = `${cat.label} 카테고리 실시간 인기 키워드 TOP 10. 네이버 검색량 데이터 기반 ${cat.keywords.slice(0, 3).join(", ")} 등 트렌드 분석.`;
  const url = `${BASE_URL}/category/${params.category}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}

const TREND_CONFIG = {
  up:     { icon: "▲", color: "text-red-500",   label: "상승" },
  down:   { icon: "▼", color: "text-blue-500",  label: "하락" },
  stable: { icon: "—", color: "text-gray-400",  label: "유지" },
  new:    { icon: "N", color: "text-green-500", label: "신규" },
};

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = getCategoryById(params.category);
  if (!cat) notFound();

  const ranking = await getCategoryRanking(cat.id).catch(() => null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">홈</Link>
        <span>/</span>
        <Link href="/category" className="hover:text-gray-600">카테고리</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{cat.label}</span>
      </nav>

      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{cat.emoji}</span>
          <h1 className="text-3xl font-bold text-gray-900">{cat.label}</h1>
        </div>
        <p className="text-gray-500">
          네이버 데이터랩 기반 인기 키워드 TOP 10 · 매일 업데이트
        </p>
      </div>

      {/* 상단 광고 */}
      <div className="mb-8 flex justify-center">
        <div className="hidden sm:block">
          <AdSlot format="leaderboard" label="광고" />
        </div>
        <div className="sm:hidden">
          <AdSlot format="mobile-banner" label="광고" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 랭킹 리스트 */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">🔥 인기 키워드 TOP 10</h2>
              <span className="text-xs text-gray-400">
                {new Date().toLocaleDateString("ko-KR", { month: "long", day: "numeric" })} 기준
              </span>
            </div>

            <div className="divide-y divide-gray-50">
              {!ranking || ranking.keywords.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-gray-400">
                  데이터를 불러오는 중입니다. 잠시 후 새로고침 해주세요.
                </div>
              ) : (
                ranking.keywords.map((item) => {
                  const trend = TREND_CONFIG[item.trend];
                  return (
                    <Link
                      key={item.keyword}
                      href={`/keyword/${encodeURIComponent(item.keyword)}`}
                      className="flex items-center gap-3 px-5 py-4 hover:bg-blue-50/50 transition-colors group"
                    >
                      {/* 순위 */}
                      <span
                        className={`w-7 text-center font-bold text-base shrink-0 ${
                          item.rank <= 3 ? "text-blue-600" : "text-gray-300"
                        }`}
                      >
                        {item.rank}
                      </span>

                      {/* 키워드 */}
                      <span className="flex-1 font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        {item.keyword}
                      </span>

                      {/* 트렌드 */}
                      <span className={`text-sm font-bold ${trend.color} w-5 text-center shrink-0`}>
                        {trend.icon}
                      </span>

                      {/* 점수 바 */}
                      <div className="flex items-center gap-2 shrink-0 w-32">
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400 w-8 text-right">{item.score}</span>
                      </div>

                      {/* 분석 버튼 */}
                      <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        분석 →
                      </span>
                    </Link>
                  );
                })
              )}
            </div>

            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 text-center">
              네이버 데이터랩 기준
              {ranking?.fromCache === false && (
                <span className="ml-2 text-blue-400">· 방금 갱신됨</span>
              )}
            </div>
          </div>
        </div>

        {/* 사이드 — 키워드 전체 목록 + 광고 */}
        <div className="flex flex-col gap-4">
          {/* 전체 키워드 목록 */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              {cat.label} 전체 키워드
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.keywords.map((kw) => (
                <Link
                  key={kw}
                  href={`/keyword/${encodeURIComponent(kw)}`}
                  className="text-sm bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-600 px-3 py-1 rounded-full border border-gray-200 hover:border-blue-200 transition-colors"
                >
                  {kw}
                </Link>
              ))}
            </div>
          </div>

          {/* 다른 카테고리 */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">다른 카테고리</h3>
            <div className="flex flex-col gap-1">
              {KEYWORD_CATEGORIES.filter((c) => c.id !== cat.id).map((c) => (
                <Link
                  key={c.id}
                  href={`/category/${c.id}`}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span>{c.emoji}</span>
                  <span>{c.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <AdSlot format="rectangle" label="광고" />
        </div>
      </div>
    </div>
  );
}
