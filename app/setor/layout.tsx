import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setor Jelantah",
  description:
    "Catat setoran minyak jelantah Anda di bank sampah mitra Harum Wastra, lihat poin yang didapat, dan temukan langkah setornya.",
  alternates: { canonical: "/setor" },
  openGraph: {
    title: "Setor Jelantah — Harum Wastra",
    description:
      "Catat setoran minyak jelantah dan lihat estimasi poin yang masuk ke akun Anda.",
    url: "/setor",
  },
};

export default function SetorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
