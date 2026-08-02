import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pickseller.co.kr";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/my", "/api/", "/auth/", "/login", "/margin-calculator?"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
