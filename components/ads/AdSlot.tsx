"use client";

import { useEffect, useRef } from "react";

// ────────────────────────────────────────────
// 광고 슬롯 타입 정의
// ────────────────────────────────────────────

export type AdFormat =
  | "leaderboard"    // 728×90  — 데스크톱 상단
  | "mobile-banner"  // 320×50  — 모바일 상단
  | "rectangle"      // 300×250 — 사이드바 / 본문 삽입
  | "large-rectangle" // 336×280 — 본문 삽입 (더 큰 사각형)
  | "responsive";    // 자동 반응형

const AD_SIZES: Record<AdFormat, { width: number; height: number; label: string }> = {
  leaderboard:      { width: 728, height: 90,  label: "728 × 90" },
  "mobile-banner":  { width: 320, height: 50,  label: "320 × 50" },
  rectangle:        { width: 300, height: 250, label: "300 × 250" },
  "large-rectangle":{ width: 336, height: 280, label: "336 × 280" },
  responsive:       { width: 0,   height: 90,  label: "반응형" },
};

interface AdSlotProps {
  format: AdFormat;
  adClient?: string;   // ca-pub-XXXXXXXXXXXXXXXX
  adSlot?: string;     // 광고 슬롯 ID
  className?: string;
  label?: string;      // 광고 영역 라벨 (선택)
}

const IS_ADSENSE_READY =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID !== undefined &&
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID !== "";

// ────────────────────────────────────────────
// 플레이스홀더 (애드센스 승인 전)
// ────────────────────────────────────────────

function AdPlaceholder({ format, label }: { format: AdFormat; label?: string }) {
  const { width, height, label: sizeLabel } = AD_SIZES[format];

  const isResponsive = format === "responsive";

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg text-gray-400 select-none"
      style={
        isResponsive
          ? { width: "100%", minHeight: height }
          : { width, height, maxWidth: "100%" }
      }
    >
      <svg className="w-5 h-5 mb-1 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
      <p className="text-xs font-medium">{label ?? "광고"}</p>
      <p className="text-[10px] opacity-60">{sizeLabel}</p>
    </div>
  );
}

// ────────────────────────────────────────────
// 실제 애드센스 슬롯
// ────────────────────────────────────────────

function AdsenseSlot({ adClient, adSlot, format }: {
  adClient: string;
  adSlot: string;
  format: AdFormat;
}) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  const isResponsive = format === "responsive";
  const { width, height } = AD_SIZES[format];

  return (
    <ins
      ref={insRef}
      className="adsbygoogle"
      style={
        isResponsive
          ? { display: "block" }
          : { display: "inline-block", width, height }
      }
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={isResponsive ? "auto" : undefined}
      data-full-width-responsive={isResponsive ? "true" : undefined}
    />
  );
}

// ────────────────────────────────────────────
// 메인 AdSlot 컴포넌트
// ────────────────────────────────────────────

export default function AdSlot({ format, adClient, adSlot, className = "", label }: AdSlotProps) {
  const clientId = adClient ?? process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isReady = IS_ADSENSE_READY && !!clientId && !!adSlot;

  return (
    <div className={`flex justify-center items-center ${className}`}>
      {isReady ? (
        <AdsenseSlot adClient={clientId!} adSlot={adSlot!} format={format} />
      ) : (
        <AdPlaceholder format={format} label={label} />
      )}
    </div>
  );
}
