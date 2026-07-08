import type { Metadata } from "next";
import { MarginCalculatorJsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";
const PAGE_URL = `${BASE_URL}/margin-calculator`;

export const metadata: Metadata = {
  title: "마진 계산기 — 쿠팡·스마트스토어 수수료 자동 반영",
  description:
    "쿠팡(10.8%), 스마트스토어(5.6%+3.74%) 등 마켓별 수수료를 자동 반영한 무료 마진 계산기. 순이익·마진율·손익분기 판매가를 즉시 계산하세요.",
  keywords: ["마진 계산기", "쿠팡 수수료", "스마트스토어 수수료", "손익분기", "마진율", "온라인 판매 수익"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    url: PAGE_URL,
    title: "마진 계산기 — 쿠팡·스마트스토어 수수료 자동 반영 | 픽셀러",
    description: "마켓별 수수료 자동 반영. 순이익·마진율·손익분기 판매가를 즉시 계산하세요.",
  },
};

export default function MarginCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarginCalculatorJsonLd />
      {children}
    </>
  );
}
