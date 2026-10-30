import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eco Points",
  description:
    "Pantau saldo Eco Points, pindai QR setoran jelantah, lihat riwayat setoran, dan tukarkan poin dengan voucher Harum Wastra.",
  alternates: { canonical: "/akun" },
  openGraph: {
    title: "Eco Points Harum Wastra",
    description:
      "Pantau saldo poin, catat setoran jelantah, dan tukarkan poin dengan voucher.",
    url: "/akun",
  },
};

export default function AkunLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
