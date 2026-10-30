"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  bacaKeranjang,
  ubahQty,
  hapusItem,
  totalKeranjang,
  kosongkanKeranjang,
  type ItemKeranjang,
} from "@/lib/keranjang";
import { formatRupiah, tileMotif } from "@/lib/data";
import { buatNomor, simpanPesanan, type Pesanan } from "@/lib/pesanan";
import {
  bacaAlamat,
  buatIdAlamat,
  simpanDaftarAlamat,
  validasiAlamat,
  type Alamat,
  type GalatAlamat,
} from "@/lib/alamat";
import { GambarLatar } from "@/components/GambarLatar";
import { MotifTile } from "@/components/MotifTile";
import { Dialog } from "@/components/Dialog";
import { aktifkanReveal } from "@/lib/reveal";

/* ─── Constants ─── */

const BIAYA_LAYANAN = 2500;

const PENGIRIMAN = [
  { id: "reguler", label: "Reguler", estimasi: "Estimasi tiba 2–4 hari", harga: 0 },
  { id: "instan", label: "Instan", estimasi: "Estimasi tiba 1–2 hari", harga: 15000 },
] as const;

const METODE_BAYAR = [
  { id: "transfer", label: "Transfer Bank", desc: "BCA, BNI, BRI, Mandiri" },
  { id: "qris", label: "QRIS", desc: "Semua bank dalam satu QR" },
  { id: "ewallet", label: "E-Wallet", desc: "GoPay, OVO, Dana, ShopeePay" },
] as const;

const BANKS = [
  { id: "bca", label: "BCA", logo: "/graphics/bca.webp" },
  { id: "bni", label: "BNI", logo: "/graphics/bni.webp" },
  { id: "bri", label: "BRI", logo: "/graphics/bri.webp" },
  { id: "mandiri", label: "Mandiri", logo: "/graphics/mandiri.webp" },
] as const;

const ALAMAT_KOSONG: Omit<Alamat, "id"> = {
  label: "Rumah",
  nama: "",
  telepon: "",
  jalan: "",
  kota: "",
  kodepos: "",
};

type PengirimanId = (typeof PENGIRIMAN)[number]["id"];
type MetodeId = (typeof METODE_BAYAR)[number]["id"];
type BankId = (typeof BANKS)[number]["id"];

/* ─── Inline SVG Icons ─── */

const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const IconTruck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
);
const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
);
const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
);
const IconCreditCard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
);
const IconBank = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" /></svg>
);
const IconQR = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="8" height="8" rx="1" /><rect x="14" y="2" width="8" height="8" rx="1" /><rect x="2" y="14" width="8" height="8" rx="1" /><rect x="14" y="14" width="4" height="4" rx="0.5" /><path d="M22 14h-4v4" /><path d="M18 22v-4h4" /></svg>
);
const IconWallet = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12a2 2 0 0 0 2 2h14v-4" /><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" /></svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const IconCopy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
);
const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
const IconInfo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
);
const IconLeaf = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
);
const IconChevronRight = ({ className = "" }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6" /></svg>
);
const IconChevronLeft = ({ className = "" }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6" /></svg>
);

function paymentIcon(id: string) {
  if (id === "transfer") return <IconBank />;
  if (id === "qris") return <IconQR />;
  return <IconWallet />;
}

const radioDot = (active: boolean) =>
  `w-5 h-5 rounded-full flex-shrink-0 transition-all ${active ? "border-[5px] border-maroon" : "border-2 border-ink/20"}`;

const radioSmall = (active: boolean) =>
  `w-4 h-4 rounded-full flex-shrink-0 transition-all ${active ? "border-[4px] border-maroon" : "border-2 border-ink/20"}`;

/* ─── Field alamat (dipakai di dialog tambah/ubah alamat) ─── */

function KolomAlamat({
  id,
  label,
  nilai,
  onChange,
  galat,
  placeholder,
  inputMode,
  maxLength,
  wajib = true,
}: {
  id: string;
  label: string;
  nilai: string;
  onChange: (v: string) => void;
  galat?: string;
  placeholder: string;
  inputMode?: "text" | "tel" | "numeric";
  maxLength?: number;
  wajib?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">
        {label}
        {wajib && <span className="text-maroon"> *</span>}
      </label>
      <input
        id={id}
        value={nilai}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={Boolean(galat)}
        aria-describedby={galat ? `${id}-galat` : undefined}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 ${
          galat
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-ink/15 focus:border-maroon/50 focus:ring-maroon/10"
        }`}
      />
      {galat && (
        <p id={`${id}-galat`} className="mt-1 text-xs text-red-600">
          {galat}
        </p>
      )}
    </div>
  );
}

/* ─── Main Component ─── */

export default function Keranjang() {
  const router = useRouter();
  const [items, setItems] = useState<ItemKeranjang[]>([]);
  const [siap, setSiap] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [pengiriman, setPengiriman] = useState<PengirimanId>("reguler");
  const [metodeBayar, setMetodeBayar] = useState<MetodeId>("transfer");
  const [bank, setBank] = useState<BankId>("bca");
  const [copied, setCopied] = useState(false);

  /* Alamat pengiriman */
  const [daftarAlamat, setDaftarAlamat] = useState<Alamat[]>([]);
  const [alamatId, setAlamatId] = useState("utama");
  const [dialogAlamat, setDialogAlamat] = useState<
    null | { mode: "pilih" } | { mode: "form"; data: Omit<Alamat, "id">; id: string | null }
  >(null);
  const [galatAlamat, setGalatAlamat] = useState<GalatAlamat>({});

  useEffect(() => {
    setItems(bacaKeranjang());
    const alamat = bacaAlamat();
    setDaftarAlamat(alamat);
    setAlamatId(alamat[0]?.id ?? "utama");
    setSiap(true);
  }, []);

  const alamatTerpilih =
    daftarAlamat.find((a) => a.id === alamatId) ?? daftarAlamat[0];

  /* Animasi muncul untuk kartu checkout (diulang saat ganti langkah). */
  useEffect(() => {
    return aktifkanReveal();
  }, [siap, step]);

  const subtotal = totalKeranjang(items);
  const ongkirVal = PENGIRIMAN.find((p) => p.id === pengiriman)?.harga ?? 0;
  const total = subtotal + ongkirVal + BIAYA_LAYANAN;
  const itemCount = items.reduce((a, b) => a + b.qty, 0);
  const ongkirLabel = pengiriman === "reguler" ? "Reguler" : "Instan";

  function handleQty(key: string, delta: number) {
    setItems(ubahQty(key, delta));
  }
  function handleHapus(key: string) {
    setItems(hapusItem(key));
  }
  function goToPayment() {
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function goToInfo() {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function copyNorek() {
    const norek = "123456789012";
    const cadangan = () => {
      // Peramban tanpa izin clipboard: tetap beri umpan balik agar tombol tidak diam.
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(norek).then(cadangan).catch(cadangan);
    } else {
      cadangan();
    }
  }

  /* ─── Alamat ─── */

  function bukaFormAlamat(data?: Alamat) {
    setGalatAlamat({});
    setDialogAlamat(
      data
        ? { mode: "form", id: data.id, data: { ...data } }
        : { mode: "form", id: null, data: { ...ALAMAT_KOSONG } }
    );
  }

  function simpanFormAlamat() {
    if (dialogAlamat?.mode !== "form") return;
    const galat = validasiAlamat(dialogAlamat.data);
    setGalatAlamat(galat);
    if (Object.keys(galat).length > 0) return;

    const dataBersih = {
      ...dialogAlamat.data,
      label: dialogAlamat.data.label.trim() || "Rumah",
      nama: dialogAlamat.data.nama.trim(),
      telepon: dialogAlamat.data.telepon.trim(),
      jalan: dialogAlamat.data.jalan.trim(),
      kota: dialogAlamat.data.kota.trim(),
      kodepos: dialogAlamat.data.kodepos.trim(),
    };

    let berikutnya: Alamat[];
    if (dialogAlamat.id) {
      berikutnya = daftarAlamat.map((a) =>
        a.id === dialogAlamat.id ? { ...dataBersih, id: a.id } : a
      );
    } else {
      const baru: Alamat = { ...dataBersih, id: buatIdAlamat() };
      berikutnya = [...daftarAlamat, baru];
      setAlamatId(baru.id);
    }

    simpanDaftarAlamat(berikutnya);
    setDaftarAlamat(berikutnya);
    setDialogAlamat(null);
  }

  function hapusAlamatTerdaftar(id: string) {
    if (daftarAlamat.length <= 1) return;
    const berikutnya = daftarAlamat.filter((a) => a.id !== id);
    simpanDaftarAlamat(berikutnya);
    setDaftarAlamat(berikutnya);
    if (alamatId === id) setAlamatId(berikutnya[0].id);
  }

  function ubahFieldAlamat(field: keyof Omit<Alamat, "id">, nilai: string) {
    // Pembaruan fungsional supaya isian terakhir tidak pernah tertinggal
    // walau pengguna mengetik lalu langsung menekan "Simpan alamat".
    setDialogAlamat((sebelum) =>
      sebelum?.mode === "form"
        ? { ...sebelum, data: { ...sebelum.data, [field]: nilai } }
        : sebelum
    );
    setGalatAlamat((sebelum) =>
      sebelum[field] ? { ...sebelum, [field]: undefined } : sebelum
    );
  }

  function konfirmasi() {
    const tujuan = alamatTerpilih;
    if (!tujuan) return;

    const pesanan: Pesanan = {
      nomor: buatNomor(),
      waktu: new Date().toISOString(),
      items,
      nama: tujuan.nama,
      telepon: tujuan.telepon,
      alamat: tujuan.jalan,
      kota: tujuan.kota,
      kodepos: tujuan.kodepos,
      catatan: "",
      metode:
        metodeBayar === "transfer"
          ? `Transfer Bank – ${bank.toUpperCase()}`
          : metodeBayar.toUpperCase(),
      subtotal,
      ongkir: ongkirVal,
      total,
    };
    simpanPesanan(pesanan);
    kosongkanKeranjang();
    router.push("/pesanan/berhasil");
  }

  if (!siap) {
    // Kerangka seukuran halaman asli: pengguna melihat judul dan struktur
    // halaman, bukan layar kosong, selama data peramban dibaca.
    return (
      <section className="page-top min-h-[70vh] bg-cream pb-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16">
          <p className="eyebrow text-ink/60">Checkout</p>
          <h1 className="mt-2 font-display text-3xl italic leading-tight text-maroon sm:text-4xl">
            Lengkapi Pesanan Anda
          </h1>
          <p className="mt-3 max-w-lg text-ink/65">
            Pastikan semua detail sudah sesuai sebelum melanjutkan ke pembayaran.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-4">
              <div className="h-44 animate-pulse rounded-2xl bg-white/70" />
              <div className="h-44 animate-pulse rounded-2xl bg-white/70" />
            </div>
            <div className="h-80 animate-pulse rounded-2xl bg-white/70" />
          </div>
        </div>
      </section>
    );
  }

  /* ── Empty cart ── */
  if (items.length === 0) {
    return (
      <section className="page-top relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-cream pb-16 reveal-up">
        <GambarLatar src="/backgrounds/bg-beranda-hero-section.png" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-cream/95 via-cream/90 to-cream/60" />
        <MotifTile id="sekar-jagad" ukuran={120} className="z-[1] opacity-10" />
        <div className="relative z-10 px-5 text-center">
          <h1 className="text-3xl text-maroon sm:text-4xl font-display">Keranjang kosong</h1>
          <p className="mt-4 text-ink/75 max-w-md mx-auto">
            Belum ada produk di keranjang. Pilih buket atau souvenir dan tentukan motif batiknya.
          </p>
          <Link
            href="/katalog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20"
          >
            Lihat Katalog
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
      </section>
    );
  }

  /* ── Checkout Page ── */
  return (
    <>
    <section className="checkout-page relative min-h-screen bg-cream pb-20 reveal-up">
      {/* ━━ Header ━━ */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16 pt-28 sm:pt-32 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Title */}
          <div className="checkout-header-text reveal-stagger-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink/40">
              Checkout
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl text-maroon font-display italic leading-tight">
              {step === 1 ? "Lengkapi Pesanan Anda" : "Selesaikan pembayaran"}
            </h1>
            <p className="mt-3 text-ink/60 max-w-lg">
              {step === 1
                ? "Pastikan semua detail sudah sesuai sebelum melanjutkan ke pembayaran."
                : "Pilih metode pembayaran dan ikuti instruksi yang tersedia untuk menyelesaikan pesanan Anda."}
            </p>
          </div>

          {/* ━━ Stepper ━━ */}
          <div className="w-full flex-shrink-0 lg:w-[360px] reveal-stagger-2">
            <div className="relative">
              {/* Rail: spans from first circle centre to last circle centre */}
              <div className="absolute left-[16.6667%] right-[16.6667%] top-4 h-[2px] -translate-y-1/2 bg-ink/15" />
              <div
                className="absolute left-[16.6667%] top-4 h-[2px] -translate-y-1/2 bg-maroon transition-all duration-500"
                style={{ width: step === 2 ? "33.3333%" : "0%" }}
              />

              <div className="grid grid-cols-3">
                {["Informasi", "Pembayaran", "Selesai"].map((label, i) => {
                  const nomor = i + 1;
                  return (
                    <div key={label} className="flex flex-col items-center">
                      <div
                        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors duration-300 ${
                          step >= nomor
                            ? "border-maroon bg-maroon text-white"
                            : "border-ink/20 bg-cream text-ink/40"
                        }`}
                      >
                        {step > nomor ? <IconCheck /> : nomor}
                      </div>
                      <span
                        className={`mt-2 text-xs ${
                          step === nomor ? "font-semibold text-maroon" : "text-ink/50"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ━━ Two-column content ━━ */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16 pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

          {/* ━━ LEFT COLUMN ━━ */}
          <div className="space-y-6">
            {step === 1 ? (
              <>
                {/* ── 1. Alamat Pengiriman ── */}
                <div className="reveal-on-scroll reveal-stagger-3 rounded-2xl border border-ink/5 bg-white p-6 shadow-sm md:p-8 checkout-card">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-maroon p-2 bg-maroon/10 rounded-lg"><IconPin /></span>
                      <h2 className="text-lg font-semibold text-ink">1. Alamat Pengiriman</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDialogAlamat({ mode: "pilih" })}
                      className="flex items-center gap-1 text-xs text-ink/60 transition-colors hover:text-maroon"
                    >
                      {daftarAlamat.length > 1 ? "Pilih alamat tersimpan" : "Kelola alamat"}
                      <IconChevronRight />
                    </button>
                  </div>

                  {/* Saved address (selected) */}
                  <div className="mb-3 rounded-xl border-2 border-maroon/40 bg-maroon/[0.02] p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1"><div className={radioDot(true)} /></div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-ink">
                            {alamatTerpilih?.label ?? "Rumah"}
                          </p>
                          <button
                            type="button"
                            onClick={() => alamatTerpilih && bukaFormAlamat(alamatTerpilih)}
                            className="rounded-full border border-maroon/30 px-4 py-1 text-xs text-maroon transition-colors hover:bg-maroon/5"
                          >
                            Ubah
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-ink">
                          {alamatTerpilih?.nama ?? "-"}
                        </p>
                        <p className="text-sm text-ink/65">
                          {alamatTerpilih?.telepon ?? "-"}
                        </p>
                        <p className="mt-0.5 text-sm text-ink/65">
                          {alamatTerpilih?.jalan ?? "-"}
                        </p>
                        <p className="text-sm text-ink/65">
                          {alamatTerpilih
                            ? `${alamatTerpilih.kota} ${alamatTerpilih.kodepos}`
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Add new address */}
                  <button
                    type="button"
                    onClick={() => bukaFormAlamat()}
                    className="group flex w-full items-center gap-3 rounded-xl border border-ink/10 p-4 text-left transition-colors hover:border-ink/25"
                  >
                    <div className={radioDot(false)} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">Tambah alamat baru</p>
                      <p className="text-xs text-ink/60">Simpan alamat lain untuk pemesanan berikutnya</p>
                    </div>
                    <IconChevronRight className="text-ink/25 transition-colors group-hover:text-ink/50" />
                  </button>
                  <div className="my-6 border-t border-ink/10" />

                  {/* ── 2. Metode Pengiriman ── */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-maroon p-2 bg-maroon/10 rounded-lg"><IconTruck /></span>
                    <h2 className="text-lg font-semibold text-ink">2. Metode Pengiriman</h2>
                  </div>

                  <div className="space-y-3">
                    {PENGIRIMAN.map((p) => (
                      <label
                        key={p.id}
                        className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                          pengiriman === p.id
                            ? "border-maroon/40 bg-maroon/[0.02]"
                            : "border-ink/10 hover:border-ink/20"
                        }`}
                      >
                        <div className={radioDot(pengiriman === p.id)} />
                        <input type="radio" name="pengiriman" value={p.id} checked={pengiriman === p.id} onChange={() => setPengiriman(p.id)} className="sr-only" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-ink">{p.label}</p>
                          <p className="text-xs text-ink/50">{p.estimasi}</p>
                        </div>
                        <span className={`text-sm font-semibold ${p.harga === 0 ? "text-emerald-600" : "text-ink"}`}>
                          {p.harga === 0 ? "Gratis" : formatRupiah(p.harga)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

              </>
            ) : (
              <>
                {/* ── Metode Pembayaran ── */}
                <div className="reveal-on-scroll reveal-stagger-3 rounded-2xl border border-ink/5 bg-white p-6 shadow-sm md:p-8 checkout-card">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-maroon p-2 bg-maroon/10 rounded-lg"><IconCreditCard /></span>
                    <h2 className="text-lg font-semibold text-ink">Metode Pembayaran</h2>
                  </div>

                  {/* Payment type cards */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {METODE_BAYAR.map((m) => (
                      <label
                        key={m.id}
                        className={`rounded-xl border-2 p-4 cursor-pointer transition-all text-center h-full flex flex-col items-center justify-center ${
                          metodeBayar === m.id
                            ? "border-maroon/40 bg-maroon/[0.02]"
                            : "border-ink/10 hover:border-ink/20"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`mt-0.5 ${radioSmall(metodeBayar === m.id)}`} />
                          <input type="radio" name="metodeBayar" value={m.id} checked={metodeBayar === m.id} onChange={() => setMetodeBayar(m.id)} className="sr-only" />
                          <div className="text-ink/50 mb-1">{paymentIcon(m.id)}</div>
                          <p className="font-semibold text-sm text-ink leading-snug">{m.label}</p>
                          <p className="text-[11px] text-ink/50 mt-0.5 leading-tight">{m.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Bank selection */}
                  {metodeBayar === "transfer" && (
                    <div className="border-t border-ink/10 pt-6">
                      <h3 className="font-semibold text-ink mb-4">Pilih Bank Tujuan</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {BANKS.map((b) => (
                          <label
                            key={b.id}
                            className={`rounded-xl border-2 p-3 cursor-pointer transition-all text-center ${
                              bank === b.id
                                ? "border-maroon/40 bg-maroon/[0.02]"
                                : "border-ink/10 hover:border-ink/20"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                              <div className={radioSmall(bank === b.id)} />
                              <Image src={b.logo} alt={b.label} width={80} height={40} className="h-8 w-auto object-contain" />
                            </div>
                            <input type="radio" name="bank" value={b.id} checked={bank === b.id} onChange={() => setBank(b.id)} className="sr-only" />
                            <span className="text-xs text-ink/60">{b.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Instruksi Pembayaran ── */}
                <div className="reveal-on-scroll reveal-stagger-4 rounded-2xl border border-ink/5 bg-white p-6 shadow-sm md:p-8 checkout-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-ink">Instruksi Pembayaran</h3>
                    <div className="flex items-center gap-1.5 text-ink/50">
                      <IconClock />
                      <span className="text-xs">
                        Selesaikan dalam <strong className="text-ink">23:59</strong>
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-[1fr_240px] gap-6">
                    {/* Steps */}
                    <ol className="space-y-5">
                      {[
                        "Transfer ke nomor rekening di bawah ini melalui ATM, m-banking, atau internet banking.",
                        "Pastikan nominal sesuai hingga 3 digit terakhir.",
                        'Setelah transfer, klik tombol "Konfirmasi Pembayaran". Tim kami akan memverifikasi dan menghubungi Anda melalui WhatsApp.',
                      ].map((text, i) => (
                        <li key={i} className="flex gap-3 text-sm text-ink/70">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-maroon/10 text-maroon flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{text}</span>
                        </li>
                      ))}
                    </ol>

                    {/* Account info */}
                    <div className="rounded-xl bg-[#f8f6f3] p-4 h-fit">
                      <p className="text-xs text-ink/50 mb-1">Nomor Rekening</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-mono font-bold text-maroon tracking-wider">
                          1234 5678 9012
                        </p>
                        <button
                          onClick={copyNorek}
                          className="text-ink/30 hover:text-maroon transition-colors"
                          title="Salin nomor rekening"
                        >
                          {copied ? <IconCheck /> : <IconCopy />}
                        </button>
                      </div>
                      <p className="text-xs text-ink/50 mt-3 mb-0.5">Atas Nama</p>
                      <p className="text-sm font-semibold text-ink">PT Harum Wastra Indonesia</p>
                    </div>
                  </div>
                </div>

                {/* ── Disclaimer ── */}
                <div className="reveal-on-scroll reveal-stagger-5 rounded-2xl bg-maroon/[0.04] border border-maroon/15 p-5 flex gap-3 items-start checkout-card">
                  <span className="text-maroon flex-shrink-0 mt-0.5"><IconInfo /></span>
                  <div>
                    <p className="text-sm font-semibold text-maroon">Ini masih simulasi pembayaran</p>
                    <p className="text-sm text-ink/60 mt-1 leading-relaxed">
                      Setelah Anda mengonfirmasi pembayaran, tim Harum Wastra akan memverifikasi
                      secara manual dan melanjutkan proses pesanan melalui WhatsApp.
                    </p>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* ━━ RIGHT COLUMN: Order Summary ━━ */}
          <div>
            <div className="sticky top-28 space-y-5">
              {/* Summary card */}
              <div className="reveal-on-scroll reveal-stagger-3 rounded-2xl border border-ink/5 bg-white p-6 shadow-sm checkout-card">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-maroon p-2 bg-maroon/10 rounded-lg"><IconCart /></span>
                    <h2 className="text-lg font-semibold text-ink">Ringkasan Pesanan</h2>
                  </div>
                  <span className="text-xs text-ink/50">{itemCount} produk</span>
                </div>

                {/* Product list */}
                <div className="space-y-0 mb-5">
                  {items.map((it, idx) => (
                    <div
                      key={it.key}
                      className={`flex gap-3 py-4 ${idx < items.length - 1 ? "border-b border-ink/5" : ""}`}
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-cream flex-shrink-0 relative">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url(${tileMotif(it.pita)})`,
                            backgroundSize: "40px",
                            backgroundRepeat: "repeat",
                          }}
                          aria-hidden="true"
                        />
                        <Image src={it.gambar} alt={it.nama} fill className="object-cover mt-1" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-sm text-ink truncate">{it.nama}</p>
                            <p className="text-xs text-ink/50">Motif: {it.motifNama}</p>
                          </div>
                          <button
                            onClick={() => handleHapus(it.key)}
                            className="text-ink/25 hover:text-maroon transition-colors p-1"
                            title="Hapus"
                          >
                            <IconTrash />
                          </button>
                        </div>
                        <div className="flex items-end justify-between mt-2">
                          <p className="text-sm font-semibold text-maroon">{formatRupiah(it.harga)}</p>
                          <div className="flex items-center border border-ink/15 rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleQty(it.key, -1)}
                              className="w-8 h-8 flex items-center justify-center text-ink/50 hover:bg-ink/5 transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-sm font-medium text-ink border-x border-ink/15">
                              {it.qty}
                            </span>
                            <button
                              onClick={() => handleQty(it.key, 1)}
                              className="w-8 h-8 flex items-center justify-center text-ink/50 hover:bg-ink/5 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="space-y-2.5 text-sm border-t border-ink/10 pt-4">
                  <div className="flex justify-between">
                    <span className="text-ink/60">Subtotal Produk</span>
                    <span className="font-medium text-ink">{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/60">Ongkos Kirim ({ongkirLabel})</span>
                    <span className={`font-medium ${ongkirVal === 0 ? "text-emerald-600" : "text-ink"}`}>
                      {ongkirVal === 0 ? "Gratis" : formatRupiah(ongkirVal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/60 flex items-center gap-1">
                      Biaya Layanan
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink/30"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                    </span>
                    <span className="font-medium text-ink">{formatRupiah(BIAYA_LAYANAN)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline border-t border-ink/10 pt-4 mt-4">
                  <span className="font-semibold text-ink">Total Pembayaran</span>
                  <span className="font-mono text-2xl font-bold text-maroon sm:text-3xl">{formatRupiah(total)}</span>
                </div>
              </div>

              {/* Step 1 CTA inside card */}
              {step === 1 && (
                <div className="reveal-on-scroll reveal-stagger-4">
                  <button
                    onClick={goToPayment}
                    className="w-full rounded-full bg-maroon px-8 py-4 text-white font-medium text-base transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20 flex items-center justify-center gap-2 checkout-cta"
                  >
                    Lanjut ke Pembayaran
                    <IconChevronRight />
                  </button>
                </div>
              )}

              {/* Step 2: eco impact + CTA outside the summary card */}
              {step === 2 && (
                <>
                  {/* Eco impact */}
                  <div className="reveal-on-scroll reveal-stagger-4 rounded-2xl bg-maroon/[0.04] border border-maroon/15 p-4 flex gap-3 items-start checkout-card">
                    <span className="text-maroon flex-shrink-0 mt-0.5"><IconLeaf /></span>
                    <div>
                      <p className="text-sm font-semibold text-maroon">Dampak baik dari pesanan ini</p>
                      <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                        Setiap pembelian Harum Wastra mendukung pengelolaan minyak jelantah dan
                        mengurangi sampah plastik menjadi hadiah yang bernilai.
                      </p>
                    </div>
                  </div>

                  {/* Confirm button */}
                  <div className="reveal-on-scroll reveal-stagger-5">
                    <button
                      onClick={konfirmasi}
                      className="w-full rounded-full bg-maroon px-8 py-4 text-white font-medium text-base transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20 flex items-center justify-center gap-2 checkout-cta"
                    >
                      Konfirmasi Pembayaran
                      <IconChevronRight />
                    </button>
                  </div>

                  {/* Back link */}
                  <div className="reveal-on-scroll reveal-stagger-6">
                    <button
                      onClick={goToInfo}
                      className="w-full text-center text-sm text-ink/50 hover:text-maroon transition-colors flex items-center justify-center gap-1.5"
                    >
                      <IconChevronLeft />
                      Kembali ke Informasi
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>

      {/* ─── Dialog alamat ─── */}
      <Dialog
        buka={dialogAlamat !== null}
        onTutup={() => setDialogAlamat(null)}
        judul={
          dialogAlamat?.mode === "form"
            ? dialogAlamat.id
              ? "Ubah alamat"
              : "Tambah alamat baru"
            : "Pilih alamat pengiriman"
        }
        deskripsi={
          dialogAlamat?.mode === "form"
            ? "Alamat ini dipakai sebagai tujuan pengiriman pesanan Anda."
            : "Pilih salah satu alamat, atau tambahkan alamat baru."
        }
        aksi={
          dialogAlamat?.mode === "form" ? (
            <>
              <button
                type="button"
                onClick={simpanFormAlamat}
                className="inline-flex items-center justify-center rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark"
              >
                Simpan alamat
              </button>
              <button
                type="button"
                onClick={() =>
                  dialogAlamat.id
                    ? setDialogAlamat({ mode: "pilih" })
                    : setDialogAlamat(null)
                }
                className="inline-flex items-center justify-center rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink/75 transition-colors hover:border-maroon/30 hover:text-maroon"
              >
                {dialogAlamat.id ? "Kembali" : "Batal"}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => bukaFormAlamat()}
                className="inline-flex items-center justify-center rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark"
              >
                Tambah alamat baru
              </button>
              <button
                type="button"
                onClick={() => setDialogAlamat(null)}
                className="inline-flex items-center justify-center rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink/75 transition-colors hover:border-maroon/30 hover:text-maroon"
              >
                Tutup
              </button>
            </>
          )
        }
      >
        <div className="mt-5 text-left">
          {dialogAlamat?.mode === "pilih" ? (
            <ul className="space-y-3">
              {daftarAlamat.map((a) => (
                <li
                  key={a.id}
                  className={`rounded-xl border-2 p-4 transition-colors ${
                    a.id === alamatId
                      ? "border-maroon/40 bg-maroon/[0.02]"
                      : "border-ink/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setAlamatId(a.id);
                        setDialogAlamat(null);
                      }}
                      aria-pressed={a.id === alamatId}
                      className="flex flex-1 items-start gap-3 text-left"
                    >
                      <span className="mt-0.5">
                        <span className={radioDot(a.id === alamatId)} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-ink">
                          {a.label} · {a.nama}
                        </span>
                        <span className="block text-xs text-ink/65">
                          {a.telepon}
                        </span>
                        <span className="block text-xs text-ink/65">
                          {a.jalan}, {a.kota} {a.kodepos}
                        </span>
                      </span>
                    </button>
                    <div className="flex shrink-0 flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => bukaFormAlamat(a)}
                        className="rounded-full border border-maroon/30 px-3 py-1 text-xs text-maroon transition-colors hover:bg-maroon/5"
                      >
                        Ubah
                      </button>
                      {daftarAlamat.length > 1 && (
                        <button
                          type="button"
                          onClick={() => hapusAlamatTerdaftar(a.id)}
                          className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/60 transition-colors hover:border-red-300 hover:text-red-600"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            dialogAlamat?.mode === "form" && (
              <div className="space-y-3">
                <KolomAlamat
                  id="alamat-label"
                  label="Label alamat"
                  nilai={dialogAlamat.data.label}
                  onChange={(v) => ubahFieldAlamat("label", v)}
                  placeholder="Rumah, Kantor, Kos"
                  maxLength={20}
                  wajib={false}
                />
                <KolomAlamat
                  id="alamat-nama"
                  label="Nama penerima"
                  nilai={dialogAlamat.data.nama}
                  onChange={(v) => ubahFieldAlamat("nama", v)}
                  galat={galatAlamat.nama}
                  placeholder="Nama lengkap"
                  maxLength={60}
                />
                <KolomAlamat
                  id="alamat-telepon"
                  label="Nomor telepon"
                  nilai={dialogAlamat.data.telepon}
                  onChange={(v) => ubahFieldAlamat("telepon", v)}
                  galat={galatAlamat.telepon}
                  placeholder="0812 3456 7890"
                  inputMode="tel"
                  maxLength={20}
                />
                <div>
                  <label
                    htmlFor="alamat-jalan"
                    className="mb-1 block text-sm font-medium text-ink"
                  >
                    Alamat lengkap<span className="text-maroon"> *</span>
                  </label>
                  <textarea
                    id="alamat-jalan"
                    rows={3}
                    value={dialogAlamat.data.jalan}
                    onChange={(e) => ubahFieldAlamat("jalan", e.target.value)}
                    placeholder="Jalan, nomor rumah, RT/RW, kecamatan"
                    aria-invalid={Boolean(galatAlamat.jalan)}
                    aria-describedby={galatAlamat.jalan ? "alamat-jalan-galat" : undefined}
                    className={`w-full resize-none rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 ${
                      galatAlamat.jalan
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-ink/15 focus:border-maroon/50 focus:ring-maroon/10"
                    }`}
                  />
                  {galatAlamat.jalan && (
                    <p id="alamat-jalan-galat" className="mt-1 text-xs text-red-600">
                      {galatAlamat.jalan}
                    </p>
                  )}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <KolomAlamat
                    id="alamat-kota"
                    label="Kota"
                    nilai={dialogAlamat.data.kota}
                    onChange={(v) => ubahFieldAlamat("kota", v)}
                    galat={galatAlamat.kota}
                    placeholder="Bandung"
                    maxLength={40}
                  />
                  <KolomAlamat
                    id="alamat-kodepos"
                    label="Kode pos"
                    nilai={dialogAlamat.data.kodepos}
                    onChange={(v) => ubahFieldAlamat("kodepos", v)}
                    galat={galatAlamat.kodepos}
                    placeholder="40132"
                    inputMode="numeric"
                    maxLength={5}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </Dialog>
    </>
  );
}