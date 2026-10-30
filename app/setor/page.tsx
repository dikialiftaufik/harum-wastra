"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  tambahSetoran,
  saldoPoin,
  bacaProfil,
  simpanProfil,
  POIN_PER_LITER,
  RUPIAH_PER_POIN,
  LOKASI_SETORAN,
  type Setoran,
} from "@/lib/poin";
import { SITUS } from "@/lib/situs";
import { GambarLatar } from "@/components/GambarLatar";
import { MotifTile } from "@/components/MotifTile";

type Galat = { telepon?: string; liter?: string };

const LANGKAH = [
  {
    judul: "Kumpulkan jelantah",
    isi: "Simpan minyak goreng bekas di wadah tertutup sampai terkumpul cukup banyak.",
  },
  {
    judul: "Datang ke mitra",
    isi: `Serahkan jelantah Anda di ${SITUS.lokasiMitra} atau mitra bank sampah terdekat.`,
  },
  {
    judul: "Pindai QR",
    isi: "Petugas memindai QR dari halaman Eco Points, atau Anda membuka halaman ini langsung.",
  },
  {
    judul: "Poin masuk",
    isi: "Poin otomatis tercatat dan bisa ditukar dengan buket atau voucher di halaman Eco Points.",
  },
];

export default function Setor() {
  const [telepon, setTelepon] = useState("");
  const [liter, setLiter] = useState("");
  const [galat, setGalat] = useState<Galat>({});
  const [hasil, setHasil] = useState<{ setoran: Setoran; saldo: number } | null>(
    null
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dariQr = params.get("telepon");
    const dariSimulasi = params.get("liter");

    if (dariQr) setTelepon(dariQr);
    else {
      const profil = bacaProfil();
      if (profil?.telepon) setTelepon(profil.telepon);
    }

    if (dariSimulasi && Number(dariSimulasi) > 0) setLiter(dariSimulasi);
  }, []);

  const literAngka = Number(liter.replace(",", "."));
  const literValid = Number.isFinite(literAngka) && literAngka > 0;
  const poinPratinjau = literValid
    ? Math.round(literAngka * POIN_PER_LITER)
    : 0;

  function ubahLiter(nilai: string) {
    setLiter(nilai.replace(/[^\d.,]/g, ""));
    setGalat((g) => ({ ...g, liter: undefined }));
  }

  function geserLiter(delta: number) {
    const dasar = literValid ? literAngka : 0;
    const berikutnya = Math.min(200, Math.max(0, dasar + delta));
    setLiter(berikutnya === 0 ? "" : String(berikutnya));
    setGalat((g) => ({ ...g, liter: undefined }));
  }

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    const galatBaru: Galat = {};
    const digit = telepon.replace(/\D/g, "");
    if (digit.length < 9) {
      galatBaru.telepon = "Isi nomor WhatsApp minimal 9 digit agar setoran terhubung ke akun Anda.";
    }
    if (!literValid) {
      galatBaru.liter = "Masukkan jumlah liter lebih dari 0.";
    } else if (literAngka > 200) {
      galatBaru.liter = "Untuk demo, jumlah setoran dibatasi maksimal 200 liter.";
    }

    setGalat(galatBaru);
    if (Object.keys(galatBaru).length > 0) return;

    const setoran = tambahSetoran(literAngka, LOKASI_SETORAN);
    simpanProfil(telepon.trim());
    setHasil({ setoran, saldo: saldoPoin() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ─── Tampilan setelah setoran tercatat ─── */
  if (hasil) {
    return (
      <section className="relative overflow-hidden bg-cream pb-20 pt-28 md:pt-32">
        <GambarLatar src="/backgrounds/bg-eco-points-and-events.png" prioritas />
        <MotifTile id="sekar-jagad" ukuran={120} className="opacity-[0.04]" />

        <div className="relative z-10 mx-auto max-w-xl px-5 sm:px-8">
          <div className="rounded-3xl border border-ink/10 bg-white/95 p-7 text-center shadow-xl backdrop-blur-sm sm:p-9">
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
              Setoran tercatat
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Terima kasih! Setoran Anda di {hasil.setoran.lokasi} sudah masuk ke
              buku poin di peramban ini.
            </p>

            <dl className="mt-6 space-y-3 rounded-2xl bg-cream/60 p-5 text-left text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink/65">Jumlah jelantah</dt>
                <dd className="font-semibold text-ink">
                  {hasil.setoran.liter.toLocaleString("id-ID")} liter
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink/65">Poin masuk</dt>
                <dd className="font-display text-base font-bold text-maroon">
                  +{hasil.setoran.poin.toLocaleString("id-ID")} poin
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
                <dt className="text-ink/65">Saldo sekarang</dt>
                <dd className="font-display text-base font-bold text-ink">
                  {hasil.saldo.toLocaleString("id-ID")} poin
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link
                href="/akun"
                className="inline-flex items-center justify-center rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark"
              >
                Buka Eco Points
              </Link>
              <button
                type="button"
                onClick={() => {
                  setHasil(null);
                  setLiter("");
                  setGalat({});
                }}
                className="inline-flex items-center justify-center rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink/75 transition-colors hover:border-maroon/30 hover:text-maroon"
              >
                Catat setoran lain
              </button>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-ink/50">
              Catatan: data poin tersimpan di peramban perangkat ini. Untuk demo,
              catat setoran pada perangkat yang sama dengan yang menampilkan QR.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Halaman setoran ─── */
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-cream pb-10 pt-28 md:pt-32">
        <GambarLatar src="/backgrounds/bg-eco-events-hero.png" posisi="left center" prioritas />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          <p className="eyebrow text-clay">Setor Jelantah</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.15] text-maroon sm:text-5xl">
            Setor jelantah,{" "}
            <span className="italic">tukarkan jadi poin</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70">
            Halaman ini adalah tujuan pemindaian QR dari halaman Eco Points.
            Masukkan jumlah liter yang Anda setor, lalu poinnya otomatis
            tercatat.
          </p>
        </div>
      </section>

      {/* ─── Cara setor + formulir ─── */}
      <section className="relative bg-cream pb-20 pt-4">
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Kiri: langkah & lokasi */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-ink/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm sm:p-7">
                <h2 className="font-display text-xl font-bold text-ink">
                  Cara setor jelantah
                </h2>
                <ol className="mt-5 space-y-4">
                  {LANGKAH.map((l, i) => (
                    <li key={l.judul} className="flex gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maroon text-xs font-bold text-white">
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

              <div className="mt-6 rounded-2xl border border-ink/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
                <h2 className="font-display text-xl font-bold text-ink">
                  Lokasi mitra
                </h2>
                <p className="mt-2 text-sm font-semibold text-maroon">
                  {SITUS.lokasiMitra}
                </p>
                <p className="mt-1 text-sm text-ink/65">
                  {SITUS.alamat} · {SITUS.jamLayanan}
                </p>
                <a
                  href={SITUS.whatsappHref}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-maroon/30 px-5 py-2.5 text-sm font-semibold text-maroon transition-colors hover:bg-maroon/5"
                >
                  Tanya lewat WhatsApp
                </a>
              </div>
            </div>

            {/* Kanan: formulir */}
            <div className="lg:col-span-5">
              <form
                onSubmit={kirim}
                noValidate
                className="sticky top-28 rounded-3xl border border-ink/10 bg-white p-6 shadow-lg sm:p-7"
              >
                <p className="eyebrow text-clay">Pemindaian berhasil</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-maroon">
                  {SITUS.lokasiMitra}
                </h2>
                <p className="mt-1 text-sm text-ink/65">
                  Lengkapi data setoran Anda di bawah ini.
                </p>

                {/* Nomor WhatsApp */}
                <div className="mt-6">
                  <label
                    htmlFor="setor-telepon"
                    className="mb-1 block text-sm font-semibold text-ink"
                  >
                    Nomor WhatsApp<span className="text-maroon"> *</span>
                  </label>
                  <input
                    id="setor-telepon"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={telepon}
                    onChange={(e) => {
                      setTelepon(e.target.value);
                      setGalat((g) => ({ ...g, telepon: undefined }));
                    }}
                    placeholder="0812 3456 7890"
                    aria-invalid={Boolean(galat.telepon)}
                    aria-describedby={galat.telepon ? "setor-telepon-galat" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 ${
                      galat.telepon
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-ink/15 focus:border-maroon/50 focus:ring-maroon/10"
                    }`}
                  />
                  {galat.telepon && (
                    <p id="setor-telepon-galat" className="mt-1.5 text-xs text-red-600">
                      {galat.telepon}
                    </p>
                  )}
                </div>

                {/* Volume */}
                <div className="mt-5">
                  <label
                    htmlFor="setor-liter"
                    className="mb-1 block text-sm font-semibold text-ink"
                  >
                    Volume jelantah<span className="text-maroon"> *</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Kurangi 0,5 liter"
                      onClick={() => geserLiter(-0.5)}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink/15 bg-cream/50 text-lg font-bold text-ink transition-colors hover:border-maroon/30 hover:bg-maroon/5"
                    >
                      −
                    </button>
                    <div className="relative flex-1">
                      <input
                        id="setor-liter"
                        inputMode="decimal"
                        value={liter}
                        onChange={(e) => ubahLiter(e.target.value)}
                        placeholder="0"
                        aria-invalid={Boolean(galat.liter)}
                        aria-describedby={galat.liter ? "setor-liter-galat" : undefined}
                        className={`w-full rounded-xl border py-3 pl-4 pr-12 text-center font-mono text-2xl text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 ${
                          galat.liter
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-ink/15 focus:border-maroon/50 focus:ring-maroon/10"
                        }`}
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink/50">
                        liter
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-label="Tambah 0,5 liter"
                      onClick={() => geserLiter(0.5)}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink/15 bg-cream/50 text-lg font-bold text-ink transition-colors hover:border-maroon/30 hover:bg-maroon/5"
                    >
                      +
                    </button>
                  </div>
                  {galat.liter && (
                    <p id="setor-liter-galat" className="mt-1.5 text-xs text-red-600">
                      {galat.liter}
                    </p>
                  )}
                </div>

                {/* Pratinjau poin */}
                <div className="mt-5 rounded-2xl bg-cream/60 p-4" aria-live="polite">
                  <p className="text-xs text-ink/65">
                    {POIN_PER_LITER.toLocaleString("id-ID")} poin per liter
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-ink/65">Poin yang didapat</p>
                      <p className="font-display text-2xl font-bold text-maroon">
                        +{poinPratinjau.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <p className="text-right text-xs text-ink/65">
                      ≈ Rp
                      {(poinPratinjau * RUPIAH_PER_POIN).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-maroon px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20"
                >
                  Catat setoran
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-ink/50">
                  Dengan menekan tombol di atas, setoran dicatat di peramban ini
                  dan nomor WhatsApp Anda disimpan untuk pemindaian QR berikutnya.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
