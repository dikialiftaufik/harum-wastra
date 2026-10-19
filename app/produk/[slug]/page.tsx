import { notFound } from "next/navigation";
import { produk } from "@/lib/data";
import { ProdukDetail } from "@/components/ProdukDetail";

// Halaman produk bergantung pada slug, jadi rute ini sengaja diblokir menunggu params.
export const instant = false;

export function generateStaticParams() {
  return produk.map((p) => ({ slug: p.slug }));
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
