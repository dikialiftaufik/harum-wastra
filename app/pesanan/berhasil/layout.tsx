import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pesanan Berhasil",
  description:
    "Ringkasan pesanan Harum Wastra: nomor pesanan, rincian biaya, dan langkah berikutnya.",
  alternates: { canonical: "/pesanan/berhasil" },
  robots: { index: false, follow: false },
};

export default function PesananBerhasilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
