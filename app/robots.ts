import type { MetadataRoute } from "next";
import { SITUS } from "@/lib/situs";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Halaman transaksi peramban tidak perlu diindeks.
      disallow: ["/keranjang", "/pesanan/"],
    },
    sitemap: `${SITUS.url}/sitemap.xml`,
    host: SITUS.url,
  };
}
