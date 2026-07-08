// 애드센스 글로벌 스크립트 — app/layout.tsx의 <head>에 삽입
// NEXT_PUBLIC_ADSENSE_CLIENT_ID가 설정된 경우에만 로드됩니다.

export default function AdScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  if (!clientId) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  );
}
