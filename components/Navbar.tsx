"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface NavbarProps {
  user: { email?: string } | null;
}

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/category", label: "카테고리" },
  { href: "/compare", label: "키워드비교" },
  { href: "/margin-calculator", label: "마진계산기" },
  { href: "/guides", label: "가이드" },
];

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
    setLoggingOut(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0"  y="0"  width="10" height="10" rx="2.5" fill="#2563EB"/>
              <rect x="13" y="0"  width="10" height="10" rx="2.5" fill="#2563EB"/>
              <rect x="26" y="0"  width="10" height="10" rx="2.5" fill="#93C5FD"/>
              <rect x="0"  y="13" width="10" height="10" rx="2.5" fill="#2563EB"/>
              <rect x="13" y="13" width="10" height="10" rx="2.5" fill="#93C5FD"/>
              <rect x="26" y="13" width="10" height="10" rx="2.5" fill="#DBEAFE"/>
              <rect x="0"  y="26" width="10" height="10" rx="2.5" fill="#93C5FD"/>
              <rect x="13" y="26" width="10" height="10" rx="2.5" fill="#DBEAFE"/>
              <rect x="26" y="26" width="10" height="10" rx="2.5" fill="#EFF6FF"/>
            </svg>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-gray-900 tracking-tight">픽셀러</span>
              <span className="text-[10px] font-medium text-blue-400 tracking-widest">PIXELLER</span>
            </div>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 우측 유저 영역 */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/my"
                  className="text-sm text-gray-500 truncate max-w-[180px] hover:text-gray-800 transition-colors"
                >
                  {user.email}
                </Link>
                <Link href="/my" className="btn-secondary text-sm">
                  마이페이지
                </Link>
              </>
            ) : (
              <Link href="/login" className="btn-primary text-sm">
                로그인
              </Link>
            )}
          </div>

          {/* 모바일 햄버거 */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              {user ? (
                <>
                  <p className="px-4 py-1 text-xs text-gray-400">{user.email}</p>
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
