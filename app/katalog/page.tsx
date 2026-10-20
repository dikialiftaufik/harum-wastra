"use client";

import Link from "next/link";
import Image from "next/image";
import { formatRupiah, produk, motif } from "@/lib/data";
import { useState, useEffect } from "react";

export default function Katalog() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-cream" style={{ backgroundImage: "url(/backgrounds/bg-beranda-hero-section.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-16">
          <div className="max-w-2xl animate-pulse space-y-4">
            <div className="h-4 bg-ink/10 rounded w-1/4" />
            <div className="h-8 bg-ink/10 rounded w-3/4" />
            <div className="h-4 bg-ink/10 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ─── Hero Section Katalog ─── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden" style={{ backgroundImage: "url(/backgrounds/bg-beranda-hero-section.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/90 to-cream/60" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(/motif/sekar-jagad.png)", backgroundSize: "120px", backgroundRepeat: "repeat" }} aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-16 z-10">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-maroon">
              Katalog Produk
            </p>
            <h1 className="mt-4 text-4xl leading-[1.15] text-maroon sm:text-5xl lg:text-[3.5rem] font-display">
              Pilih hadiah yang
              <span className="not-italic" style={{ fontStyle: "italic" }}> bernilai</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/70 max-w-xl">
              Setiap produk dibungkus kertas batik yang Anda pilih sendiri dari enam motif,
              lengkap dengan asal dan maknanya. Lilin aromaterapinya terbuat dari minyak jelantah
              yang Anda setorkan — hadiah yang ceritanya kembali ke Anda.
            </p>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, transparent 0%, var(--color-cream) 100%)"
          }} />
        </div>
      </section>

      {/* ─── Product Grid Section ─── */}
      <section className="relative py-20 md:py-28 bg-cream" style={{ backgroundImage: "url(/backgrounds/bg-tukar-poin.png)", backgroundSize: "cover", backgroundPosition: "top center" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(/motif/kawung.png)", backgroundSize: "100px", backgroundRepeat: "repeat" }} aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 z-10">
          {/* Section header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-maroon">
              Koleksi Kami
            </p>
            <h2 className="mt-3 text-3xl text-maroon sm:text-4xl font-display">
              Dua produk, enam motif batik
            </h2>
            <p className="mt-4 text-ink/60">
              Pilih produk, lalu tentukan motif batik yang akan membungkusnya.
            </p>
          </div>

          {/* Product cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {produk.map((p, index) => (
              <ProductCard key={p.slug} product={p} index={index} />
            ))}
          </div>

          {/* Motif preview strip */}
          <div className="mt-20">
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-maroon whitespace-nowrap">
                Motif tersedia
              </p>
              <div className="h-px w-24 bg-maroon/20" aria-hidden="true" />
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4" role="list" aria-label="Motif batik yang tersedia">
              {motif.map((m) => (
                <MotifChip key={m.id} motif={m} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="relative py-20 md:py-28 bg-maroon text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(/motif/truntum.png)", backgroundSize: "80px", backgroundRepeat: "repeat" }} aria-hidden="true" />

        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8 z-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">
            Siap memilih?
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display">
            Temukan motif yang paling mewakili pesan Anda
          </h2>
          <p className="mt-5 text-cream/75">
            Setiap motif memiliki cerita. Pilih yang cocok untuk momen dan orang yang Anda hargai.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/produk/buket"
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream px-8 py-3.5 text-sm font-medium text-cream transition-all duration-300 hover:bg-cream hover:text-maroon"
            >
              Mulai dari Buket Aromaterapi
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
            <Link
              href="/produk/souvenir"
              className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-8 py-3.5 text-sm font-medium text-cream transition-all duration-300 hover:bg-cream/20"
            >
              Lihat Souvenir Bloom
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Product Card Component ─── */
function ProductCard({ product, index }: { product: typeof produk[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  // Determine which graphics to use for each product
  const productGraphics = {
    buket: {
      main: "/graphics/product.png",
      desc: "/graphics/product-deskripsi.png",
      detail1: "/graphics/product-details-1.png",
      detail2: "/graphics/product-details-2.png",
      detail3: "/graphics/product-details-3.png",
      lilin: "/graphics/product-lilin.png",
    },
    souvenir: {
      main: "/graphics/gift.png",
      desc: "/graphics/product-deskripsi.png",
      detail1: "/graphics/product-details-1.png",
      detail2: "/graphics/product-details-2.png",
      detail3: "/graphics/product-details-3.png",
      lilin: "/graphics/product-lilin.png",
    },
  };

  const gfx = productGraphics[product.slug as keyof typeof productGraphics] || productGraphics.buket;

  return (
    <Link
      href={`/produk/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article className="relative overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm transition-all duration-500 hover:border-maroon/20 hover:shadow-2xl hover:shadow-maroon/10 hover:-translate-y-1">
        {/* Batik ribbon at top */}
        <div
          className="h-12"
          style={{
            backgroundImage: `url(${product.pita})`,
            backgroundSize: "84px",
            backgroundRepeat: "repeat",
            opacity: hovered ? 1 : 0.85,
            transition: "opacity 0.3s ease",
          }}
          aria-hidden="true"
        />

        {/* Product image area */}
        <div className="relative aspect-[4/3] overflow-hidden bg-cream/50">
          {/* Main product image */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <Image
              src={gfx.main}
              alt={`Ilustrasi ${product.nama}`}
              width={320}
              height={240}
              className="object-contain transition-all duration-700 group-hover:scale-105"
              priority={index < 2}
            />
          </div>

          {/* Decorative overlay elements */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
            backgroundImage: `url(${product.pita})`,
            backgroundSize: "60px",
            backgroundRepeat: "repeat",
          }} aria-hidden="true" />

          {/* Hover indicator */}
          <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon px-4 py-2 text-xs font-medium text-cream shadow-lg">
              Pilih motif
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </div>
        </div>

        {/* Product info */}
        <div className="p-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-2xl text-maroon transition-colors group-hover:text-maroon-dark">
                {product.nama}
              </p>
              <p className="mt-1 text-sm text-clay">{product.ringkas}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="whitespace-nowrap font-mono text-sm font-semibold text-maroon">
                {formatRupiah(product.harga)}
              </p>
              <p className="text-[10px] font-mono text-clay uppercase tracking-wider">
                {product.satuan}
              </p>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-ink/5">
            <FeatureTag icon="/graphics/product-lilin.png" text="Lilin aromaterapi" />
            <FeatureTag icon={product.pita} text="Kertas batik" />
            <FeatureTag icon="/graphics/points.png" text="Tukar poin" />
          </div>

          {/* Quick motif preview */}
          <div className="pt-2">
            <p className="text-xs text-clay mb-2">Motif populer:</p>
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
              {motif.slice(0, 4).map((m) => (
                <img
                  key={m.id}
                  src={m.gambar}
                  alt={m.nama}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border border-ink/10 shadow-sm transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
              ))}
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-ink/10 bg-cream/50 text-xs font-medium text-clay shrink-0">
                +{motif.length - 4}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ─── Motif Chip Component ─── */
function MotifChip({ motif: m }: { motif: typeof motif[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      className="group relative inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-maroon/10 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Motif ${m.nama}, asal ${m.asal}`}
    >
      <span className="relative h-6 w-6 sm:h-7 sm:w-7 rounded-full overflow-hidden border border-ink/10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        <Image
          src={m.gambar}
          alt=""
          fill
          className="object-cover"
          sizes="28px"
        />
      </span>
      <span className="whitespace-nowrap text-clay group-hover:text-maroon transition-colors">
        {m.nama}
      </span>
      {/* Tooltip */}
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-ink text-cream text-xs font-mono whitespace-nowrap opacity-0 animate-fade-up z-10 pointer-events-none">
          {m.asal} — {m.makna}
        </div>
      )}
    </button>
  );
}

/* ─── Feature Tag Component ─── */
function FeatureTag({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/50 px-3 py-1 text-[11px] font-medium text-clay border border-ink/5 transition-colors hover:border-maroon/20 hover:bg-maroon/5">
      <img src={icon} alt="" className="h-3.5 w-3.5 object-contain" />
      {text}
    </span>
  );
}