import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description:
    "Buket aromaterapi dan souvenir lilin dari minyak jelantah, dibungkus kertas batik pilihan. Lihat enam motif batik beserta maknanya.",
  alternates: { canonical: "/katalog" },
  openGraph: {
    title: "Katalog Produk Harum Wastra",
    description:
      "Buket aromaterapi dan souvenir lilin dari minyak jelantah dengan kertas batik pilihan.",
    url: "/katalog",
  },
};

export default function KatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
