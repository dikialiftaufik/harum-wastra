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
  type ItemKeranjang,
} from "@/lib/keranjang";
import { formatRupiah } from "@/lib/data";
import { buatNomor, simpanPesanan, type Pesanan } from "@/lib/pesanan";

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

const ALAMAT_TERSIMPAN = {
  label: "Rumah",
  nama: "Diki Alif Taufik",
  telepon: "+62 812 3456 7890",
  jalan: "Jl. Melati No. 12, Rt 03/Rw 01, Kec. Coblong, Kota Bandung, Jawa Barat 40132",
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

  useEffect(() => {
    setItems(bacaKeranjang());
    setSiap(true);
  }, []);

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
    navigator.clipboard.writeText("123456789012");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  function konfirmasi() {
    const pesanan: Pesanan = {
      nomor: buatNomor(),
      waktu: new Date().toISOString(),
      items,
      nama: ALAMAT_TERSIMPAN.nama,
      telepon: ALAMAT_TERSIMPAN.telepon,
      alamat: ALAMAT_TERSIMPAN.jalan,
      kota: "Bandung",
      kodepos: "40132",
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
    localStorage.removeItem("nusaflo-keranjang");
    router.push("/pesanan/berhasil");
  }

  if (!siap) return null;

  /* ── Empty cart ── */
  if (items.length === 0) {
    return (
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden reveal-up"
        style={{
          backgroundImage: "url(/backgrounds/bg-beranda-hero-section.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/90 to-cream/60" />
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(/motif/sekar-jagad.png)", backgroundSize: "120px", backgroundRepeat: "repeat" }}
          aria-hidden="true"
        />
        <div className="relative z-10 text-center px-5">
          <h1 className="text-3xl text-maroon sm:text-4xl font-display">Keranjang kosong</h1>
          <p className="mt-4 text-ink/70 max-w-md mx-auto">
            Belum ada produk di keranjang. Pilih buket atau souvenir dan tentukan motif batiknya.
          </p>
          <Link
            href="/katalog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-4 text-base font-medium text-cream transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20"
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
    <section className="checkout-page min-h-screen pb-20 reveal-up" style={{ backgroundImage: "url(/backgrounds/bg-tukar-poin.png)", backgroundSize: "cover", backgroundPosition: "top center" }}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/98 via-cream/95 to-cream/80" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(/motif/kawung.png)", backgroundSize: "100px", backgroundRepeat: "repeat" }} aria-hidden="true" />

      {/* ━━ Header ━━ */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-16 pt-20 pb-12">
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
          <div className="flex-shrink-0 w-full lg:w-[340px] reveal-stagger-2 checkout-stepper-anim">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-4 left-10 right-10 h-[2px] bg-ink/15 -z-10" />
              <div className="absolute top-4 left-10 right-10 h-[2px] bg-maroon -z-10" style={{ width: `${step === 1 ? 0 : step === 2 ? '50%' : '100%'}` }} />

              <div className="flex items-start justify-between">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= 1 ? "bg-maroon text-cream shadow-[0_0_0_4px_rgba(123,33,46,0.15)]" : "bg-ink/20 text-ink/30"}`}>
                    {step > 1 ? <IconCheck /> : "1"}
                  </div>
                  <span className="mt-2 text-xs font-medium text-center max-w-[70px] text-ink/60">Informasi</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= 2 ? "bg-maroon text-cream shadow-[0_0_0_4px_rgba(123,33,46,0.15)]" : "bg-ink/20 text-ink/30"}`}>
                    {step > 2 ? <IconCheck /> : "2"}
                  </div>
                  <span className="mt-2 text-xs font-medium text-center max-w-[70px] text-ink/60">Pembayaran</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-ink/20 text-ink/30">
                    3
                  </div>
                  <span className="mt-2 text-xs font-medium text-center max-w-[70px] text-ink/40">Selesai</span>
                </div>
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
                <div className="reveal-on-scroll reveal-stagger-3 rounded-2xl bg-white/80 p-6 md:p-8 shadow-sm checkout-card backdrop-blur-sm border border-ink/5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-maroon p-2 bg-maroon/10 rounded-lg"><IconPin /></span>
                      <h2 className="text-lg font-semibold text-ink">1. Alamat Pengiriman</h2>
                    </div>
                    <button className="text-xs text-ink/50 flex items-center gap-1 hover:text-ink transition-colors">
                      Pilih alamat tersimpan
                      <IconChevronRight />
                    </button>
                  </div>

                  {/* Saved address (selected) */}
                  <div className="rounded-xl border-2 border-maroon/40 bg-maroon/[0.02] p-4 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1"><div className={radioDot(true)} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-ink">{ALAMAT_TERSIMPAN.label}</p>
                          <button className="text-xs text-maroon border border-maroon/30 rounded-full px-4 py-1 hover:bg-maroon/5 transition-colors">
                            Ubah
                          </button>
                        </div>
                        <p className="text-sm text-ink mt-1">{ALAMAT_TERSIMPAN.nama}</p>
                        <p className="text-sm text-ink/60">{ALAMAT_TERSIMPAN.telepon}</p>
                        <p className="text-sm text-ink/60 mt-0.5">{ALAMAT_TERSIMPAN.jalan}</p>
                      </div>
                    </div>
                  </div>

                  {/* Add new address */}
                  <div className="rounded-xl border border-ink/10 p-4 flex items-center gap-3 hover:border-ink/25 transition-colors cursor-pointer group">
                    <div className={radioDot(false)} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">Tambah alamat baru</p>
                      <p className="text-xs text-ink/50">Simpan alamat lain untuk pemesanan berikutnya</p>
                    </div>
                    <IconChevronRight className="text-ink/25 group-hover:text-ink/50 transition-colors" />
                  </div>
                </div>

                {/* ── 2. Metode Pengiriman ── */}
                <div className="reveal-on-scroll reveal-stagger-4 rounded-2xl bg-white/80 p-6 md:p-8 shadow-sm checkout-card backdrop-blur-sm border border-ink/5">
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

                {/* ── 3. Ringkasan Produk ── */}
                <div className="reveal-on-scroll reveal-stagger-5 rounded-2xl bg-white/80 p-6 md:p-8 shadow-sm checkout-card backdrop-blur-sm border border-ink/5">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-maroon p-2 bg-maroon/10 rounded-lg"><IconCart /></span>
                    <h2 className="text-lg font-semibold text-ink">3. Ringkasan Produk</h2>
                  </div>
                  <div className="space-y-3">
                    {items.map((it, idx) => (
                      <div
                        key={it.key}
                        className={`flex gap-3 py-3 ${idx < items.length - 1 ? "border-b border-ink/5" : ""}`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream flex-shrink-0 relative">
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage: `url(${it.pita})`,
                              backgroundSize: "40px",
                              backgroundRepeat: "repeat",
                            }}
                            aria-hidden="true"
                          />
                          <Image src={it.gambar} alt={it.nama} fill className="object-cover mt-1" sizes="64px" />
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
                          <div className="flex items-end justify-between mt-1">
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
                </div>

                {/* CTA to step 2 */}
                <div className="reveal-on-scroll reveal-stagger-6">
                  <button
                    onClick={goToPayment}
                    className="w-full rounded-full bg-maroon px-8 py-4 text-cream font-medium text-base transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20 flex items-center justify-center gap-2 checkout-cta"
                  >
                    Lanjut ke Pembayaran
                    <IconChevronRight />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* ── Metode Pembayaran ── */}
                <div className="reveal-on-scroll reveal-stagger-3 rounded-2xl bg-white/80 p-6 md:p-8 shadow-sm checkout-card backdrop-blur-sm border border-ink/5">
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
                              <img src={b.logo} alt={b.label} className="h-8 w-auto object-contain" loading="lazy" />
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
                <div className="reveal-on-scroll reveal-stagger-4 rounded-2xl bg-white/80 p-6 md:p-8 shadow-sm checkout-card backdrop-blur-sm border border-ink/5">
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
                      <p className="text-sm font-semibold text-ink">PT Nusaflo Indonesia</p>
                    </div>
                  </div>
                </div>

                {/* ── Disclaimer ── */}
                <div className="reveal-on-scroll reveal-stagger-5 rounded-2xl bg-maroon/[0.04] border border-maroon/15 p-5 flex gap-3 items-start checkout-card">
                  <span className="text-maroon flex-shrink-0 mt-0.5"><IconInfo /></span>
                  <div>
                    <p className="text-sm font-semibold text-maroon">Ini masih simulasi pembayaran</p>
                    <p className="text-sm text-ink/60 mt-1 leading-relaxed">
                      Setelah Anda mengonfirmasi pembayaran, tim Nusaflo akan memverifikasi
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
              <div className="reveal-on-scroll reveal-stagger-3 rounded-2xl bg-white/80 p-6 shadow-sm checkout-card backdrop-blur-sm border border-ink/5">
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
                            backgroundImage: `url(${it.pita})`,
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
                  <span className="text-xl font-bold text-maroon font-mono">{formatRupiah(total)}</span>
                </div>
              </div>

              {/* Step 1 CTA inside card */}
              {step === 1 && (
                <div className="reveal-on-scroll reveal-stagger-4">
                  <button
                    onClick={goToPayment}
                    className="w-full rounded-full bg-maroon px-8 py-4 text-cream font-medium text-base transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20 flex items-center justify-center gap-2 checkout-cta"
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
                        Setiap pembelian Nusaflo mendukung pengelolaan minyak jelantah dan
                        mengurangi sampah plastik menjadi hadiah yang bernilai.
                      </p>
                    </div>
                  </div>

                  {/* Confirm button */}
                  <div className="reveal-on-scroll reveal-stagger-5">
                    <button
                      onClick={konfirmasi}
                      className="w-full rounded-full bg-maroon px-8 py-4 text-cream font-medium text-base transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20 flex items-center justify-center gap-2 checkout-cta"
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
  );
}