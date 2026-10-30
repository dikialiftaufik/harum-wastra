import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { produk } from "@/lib/data";
import { ProdukDetail } from "@/components/ProdukDetail";

// Halaman produk bergantung pada slug, jadi rute ini sengaja diblokir menunggu params.
export const instant = false;

export function generateStaticParams() {
  return produk.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = produk.find((x) => x.slug === slug);
  if (!p) return { title: "Produk tidak ditemukan" };

  return {
    title: `${p.nama} — ${p.satuan}`,
    description: p.deskripsiKatalog,
    alternates: { canonical: `/produk/${p.slug}` },
    openGraph: {
      title: `${p.nama} — Harum Wastra`,
      description: p.deskripsiKatalog,
      url: `/produk/${p.slug}`,
      images: [{ url: p.gambar, width: 1448, height: 1086, alt: p.nama }],
    },
  };
}

export default async function HalamanProduk({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = produk.find((x) => x.slug === slug);
  if (!p) notFound();
  return <ProdukDetail produk={p} />;
}
