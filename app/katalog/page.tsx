"use client";

import Link from "next/link";
import Image from "next/image";
import { produk, motif } from "@/lib/data";
import { useState, useEffect, useRef } from "react";

export default function Katalog() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 lg:px-16">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-1/4 rounded bg-ink/10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ─── Koleksi Nusaflo Section ─── */}
      <section className="katalog-section bg-cream pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          {/* Section label */}
          <p className="katalog-label font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">
            KOLEKSI NUSAFLO
          </p>

          {/* Product cards - 2 columns */}
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {produk.map((p, idx) => (
              <KatalogCard key={p.slug} product={p} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Separator */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        <div className="h-px bg-ink/10" />
      </div>

      {/* ─── Koleksi Motif Batik Section ─── */}
      <section className="katalog-motif-section bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          {/* Section header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">
                WARISAN BUDAYA, UNTUK HARI ESOK
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink italic sm:text-4xl">
                Koleksi motif batik
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/60">
                Setiap pembungkus Nusaflo menggunakan motif batik pilihan yang
                kaya makna. Temukan motif yang paling sesuai dengan cerita dan
                momen spesial Anda.
              </p>
            </div>
            <Link
              href="#"
              className="group inline-flex items-center gap-2 whitespace-nowrap border-b border-maroon pb-0.5 text-sm font-medium text-maroon transition-all duration-300 hover:gap-3"
            >
              Pelajari lebih tentang motif batik
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Motif cards - 6 column grid */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {motif.map((m, idx) => (
              <MotifCard key={m.id} motif={m} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Katalog Product Card ─── */
function KatalogCard({
  product,
  index,
}: {
  product: (typeof produk)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="katalog-card group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`,
      }}
    >
      {/* Product image */}
      <Link
        href={`/produk/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-2xl"
      >
        <Image
          src={product.gambar}
          alt={`Ilustrasi ${product.nama}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index < 2}
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>

      {/* Product info */}
      <div className="mt-5 space-y-2">
        <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
          {product.namaKatalog}
        </h3>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/45">
          {product.tagline}
        </p>
        <p className="font-display text-base font-semibold text-maroon sm:text-lg">
          Mulai dari {" "}
          <span className="text-maroon">
            Rp{product.hargaMulai.toLocaleString("id-ID")}
          </span>
        </p>
        <p className="text-sm leading-relaxed text-ink/60">
          {product.deskripsiKatalog}
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-5">
        <Link
          href={`/produk/${product.slug}`}
          className="group/btn inline-flex items-center gap-3 rounded-full bg-maroon px-6 py-3 text-sm font-medium text-cream transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20"
        >
          Lihat Detail
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ─── Motif Card ─── */
function MotifCard({
  motif: m,
  index,
}: {
  motif: (typeof motif)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="motif-card group cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease-out ${index * 0.08}s, transform 0.5s ease-out ${index * 0.08}s`,
      }}
    >
      {/* Motif image - square with rounded corners */}
      <div className="relative aspect-square overflow-hidden rounded-xl border border-ink/8 transition-all duration-300 group-hover:border-maroon/30 group-hover:shadow-lg group-hover:shadow-maroon/10 group-hover:-translate-y-1">
        <Image
          src={m.gambar}
          alt={`Motif ${m.nama}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />
      </div>

      {/* Motif info */}
      <div className="mt-3">
        <h3 className="font-display text-sm font-bold text-maroon sm:text-base">
          {m.nama}
        </h3>
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/40">
          {m.asal}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-ink/55">
          {m.makna}
        </p>
      </div>
    </div>
  );
}