"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motif, produk, formatRupiah, type Produk, type Motif } from "@/lib/data";
import { tambahKeKeranjang } from "@/lib/keranjang";

export function ProdukDetail({ produk: p }: { produk: Produk }) {
  const [aktifId, setAktifId] = useState<string>(motif[0].id);
  const [ditambahkan, setDitambahkan] = useState(false);
  const [gambarUtama, setGambarUtama] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("deskripsi");
  const aktif: Motif = motif.find((m) => m.id === aktifId) ?? motif[0];

  // Thumbnail scroll ref
  const thumbRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = thumbRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };
    check();
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
  }, []);

  function tambah() {
    for (let i = 0; i < qty; i++) {
      tambahKeKeranjang({
        slug: p.slug,
        nama: p.nama,
        motifId: aktif.id,
        motifNama: aktif.nama,
        harga: p.harga,
        gambar: p.gambar,
        pita: aktif.gambar,
      });
    }
    setDitambahkan(true);
  }

  // Related product
  const related = produk.filter((x) => x.slug !== p.slug);

  const tabs = [
    { id: "deskripsi", label: "Deskripsi" },
    { id: "detail", label: "Detail Produk" },
    { id: "perawatan", label: "Perawatan" },
    { id: "ulasan", label: "Ulasan" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <>
      {/* ─── Breadcrumb ─── */}
      <div className="bg-cream pt-24 pb-2">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          <nav className="flex items-center gap-2 text-sm text-ink/50" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-maroon">
              Beranda
            </Link>
            <span className="text-ink/30">&gt;</span>
            <Link href="/katalog" className="transition-colors hover:text-maroon">
              Katalog
            </Link>
            <span className="text-ink/30">&gt;</span>
            <span className="font-medium text-ink/80">{p.nama}</span>
          </nav>
        </div>
      </div>

      {/* ─── Main Product Section ─── */}
      <section className="bg-cream pb-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
            {/* Left - Image gallery */}
            <div className="space-y-4">
              {/* Main image with navigation arrows */}
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                <Image
                  src={p.gambarGaleri[gambarUtama]}
                  alt={`${p.nama} - Gambar ${gambarUtama + 1}`}
                  fill
                  className="object-cover transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Left arrow */}
                {p.gambarGaleri.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setGambarUtama((prev) =>
                          prev === 0 ? p.gambarGaleri.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-lg"
                      aria-label="Gambar sebelumnya"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>

                    {/* Right arrow */}
                    <button
                      type="button"
                      onClick={() =>
                        setGambarUtama((prev) =>
                          prev === p.gambarGaleri.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-white hover:shadow-lg"
                      aria-label="Gambar selanjutnya"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="relative flex items-center gap-2">
                {/* Left scroll button */}
                {canScrollLeft && (
                  <button
                    type="button"
                    onClick={() => thumbRef.current?.scrollBy({ left: -100, behavior: "smooth" })}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/50 transition-colors hover:text-maroon"
                    aria-label="Scroll kiri"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                )}

                <div
                  ref={thumbRef}
                  className="flex gap-2 overflow-x-auto scrollbar-hide"
                >
                  {p.gambarGaleri.map((g, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setGambarUtama(i)}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 sm:h-20 sm:w-20 ${
                        gambarUtama === i
                          ? "border-maroon ring-2 ring-maroon/20"
                          : "border-ink/10 hover:border-maroon/40"
                      }`}
                    >
                      <Image
                        src={g}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>

                {/* Right scroll button */}
                {canScrollRight && (
                  <button
                    type="button"
                    onClick={() => thumbRef.current?.scrollBy({ left: 100, behavior: "smooth" })}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/50 transition-colors hover:text-maroon"
                    aria-label="Scroll kanan"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Right - Product info */}
            <div className="flex flex-col">
              {/* Title */}
              <h1 className="font-display text-3xl text-maroon sm:text-4xl italic">
                {p.nama}
              </h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={star <= Math.floor(p.rating) ? "#7b212e" : "none"}
                      stroke="#7b212e"
                      strokeWidth="1.5"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="font-display text-sm font-bold text-ink">
                  {p.rating.toFixed(1)}
                </span>
                <span className="text-sm text-ink/50">
                  ({p.ulasan}+ ulasan)
                </span>
              </div>

              {/* Price */}
              <p className="mt-3 font-display text-2xl font-bold text-maroon sm:text-3xl">
                {formatRupiah(p.harga)}
              </p>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                Rangkaian lilin aromaterapi berbentuk bunga yang dibungkus dengan
                kertas batik pilihan. Hadiah yang cantik, bermakna, dan lebih
                ramah lingkungan.
              </p>

              {/* Motif picker */}
              <div className="mt-6">
                <p className="font-display text-base font-bold text-maroon italic">
                  Pilih motif batik
                </p>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {motif.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setAktifId(m.id);
                        setDitambahkan(false);
                      }}
                      aria-pressed={m.id === aktifId}
                      aria-label={`Pilih motif ${m.nama}`}
                      className="group/motif flex flex-col items-center gap-1"
                    >
                      <div
                        className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 sm:h-16 sm:w-16 ${
                          m.id === aktifId
                            ? "border-maroon ring-2 ring-maroon/20"
                            : "border-ink/10 hover:border-maroon/40"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.gambar}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span
                        className={`text-[10px] font-medium transition-colors ${
                          m.id === aktifId
                            ? "text-maroon"
                            : "text-ink/40 group-hover/motif:text-maroon/70"
                        }`}
                      >
                        {m.nama}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Add to cart */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {/* Quantity label */}
                <div>
                  <p className="mb-2 text-sm font-medium text-ink/70 italic">
                    Jumlah
                  </p>
                  <div className="inline-flex items-center rounded-xl border border-ink/15 bg-white">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex h-11 w-11 items-center justify-center text-ink/50 transition-colors hover:text-maroon"
                      aria-label="Kurangi jumlah"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                    <span className="w-10 text-center font-mono text-sm font-semibold text-ink">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      className="flex h-11 w-11 items-center justify-center text-ink/50 transition-colors hover:text-maroon"
                      aria-label="Tambah jumlah"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add to cart button */}
                <div className="flex-1 sm:flex-none">
                  <p className="mb-2 text-sm font-medium text-transparent">.</p>
                  <button
                    type="button"
                    onClick={tambah}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-maroon px-8 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20 sm:w-auto"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                    Masukkan ke Keranjang
                  </button>
                </div>
              </div>

              {ditambahkan && (
                <p className="mt-3 text-sm text-maroon animate-fade-up">
                  ✓ Ditambahkan ke keranjang.{" "}
                  <Link
                    href="/keranjang"
                    className="underline underline-offset-4 hover:text-maroon-dark"
                  >
                    Lihat keranjang
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tabs Section ─── */}
      <section className="bg-cream pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          {/* Tab navigation */}
          <div className="border-b border-ink/10">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide sm:gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap border-b-2 pb-3 pt-1 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border-maroon text-maroon"
                      : "border-transparent text-ink/45 hover:text-ink/70"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="mt-8">
            {activeTab === "deskripsi" && (
              <div className="grid gap-10 md:grid-cols-2">
                <div className="space-y-4">
                  {p.deskripsiDetail.map((para, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-ink/70"
                    >
                      {para}
                    </p>
                  ))}
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/graphics/product-deskripsi.png"
                    alt="Deskripsi produk"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}

            {activeTab === "detail" && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-ink/8 bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">Material</p>
                    <p className="mt-1 text-sm text-ink/70">Lilin aromaterapi dari minyak jelantah terproses</p>
                  </div>
                  <div className="rounded-xl border border-ink/8 bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">Pembungkus</p>
                    <p className="mt-1 text-sm text-ink/70">Kertas batik motif pilihan, reusable</p>
                  </div>
                  <div className="rounded-xl border border-ink/8 bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">Ukuran</p>
                    <p className="mt-1 text-sm text-ink/70">±25cm x 25cm (buket) / ±8cm (kelopak)</p>
                  </div>
                  <div className="rounded-xl border border-ink/8 bg-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">Berat</p>
                    <p className="mt-1 text-sm text-ink/70">±350gr (buket) / ±50gr (kelopak)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "perawatan" && (
              <div className="max-w-2xl space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-xs font-bold text-maroon">1</span>
                  <p className="text-sm text-ink/70">Simpan di tempat kering dan tidak terkena sinar matahari langsung.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-xs font-bold text-maroon">2</span>
                  <p className="text-sm text-ink/70">Hindari menyimpan di suhu tinggi karena dapat menyebabkan lilin meleleh.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-xs font-bold text-maroon">3</span>
                  <p className="text-sm text-ink/70">Kertas batik pembungkus dapat dicuci lembut dan digunakan kembali.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-xs font-bold text-maroon">4</span>
                  <p className="text-sm text-ink/70">Lilin dapat dicabut dan dinyalakan terpisah dengan tatakan tahan panas.</p>
                </div>
              </div>
            )}

            {activeTab === "ulasan" && (
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 rounded-xl border border-ink/8 bg-white p-5">
                  <p className="font-display text-4xl font-bold text-maroon">{p.rating.toFixed(1)}</p>
                  <div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#7b212e" stroke="#7b212e" strokeWidth="1.5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-ink/50">{p.ulasan}+ ulasan dari pembeli</p>
                  </div>
                </div>
                <p className="mt-4 text-sm italic text-ink/40">Fitur ulasan lengkap akan segera hadir.</p>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="max-w-2xl space-y-4">
                <details className="group rounded-xl border border-ink/8 bg-white">
                  <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-ink transition-colors hover:text-maroon">
                    Apakah lilinnya bisa dinyalakan?
                  </summary>
                  <p className="px-5 pb-4 text-sm text-ink/60">
                    Ya, setiap kelopak lilin aromaterapi dapat dicabut dari buket dan dinyalakan terpisah. Gunakan tatakan tahan panas untuk keamanan.
                  </p>
                </details>
                <details className="group rounded-xl border border-ink/8 bg-white">
                  <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-ink transition-colors hover:text-maroon">
                    Berapa lama waktu bakarnya?
                  </summary>
                  <p className="px-5 pb-4 text-sm text-ink/60">
                    Setiap kelopak lilin dapat menyala selama kurang lebih 2-3 jam tergantung ukuran.
                  </p>
                </details>
                <details className="group rounded-xl border border-ink/8 bg-white">
                  <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-ink transition-colors hover:text-maroon">
                    Apakah pembungkus batiknya bisa dipakai ulang?
                  </summary>
                  <p className="px-5 pb-4 text-sm text-ink/60">
                    Tentu! Kertas batik pembungkus dan tatakan dirancang untuk tetap bernilai dan dapat digunakan kembali setelah lilin diambil.
                  </p>
                </details>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Produk Terkait ─── */}
      {related.length > 0 && (
        <section className="bg-cream pb-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-maroon italic">
                Produk Terkait
              </h2>
              <Link
                href="/katalog"
                className="group inline-flex items-center gap-2 border-b border-maroon pb-0.5 text-sm font-medium text-maroon transition-all duration-300 hover:gap-3"
              >
                Lihat semua produk
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

            <div className="mt-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/produk/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white transition-all duration-300 hover:border-maroon/20 hover:shadow-lg hover:shadow-maroon/10 sm:flex-row"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-auto sm:w-80">
                    <Image
                      src={r.gambar}
                      alt={r.nama}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="320px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 items-center justify-between gap-4 p-6">
                    <div className="space-y-1">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                        {r.tagline}
                      </p>
                      <h3 className="font-display text-xl text-ink italic">
                        {r.namaKatalog}
                      </h3>
                      <p className="max-w-md text-sm text-ink/55">
                        {r.ringkas}
                      </p>
                      <p className="font-display text-lg font-bold text-maroon">
                        1 kelopak = {(r.harga / 1000).toFixed(0)}k
                      </p>
                    </div>

                    {/* Arrow button */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon text-cream transition-all duration-300 group-hover:bg-maroon-dark group-hover:shadow-lg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
