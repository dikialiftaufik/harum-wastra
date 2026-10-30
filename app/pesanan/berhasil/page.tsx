"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { bacaPesananTerakhir, formatWaktu, type Pesanan } from "@/lib/pesanan";
import { formatRupiah, tileMotif } from "@/lib/data";
import { SITUS } from "@/lib/situs";
import { GambarLatar } from "@/components/GambarLatar";
import { MotifTile } from "@/components/MotifTile";

const LANGKAH_SELESAI = ["Informasi", "Pembayaran", "Selesai"];

const LANGKAH_BERIKUTNYA = [
  {
    judul: "Verifikasi pembayaran",
    isi: "Tim Harum Wastra mencocokkan transfer Anda dengan nomor pesanan di atas.",
  },
  {
    judul: "Konfirmasi lewat WhatsApp",
    isi: `Kami menghubungi nomor yang Anda daftarkan melalui ${SITUS.whatsapp} untuk konfirmasi.`,
  },
  {
    judul: "Pesanan dikirim",
    isi: "Buket dikemas dengan kertas batik pilihan, lalu dikirim sesuai metode pengiriman.",
  },
];

export default function Berhasil() {
  const [p, setP] = useState<Pesanan | null>(null);
  const [siap, setSiap] = useState(false);
  const [tersalin, setTersalin] = useState(false);

  useEffect(() => {
    setP(bacaPesananTerakhir());
    setSiap(true);
  }, []);

  function salinNomor() {
    if (!p) return;
    const tandai = () => {
      setTersalin(true);
      setTimeout(() => setTersalin(false), 2200);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(p.nomor).then(tandai).catch(tandai);
    } else {
      tandai();
    }
  }

  /* ─── Kerangka saat data peramban belum terbaca ─── */
  if (!siap) {
    return (
      <section className="page-top min-h-[70vh] bg-cream pb-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <p className="eyebrow text-ink/60">Pesanan</p>
          <h1 className="mt-2 font-display text-3xl italic leading-tight text-maroon sm:text-4xl">
            Rincian pesanan Anda
          </h1>
          <p className="mt-3 text-ink/65">
            Menyiapkan ringkasan pesanan yang tersimpan di peramban ini.
          </p>
          <div className="mt-8 h-56 animate-pulse rounded-3xl bg-white/70" />
          <div className="mt-6 h-64 animate-pulse rounded-3xl bg-white/70" />
        </div>
      </section>
    );
  }

  /* ─── Belum ada pesanan ─── */
  if (!p) {
    return (
      <section className="page-top relative flex min-h-[70vh] items-center overflow-hidden bg-cream pb-16">
        <GambarLatar src="/backgrounds/bg-beranda-hero-section.png" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-cream/95 via-cream/90 to-cream/60" />
        <MotifTile id="kawung" ukuran={120} className="z-[1] opacity-10" />
        <div className="relative z-10 mx-auto max-w-xl px-5 text-center sm:px-8">
          <h1 className="font-display text-3xl text-maroon sm:text-4xl">
            Belum ada pesanan
          </h1>
          <p className="mx-auto mt-4 max-w-md text-ink/70">
            Tidak menemukan pesanan terakhir di peramban ini. Silakan pilih
            produk lebih dulu, lalu selesaikan checkout.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/katalog"
              className="inline-flex items-center justify-center rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-maroon-dark"
            >
              Lihat katalog
            </Link>
            <Link
              href="/keranjang"
              className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white/90 px-7 py-3.5 text-sm font-semibold text-ink/80 backdrop-blur-sm transition-colors hover:border-maroon/30 hover:text-maroon"
            >
              Buka keranjang
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const biayaLayanan = Math.max(0, p.total - p.subtotal - p.ongkir);
  // Alamat lama bisa saja sudah memuat kota dan kode pos; jangan diulang.
  const alamatKirim = p.alamat.includes(p.kodepos)
    ? p.alamat
    : `${p.alamat}, ${p.kota} ${p.kodepos}`;

  return (
    <div className="relative overflow-hidden bg-cream pb-20">
      <GambarLatar src="/backgrounds/bg-beranda-hero-section.png" prioritas />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-cream/95 via-cream/92 to-cream/70" />
      <MotifTile id="kawung" ukuran={120} className="z-[1] opacity-[0.07]" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 pt-28 sm:px-8 md:pt-32">
        {/* ─── Stepper selesai ─── */}
        <ol className="mx-auto flex max-w-md items-center justify-between gap-2">
          {LANGKAH_SELESAI.map((label, i) => (
            <li key={label} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {i > 0 && <span className="h-[2px] flex-1 bg-maroon" />}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon text-white">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {i < LANGKAH_SELESAI.length - 1 && <span className="h-[2px] flex-1 bg-maroon" />}
              </div>
              <span className="mt-2 text-xs font-semibold text-maroon">
                {label}
              </span>
            </li>
          ))}
        </ol>

        {/* ─── Kartu konfirmasi ─── */}
        <div className="mt-8 rounded-3xl border border-ink/10 bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-maroon/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            </div>

            <h1 className="mt-5 font-display text-3xl text-maroon sm:text-4xl">
              Pemesanan berhasil
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Pesanan Anda sudah tercatat. Simpan nomor pesanan berikut untuk
              ditanyakan lewat WhatsApp.
            </p>

            {/* Nomor pesanan + salin */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-maroon/20 bg-maroon/5 px-4 py-2.5">
              <span className="font-mono text-sm font-bold tracking-wider text-maroon sm:text-base">
                {p.nomor}
              </span>
              <button
                type="button"
                onClick={salinNomor}
                className="rounded-full border border-maroon/25 px-3 py-1 text-xs font-semibold text-maroon transition-colors hover:bg-maroon/10"
              >
                {tersalin ? "Tersalin" : "Salin"}
              </button>
            </div>
            <p aria-live="polite" className="mt-2 min-h-4 text-xs text-ink/60">
              {tersalin ? "Nomor pesanan disalin ke papan klip." : ""}
            </p>
          </div>

          {/* ─── Rincian ─── */}
          <dl className="mt-6 space-y-2.5 border-t border-ink/10 pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink/65">Atas nama</dt>
              <dd className="text-right font-medium text-ink">{p.nama}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink/65">Telepon</dt>
              <dd className="text-right font-medium text-ink">{p.telepon}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink/65">Kirim ke</dt>
              <dd className="max-w-[60%] text-right font-medium text-ink">
                {alamatKirim}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink/65">Metode pembayaran</dt>
              <dd className="text-right font-medium text-ink">{p.metode}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink/65">Waktu pesanan</dt>
              <dd className="text-right font-medium text-ink">
                {formatWaktu(p.waktu)}
              </dd>
            </div>
          </dl>

          {/* ─── Item ─── */}
          <div className="mt-6 border-t border-ink/10 pt-6">
            <h2 className="font-display text-lg font-bold text-ink">
              Produk pesanan
            </h2>
            <ul className="mt-3 divide-y divide-ink/5">
              {p.items.map((it) => (
                <li key={it.key} className="flex items-center gap-3 py-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${tileMotif(it.pita)})`,
                        backgroundSize: "40px",
                        backgroundRepeat: "repeat",
                      }}
                      aria-hidden="true"
                    />
                    <Image
                      src={it.gambar}
                      alt={it.nama}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">
                      {it.nama}
                    </p>
                    <p className="text-xs text-ink/60">
                      Motif {it.motifNama} · {it.qty} × {formatRupiah(it.harga)}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-maroon">
                    {formatRupiah(it.harga * it.qty)}
                  </p>
                </li>
              ))}
            </ul>

            {/* Rincian biaya */}
            <dl className="mt-4 space-y-2 rounded-2xl bg-cream/60 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink/65">Subtotal produk</dt>
                <dd className="font-medium text-ink">{formatRupiah(p.subtotal)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/65">Ongkos kirim</dt>
                <dd className="font-medium text-ink">
                  {p.ongkir === 0 ? "Gratis" : formatRupiah(p.ongkir)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink/65">Biaya layanan</dt>
                <dd className="font-medium text-ink">
                  {formatRupiah(biayaLayanan)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-ink/10 pt-2">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-display text-xl font-bold text-maroon">
                  {formatRupiah(p.total)}
                </dd>
              </div>
            </dl>

            {p.catatan && (
              <p className="mt-3 rounded-xl bg-cream/60 px-4 py-3 text-xs text-ink/70">
                Catatan: {p.catatan}
              </p>
            )}
          </div>
        </div>

        {/* ─── Langkah berikutnya ─── */}
        <div className="mt-6 rounded-3xl border border-ink/10 bg-white/90 p-6 shadow-sm backdrop-blur-sm sm:p-7">
          <h2 className="font-display text-lg font-bold text-ink">
            Langkah berikutnya
          </h2>
          <ol className="mt-4 space-y-3">
            {LANGKAH_BERIKUTNYA.map((l, i) => (
              <li key={l.judul} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-xs font-bold text-maroon">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{l.judul}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink/65">
                    {l.isi}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ─── Aksi ─── */}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/katalog"
            className="inline-flex items-center justify-center rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark"
          >
            Lanjut belanja
          </Link>
          <Link
            href="/akun"
            className="inline-flex items-center justify-center rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink/75 transition-colors hover:border-maroon/30 hover:text-maroon"
          >
            Buka Eco Points
          </Link>
          <a
            href={SITUS.whatsappHref}
            className="inline-flex items-center justify-center rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink/75 transition-colors hover:border-maroon/30 hover:text-maroon"
          >
            Hubungi kami
          </a>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-ink/50">
          Pembayaran pada situs ini masih simulasi. Tidak ada transaksi uang
          nyata yang terjadi.
        </p>
      </div>
    </div>
  );
}
