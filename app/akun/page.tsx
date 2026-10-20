"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  bacaSetoran,
  saldoPoin,
  totalLiter,
  RUPIAH_PER_POIN,
  POIN_PER_LITER,
  type Setoran,
} from "@/lib/poin";

/* ────────────────────────────────────────────────
   Dummy riwayat data (illustrative)
   ──────────────────────────────────────────────── */
const RIWAYAT_DUMMY: {
  tanggal: string;
  jam: string;
  lokasi: string;
  kota: string;
  liter: string;
  poin: string;
  tipe: "house" | "store";
}[] = [
  {
    tanggal: "12 Mar 2025",
    jam: "14:32",
    lokasi: "Bank Sampah Melati",
    kota: "Jakarta Selatan",
    liter: "2,5 L",
    poin: "+2.500",
    tipe: "house",
  },
  {
    tanggal: "5 Mar 2025",
    jam: "10:15",
    lokasi: "EcoHub Cinere",
    kota: "Depok",
    liter: "3,0 L",
    poin: "+3.000",
    tipe: "store",
  },
  {
    tanggal: "20 Feb 2025",
    jam: "16:20",
    lokasi: "Bank Sampah Lestari",
    kota: "Tangerang",
    liter: "1,8 L",
    poin: "+1.800",
    tipe: "house",
  },
  {
    tanggal: "8 Feb 2025",
    jam: "09:45",
    lokasi: "Rumah Hijau",
    kota: "Bekasi",
    liter: "2,0 L",
    poin: "+2.000",
    tipe: "store",
  },
  {
    tanggal: "25 Jan 2025",
    jam: "13:10",
    lokasi: "Bank Sampah Melati",
    kota: "Jakarta Selatan",
    liter: "2,5 L",
    poin: "+2.500",
    tipe: "house",
  },
];

/* ────────────────────────────────────────────────
   Voucher data
   ──────────────────────────────────────────────── */
const VOUCHERS = [
  {
    id: 1,
    icon: "percent",
    title: "Voucher Diskon 10%",
    desc: "Dapatkan diskon 10% untuk semua produk Nusaflo.",
    poin: "5.000 Poin",
  },
  {
    id: 2,
    icon: "rupiah",
    title: "Voucher Potongan Rp25.000",
    desc: "Potongan Rp25.000 untuk pembelian minimal Rp100.000.",
    poin: "10.000 Poin",
  },
  {
    id: 3,
    icon: "ongkir",
    title: "Gratis Ongkir",
    desc: "Voucher gratis ongkir untuk pembelian di website Nusaflo.",
    poin: "7.500 Poin",
  },
];

/* ────────────────────────────────────────────────
   SVG Icon Components
   ──────────────────────────────────────────────── */
function DropIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <div className="eco-lokasi-icon flex h-9 w-9 items-center justify-center rounded-lg bg-maroon/10">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-maroon"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    </div>
  );
}

function StoreIcon() {
  return (
    <div className="eco-lokasi-icon flex h-9 w-9 items-center justify-center rounded-lg bg-maroon/10">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-maroon"
      >
        <path d="M3 3h18l-2 13H5L3 3z" />
        <path d="M3 16h18v5H3z" />
        <path d="M8 21v-5" />
        <path d="M16 21v-5" />
      </svg>
    </div>
  );
}

function PercentVoucherIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-maroon/60"
      />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontSize="28"
        fontWeight="bold"
        fill="currentColor"
        className="text-maroon"
      >
        %
      </text>
    </svg>
  );
}

function RupiahVoucherIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect
        x="12"
        y="16"
        width="40"
        height="32"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-maroon/60"
      />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fill="currentColor"
        className="text-maroon"
      >
        Rp
      </text>
    </svg>
  );
}

function OngkirVoucherIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect
        x="4"
        y="20"
        width="36"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-maroon/60"
      />
      <path
        d="M40 28h10l8 8v8H40V28z"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-maroon/60"
      />
      <circle
        cx="16"
        cy="48"
        r="5"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-maroon/60"
      />
      <circle
        cx="48"
        cy="48"
        r="5"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-maroon/60"
      />
    </svg>
  );
}

function CoinsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L4.59 22l6.5-4.5C14 19.5 18 18 21 15c4.09-4.09 3.31-10.83 0-12-1.14.42-2.5 1.2-3.5 2.5L17 8z" />
      <path d="M2 12s4-2 8 2" />
    </svg>
  );
}

/* ────────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────────── */
export default function EcoPoints() {
  const [siap, setSiap] = useState(false);
  const [qr, setQr] = useState("");
  const [setoran, setSetoran] = useState<Setoran[]>([]);
  const [jumlahJelantah, setJumlahJelantah] = useState(2.5);

  /* Scroll reveal */
  const riwayatRef = useRef<HTMLDivElement>(null);
  const voucherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSetoran(bacaSetoran());
    setSiap(true);

    // Generate a demo QR code
    const site = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const url = `${site}/setor`;
    QRCode.toDataURL(url, {
      margin: 1,
      width: 360,
      color: { dark: "#292423", light: "#ffffff" },
    })
      .then(setQr)
      .catch(() => setQr(""));
  }, []);

  /* IntersectionObserver for scroll reveal */
  useEffect(() => {
    const elems = document.querySelectorAll(".reveal-on-scroll");
    if (!elems.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    elems.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [siap]);

  if (!siap) return null;


  // ──── Derived values ────
  const saldo = saldoPoin();
  const liter = totalLiter();
  const estimasiPoin = Math.round(jumlahJelantah * POIN_PER_LITER);
  const estimasiRupiah = estimasiPoin * RUPIAH_PER_POIN;
  const displaySaldo = saldo > 0 ? saldo : 12500;
  const displayLiter = liter > 0 ? liter : 12.5;

  // Use real setoran if available, otherwise show dummy
  const riwayatData =
    setoran.length > 0
      ? setoran
          .slice()
          .reverse()
          .map((s) => ({
            tanggal: new Date(s.waktu).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            jam: new Date(s.waktu).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            lokasi: s.lokasi,
            kota: "",
            liter: `${s.liter.toLocaleString("id-ID")} L`,
            poin: `+${s.poin.toLocaleString("id-ID")}`,
            tipe: "house" as const,
          }))
      : RIWAYAT_DUMMY;

  return (
    <>
      {/* ═══════════════════════════════════════════════
          SECTION 1: Hero — Setor & Pantau Poin
         ═══════════════════════════════════════════════ */}
      <section className="eco-points-hero relative overflow-hidden pt-24 pb-8 md:pt-28">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(/backgrounds/bg-eco-points-and-events.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* ─── Left Column ─── */}
            <div className="lg:col-span-7">
              {/* Label */}
              <p className="eco-points-label font-mono text-xs font-semibold uppercase tracking-[0.3em] text-clay">
                Akun Dan Eco Points
              </p>

              {/* Heading */}
              <h1 className="eco-points-heading mt-4 font-display text-[2.6rem] leading-[1.1] text-maroon sm:text-5xl lg:text-[3.4rem]">
                Setor jelantah,
                <br />
                pantau poin Anda
              </h1>

              {/* Description */}
              <p className="eco-points-desc mt-5 max-w-[520px] text-[0.95rem] leading-[1.75] text-ink/70">
                Scan QR melalui website, masukkan jumlah liter jelantah Anda,
                dan lihat estimasi poin yang akan ditambahkan ke akun Nusaflo
                Anda.
              </p>

              {/* ─── QR Scanner Card ─── */}
              <div className="eco-qr-card mt-8 rounded-2xl border border-ink/10 bg-white/85 p-6 shadow-sm backdrop-blur-sm">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-ink">
                    Scan QR melalui website
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-ink/60">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                    Kamera siap
                  </div>
                </div>

                {/* QR Display area */}
                <div className="mt-5 flex items-center justify-center rounded-xl border-2 border-dashed border-ink/10 bg-cream/40 py-8">
                  <div className="relative">
                    {/* Corner brackets */}
                    <span className="absolute -left-4 -top-4 h-6 w-6 border-l-2 border-t-2 border-maroon/40 rounded-tl" />
                    <span className="absolute -right-4 -top-4 h-6 w-6 border-r-2 border-t-2 border-maroon/40 rounded-tr" />
                    <span className="absolute -bottom-4 -left-4 h-6 w-6 border-b-2 border-l-2 border-maroon/40 rounded-bl" />
                    <span className="absolute -bottom-4 -right-4 h-6 w-6 border-b-2 border-r-2 border-maroon/40 rounded-br" />
                    {qr ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={qr}
                        alt="Kode QR setoran"
                        className="h-32 w-32 rounded-lg sm:h-40 sm:w-40"
                      />
                    ) : (
                      <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-white sm:h-40 sm:w-40">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="text-ink/20"
                        >
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-center text-sm text-ink/50">
                  Arahkan kamera ke QR setoran
                </p>
              </div>

              {/* ─── Cara Setor Steps ─── */}
              <div className="mt-6">
                <h3 className="font-display text-base font-bold text-maroon">
                  Cara setor
                </h3>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-2">
                  {/* Step 1 */}
                  <div className="eco-step-card flex flex-1 items-start gap-3 rounded-xl bg-white/60 p-3 backdrop-blur-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10">
                      <Image
                        src="/graphics/points.png"
                        alt="Scan QR"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">
                        1. Scan QR
                      </p>
                      <p className="text-xs text-ink/60">
                        Arahkan kamera dari website
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden items-center text-clay/40 sm:flex">
                    <ArrowRight />
                  </div>

                  {/* Step 2 */}
                  <div className="eco-step-card flex flex-1 items-start gap-3 rounded-xl bg-white/60 p-3 backdrop-blur-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10">
                      <DropIcon className="text-maroon" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">
                        2. Masukkan liter
                      </p>
                      <p className="text-xs text-ink/60">
                        Isi jumlah jelantah yang disetor
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden items-center text-clay/40 sm:flex">
                    <ArrowRight />
                  </div>

                  {/* Step 3 */}
                  <div className="eco-step-card flex flex-1 items-start gap-3 rounded-xl bg-white/60 p-3 backdrop-blur-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10">
                      <Image
                        src="/graphics/gift.png"
                        alt="Simulasikan poin"
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">
                        3. Simulasikan poin
                      </p>
                      <p className="text-xs text-ink/60">
                        Lihat estimasi poin yang akan didapat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Right Column ─── */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {/* ─── Saldo Poin Card ─── */}
              <div className="eco-saldo-card relative overflow-hidden rounded-2xl p-6 text-cream shadow-lg">
                {/* Background image */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage:
                      "url(/backgrounds/bg-eco-points-saldo.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                {/* Slight overlay for readability */}
                <div className="absolute inset-0 z-[1] bg-maroon/30" />

                <div className="relative z-10">
                  <p className="text-sm font-semibold text-cream/90">
                    Saldo Poin
                  </p>
                  <p className="mt-2 font-display text-[3.4rem] font-bold leading-none tracking-tight">
                    {displaySaldo.toLocaleString("id-ID")}
                  </p>
                  <p className="mt-2 text-sm text-cream/80">
                    Perkiraan nilai: sekitar Rp
                    {(displaySaldo * RUPIAH_PER_POIN).toLocaleString("id-ID")}
                  </p>

                  {/* Bottom row */}
                  <div className="mt-6 flex items-center justify-between border-t border-cream/20 pt-4">
                    <div className="flex items-center gap-3">
                      <DropIcon className="h-6 w-6 text-cream/70" />
                      <div>
                        <p className="text-xs text-cream/70">Total Liter</p>
                        <p className="font-display text-xl font-bold">
                          {displayLiter.toLocaleString("id-ID")} L
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-cream/60">
                      <InfoIcon className="h-4 w-4" />
                      <span className="max-w-[140px] leading-tight">
                        Nilai masih bersifat estimasi dan dapat berubah.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Simulasi Setoran Card ─── */}
              <div className="eco-simulasi-card rounded-2xl border border-ink/10 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
                <h2 className="font-display text-xl font-bold text-maroon">
                  Simulasi Setoran
                </h2>
                <p className="mt-2 text-sm text-ink/65">
                  Masukkan perkiraan jumlah jelantah yang akan Anda setor untuk
                  melihat estimasi poin dan nilainya.
                </p>

                {/* Input */}
                <div className="mt-5">
                  <label className="text-sm font-semibold text-ink">
                    Jumlah jelantah
                  </label>
                  <div className="mt-2 flex items-center gap-2">
                    {/* Minus button */}
                    <button
                      onClick={() =>
                        setJumlahJelantah(Math.max(0.5, jumlahJelantah - 0.5))
                      }
                      className="eco-sim-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink/15 bg-cream/50 text-lg font-bold text-ink transition-all hover:border-maroon/30 hover:bg-maroon/5"
                    >
                      −
                    </button>
                    {/* Value display */}
                    <div className="flex flex-1 items-center justify-center rounded-xl border border-ink/15 bg-cream/30 py-3">
                      <span className="font-display text-2xl font-bold text-ink">
                        {jumlahJelantah.toLocaleString("id-ID", {
                          minimumFractionDigits: 1,
                        })}
                      </span>
                      <span className="ml-2 text-sm text-ink/50">L</span>
                    </div>
                    {/* Plus button */}
                    <button
                      onClick={() =>
                        setJumlahJelantah(
                          Math.min(100, jumlahJelantah + 0.5)
                        )
                      }
                      className="eco-sim-btn flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink/15 bg-cream/50 text-lg font-bold text-ink transition-all hover:border-maroon/30 hover:bg-maroon/5"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Estimation results */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {/* Estimasi poin */}
                  <div className="eco-est-card flex items-center gap-3 rounded-xl border border-ink/10 bg-cream/30 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10">
                      <CoinsIcon className="text-maroon" />
                    </div>
                    <div>
                      <p className="text-xs text-ink/60">Estimasi poin masuk</p>
                      <p className="font-display text-lg font-bold text-maroon">
                        +{estimasiPoin.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  {/* Estimasi nilai */}
                  <div className="eco-est-card flex items-center gap-3 rounded-xl border border-ink/10 bg-cream/30 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10">
                      <LeafIcon className="text-maroon" />
                    </div>
                    <div>
                      <p className="text-xs text-ink/60">Estimasi nilai sekitar</p>
                      <p className="font-display text-lg font-bold text-maroon">
                        Rp{estimasiRupiah.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA button */}
                <button className="eco-sim-cta group mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl bg-maroon px-6 py-3.5 font-medium text-cream transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20">
                  Simulasikan Setoran
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: Riwayat Setoran & Tukar Voucher
         ═══════════════════════════════════════════════ */}
      <section className="eco-points-scroll relative overflow-hidden pb-8" style={{ backgroundColor: "#F9EFE1" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-8 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* ─── Riwayat Setoran ─── */}
            <div
              ref={riwayatRef}
              className="reveal-on-scroll rounded-2xl border border-ink/10 bg-white/90 p-6 shadow-sm backdrop-blur-sm lg:col-span-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-maroon sm:text-3xl">
                  Riwayat Setoran
                </h2>
                <button className="eco-lihat-semua group flex items-center gap-1.5 text-sm font-semibold text-maroon transition-colors hover:text-maroon-dark">
                  Lihat Semua
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              <p className="mt-3 text-sm text-ink/60">
                Berikut adalah riwayat setoran minyak jelantah Anda terbaru di
                bank sampah mitra Nusaflo.
              </p>

              {/* Table header */}
              <div className="mt-6 grid grid-cols-12 gap-2 border-b border-ink/10 pb-3 text-xs font-semibold uppercase tracking-wider text-ink/45">
                <div className="col-span-3">Tanggal</div>
                <div className="col-span-4">Lokasi</div>
                <div className="col-span-2 text-right">Liter</div>
                <div className="col-span-3 text-right">Poin Masuk</div>
              </div>

              {/* Table rows */}
              <div className="divide-y divide-ink/5">
                {riwayatData.slice(0, 5).map((r, i) => (
                  <div
                    key={i}
                    className="eco-riwayat-row grid grid-cols-12 items-center gap-2 py-4 transition-colors hover:bg-cream/40"
                  >
                    <div className="col-span-3">
                      <p className="text-sm font-medium text-ink">
                        {r.tanggal}
                      </p>
                      <p className="text-xs text-ink/45">{r.jam}</p>
                    </div>
                    <div className="col-span-4 flex items-center gap-2">
                      {r.tipe === "house" ? (
                        <HouseIcon />
                      ) : (
                        <StoreIcon />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">
                          {r.lokasi}
                        </p>
                        <p className="text-xs text-ink/45">{r.kota}</p>
                      </div>
                    </div>
                    <div className="col-span-2 text-right text-sm text-ink/70">
                      {r.liter}
                    </div>
                    <div className="col-span-3 text-right font-display text-base font-bold text-maroon">
                      {r.poin}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Tukar Voucher ─── */}
            <div
              ref={voucherRef}
              className="reveal-on-scroll lg:col-span-7"
              style={{ transitionDelay: "0.15s" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-maroon sm:text-3xl">
                  Tukarkan Poin dengan
                  <br />
                  Voucher Diskon
                </h2>
                <button className="eco-lihat-semua group flex items-center gap-1.5 text-sm font-semibold text-maroon transition-colors hover:text-maroon-dark">
                  Lihat Semua
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              <p className="mt-3 text-sm text-ink/60">
                Tukar poin Anda dengan berbagai voucher menarik dari Nusaflo dan
                mitra kami.
              </p>

              {/* Voucher Cards Grid */}
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {VOUCHERS.map((v, i) => (
                  <div
                    key={v.id}
                    className="eco-voucher-card group overflow-hidden rounded-2xl border border-ink/10 bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-400"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {/* Top image area with bg-tukar-poin */}
                    <div className="relative flex items-center justify-center overflow-hidden py-8">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "url(/backgrounds/bg-tukar-poin.png)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
                      <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                        {v.icon === "percent" && <PercentVoucherIcon />}
                        {v.icon === "rupiah" && <RupiahVoucherIcon />}
                        {v.icon === "ongkir" && <OngkirVoucherIcon />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-display text-base font-bold text-maroon">
                        {v.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink/60">
                        {v.desc}
                      </p>

                      {/* Poin needed */}
                      <div className="mt-3 flex items-center gap-2 rounded-lg border border-ink/10 bg-cream/40 px-3 py-2">
                        <CoinsIcon className="h-4 w-4 text-maroon" />
                        <p className="text-xs text-ink/60">Tukar dengan</p>
                        <p className="ml-auto font-display text-sm font-bold text-maroon">
                          {v.poin}
                        </p>
                      </div>

                      {/* CTA */}
                      <button className="eco-voucher-btn group/btn mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-maroon px-4 py-2.5 text-sm font-medium text-cream transition-all duration-300 hover:bg-maroon-dark hover:shadow-md hover:shadow-maroon/20">
                        Tukar Poin
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Catatan */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-ink/10 bg-white/80 px-5 py-4 backdrop-blur-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon/10">
                  <InfoIcon className="text-maroon" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Catatan:</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink/60">
                    Voucher yang tersedia dapat berubah sewaktu-waktu. Voucher
                    akan dikirim ke akun Anda dan dapat digunakan saat checkout
                    di website Nusaflo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
