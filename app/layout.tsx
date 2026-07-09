import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdScript from "@/components/ads/AdScript";
import { WebSiteJsonLd } from "@/components/JsonLd";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    google: "ai0Y4A9R8eBlDp-7lQDqjjG-bDeov4hyYegJZ91IZgI",
  },
  title: {
    default: "픽셀러 — 무료 셀러 키워드 분석 & 마진 계산기",
    template: "%s | 픽셀러",
  },
  description:
    "쿠팡·스마트스토어 셀러를 위한 무료 키워드 분석 도구. 네이버 검색량 트렌드, 마켓별 마진 계산, 손익분기 분석까지 완전 무료로 제공합니다.",
  keywords: [
    "키워드 분석", "마진 계산기", "스마트스토어", "쿠팡", "아이템 소싱",
    "셀러 도구", "검색량 트렌드", "손익분기", "네이버 쇼핑", "온라인 판매",
  ],
  authors: [{ name: "픽셀러" }],
  creator: "픽셀러",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: "픽셀러",
    title: "픽셀러 — 무료 셀러 키워드 분석 & 마진 계산기",
    description:
      "쿠팡·스마트스토어 셀러를 위한 무료 키워드 분석 & 마진 계산기. 완전 무료.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "픽셀러 — 셀러를 위한 무료 데이터 분석 도구",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "픽셀러 — 무료 셀러 키워드 분석 & 마진 계산기",
    description: "쿠팡·스마트스토어 셀러를 위한 무료 키워드 분석 & 마진 계산기.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <AdScript />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar user={user ? { email: user.email } : null} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
