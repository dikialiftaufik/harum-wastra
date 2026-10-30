import type { MetadataRoute } from "next";
import { produk } from "@/lib/data";
import { urlAbsolut } from "@/lib/situs";

const RUTE_STATIS: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/katalog", priority: 0.9, changeFrequency: "monthly" },
  { path: "/agenda", priority: 0.8, changeFrequency: "weekly" },
  { path: "/akun", priority: 0.6, changeFrequency: "monthly" },
  { path: "/setor", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sekarang = new Date();

  return [
    ...RUTE_STATIS.map((r) => ({
      url: urlAbsolut(r.path),
      lastModified: sekarang,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...produk.map((p) => ({
      url: urlAbsolut(`/produk/${p.slug}`),
      lastModified: sekarang,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
