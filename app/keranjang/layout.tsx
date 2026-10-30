import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keranjang & Checkout",
  description:
    "Periksa produk pilihan Anda, atur alamat pengiriman, lalu selesaikan pembayaran pesanan Harum Wastra.",
  alternates: { canonical: "/keranjang" },
  robots: { index: false, follow: true },
};

export default function KeranjangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
