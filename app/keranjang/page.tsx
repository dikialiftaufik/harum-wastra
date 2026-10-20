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

const ONGKIR = 10000;

const METODE = [
  { id: "QRIS", label: "QRIS" },
  { id: "TRANSFER", label: "Transfer Bank", banks: ["BCA", "BRI", "BNI", "Mandiri"] },
  { id: "COD", label: "Bayar di Tempat" },
] as const;

type MetodeId = typeof METODE[number]["id"];

type Form = {
  nama: string;
  telepon: string;
  alamat: string;
  kota: string;
  kodepos: string;
  catatan: string;
};

const KOSONG: Form = {
  nama: "",
  telepon: "",
  alamat: "",
  kota: "",
  kodepos: "",
  catatan: "",
};

const inputKelas =
  "mt-1 w-full border-b border-ink/20 bg-transparent py-2 text-ink placeholder:text-clay/60 focus:border-maroon focus:outline-none";

export default function Keranjang() {
  const router = useRouter();
  const [items, setItems] = useState<ItemKeranjang[]>([]);
  const [siap, setSiap] = useState(false);
  const [form, setForm] = useState<Form>(KOSONG);
  const [metode, setMetode] = useState<MetodeId>(METODE[0].id);
  const [galat, setGalat] = useState("");

  useEffect(() => {
    setItems(bacaKeranjang());
    setSiap(true);
  }, []);

  const subtotal = totalKeranjang(items);
  const ongkir = items.length > 0 ? ONGKIR : 0;
  const total = subtotal + ongkir;

  function setField<K extends keyof Form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.nama ||
      !form.telepon ||
      !form.alamat ||
      !form.kota ||
      !form.kodepos
    ) {
      setGalat("Mohon lengkapi nama, nomor telepon, alamat, kota, dan kode pos.");
      return;
    }
    const pesanan: Pesanan = {
      nomor: buatNomor(),
      waktu: new Date().toISOString(),
      items,
      ...form,
      metode,
      subtotal,
      ongkir,
      total,
    };
    simpanPesanan(pesanan);
    localStorage.removeItem("nusaflo-keranjang");
    router.push("/pesanan/berhasil");
  }

  if (!siap) return null;

  if (items.length === 0) {
    return (
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden" style={{ backgroundImage: "url(/backgrounds/bg-beranda-hero-section.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/90 to-cream/60" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(/motif/sekar-jagad.png)", backgroundSize: "120px", backgroundRepeat: "repeat" }} aria-hidden="true" />
        <div className="relative z-10 text-center px-5">
          <h1 className="text-3xl text-maroon sm:text-4xl font-display">Keranjang kosong</h1>
          <p className="mt-4 text-ink/70 max-w-md mx-auto">Belum ada produk di keranjang. Pilih buket atau souvenir dan tentukan motif batiknya.</p>
          <Link href="/katalog" className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-4 text-base font-medium text-cream transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20">
            Lihat Katalog
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ─── Hero Checkout ─── */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden" style={{ backgroundImage: "url(/backgrounds/bg-tukar-poin.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-cream/95 via-cream/70 to-transparent" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(/motif/kawung.png)", backgroundSize: "100px", backgroundRepeat: "repeat" }} aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-16">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-maroon">Checkout</p>
            <h1 className="mt-2 text-3xl text-maroon sm:text-4xl font-display">Lengkapi detail pengiriman</h1>
            <p className="mt-3 text-ink/70">{items.length} produk · Total {formatRupiah(total)}</p>
          </div>
        </div>
      </section>

      {/* ─── Checkout Form Sections ─── */}
      <section className="relative py-16 md:py-24 bg-cream" style={{ backgroundImage: "url(/backgrounds/bg-tukar-poin.png)", backgroundSize: "cover", backgroundPosition: "top center" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(/motif/sekar-jagad.png)", backgroundSize: "120px", backgroundRepeat: "repeat" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-16 z-10">
          <form id="checkout" onSubmit={kirim} className="space-y-10">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Kolom Kiri: Informasi Pengiriman */}
              <div className="reveal-up reveal-stagger-1">
                <div className="rounded-2xl bg-white/70 p-6 md:p-8 backdrop-blur-sm shadow-sm border border-ink/5">
                  <h2 className="text-xl text-maroon font-display">Informasi Pengiriman</h2>
                  <p className="mt-2 text-sm text-ink/60">Data akan digunakan untuk pengiriman dan konfirmasi WhatsApp.</p>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wide text-clay">Nama Lengkap</label>
                      <input className={inputKelas} value={form.nama} onChange={(e) => setField("nama", e.target.value)} placeholder="Nama lengkap" required autoComplete="name" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wide text-clay">Nomor Telepon (WhatsApp)</label>
                      <input className={inputKelas} inputMode="tel" value={form.telepon} onChange={(e) => setField("telepon", e.target.value)} placeholder="08xxxxxxxxxx" required autoComplete="tel" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wide text-clay">Alamat Lengkap</label>
                      <textarea className={inputKelas + " min-h-24 resize-none"} value={form.alamat} onChange={(e) => setField("alamat", e.target.value)} placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan" required autoComplete="street-address" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-wide text-clay">Kota</label>
                        <input className={inputKelas} value={form.kota} onChange={(e) => setField("kota", e.target.value)} placeholder="Bandung" required autoComplete="address-level2" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wide text-clay">Kode Pos</label>
                        <input className={inputKelas} inputMode="numeric" value={form.kodepos} onChange={(e) => setField("kodepos", e.target.value)} placeholder="40111" required autoComplete="postal-code" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wide text-clay">Catatan untuk Kurir (opsional)</label>
                      <input className={inputKelas} value={form.catatan} onChange={(e) => setField("catatan", e.target.value)} placeholder="Misalnya: kirim setelah jam 14.00" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Ringkasan & Pembayaran */}
              <div className="reveal-up reveal-stagger-2">
                <div className="rounded-2xl bg-white/70 p-6 md:p-8 backdrop-blur-sm shadow-sm border border-ink/5 sticky top-24">
                  <h2 className="text-xl text-maroon font-display">Ringkasan Pesanan</h2>

                  {/* Item list ringkas */}
                  <dl className="mt-4 divide-y divide-ink/10 max-h-64 overflow-y-auto pr-2">
                    {items.map((it) => (
                      <div key={it.key} className="py-3 flex gap-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-white relative">
                          <div className="h-4" style={{ backgroundImage: `url(${it.pita})`, backgroundSize: "36px", backgroundRepeat: "repeat" }} aria-hidden="true" />
                          <Image src={it.gambar} alt={it.nama} fill className="object-cover mt-1" sizes="64px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-ink truncate">{it.nama}</p>
                          <p className="text-xs text-clay">Motif: {it.motifNama}</p>
                          <p className="text-sm font-mono text-maroon">{formatRupiah(it.harga)} × {it.qty}</p>
                        </div>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-ink/70">Subtotal ({items.reduce((a, b) => a + b.qty, 0)} item)</dt>
                      <dd className="font-mono">{formatRupiah(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink/70">Ongkos kirim <span className="font-normal text-xs text-clay">(estimasi)</span></dt>
                      <dd className="font-mono">{formatRupiah(ongkir)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-ink/10 pt-2 text-base">
                      <dt className="font-semibold text-maroon">Total</dt>
                      <dd className="font-mono text-maroon text-lg">{formatRupiah(total)}</dd>
                    </div>
                  </div>

                  {/* Metode Pembayaran */}
                  <fieldset className="mt-6">
                    <legend className="text-sm font-semibold text-ink">Metode Pembayaran</legend>
                    <div className="mt-3 space-y-2">
                      {METODE.map((m) => (
                        <label key={m.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                          metode === m.id
                            ? "border-maroon bg-maroon/5"
                            : "border-ink/15 hover:border-maroon/40"
                        }`}>
                          <input type="radio" name="metode" value={m.id} checked={metode === m.id} onChange={() => setMetode(m.id)} className="accent-maroon" />
                          <span className="text-sm font-medium">{m.label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Bank logos for transfer */}
                    {metode === "TRANSFER" && (
                      <div className="mt-3 pt-3 border-t border-ink/10">
                        <p className="text-xs text-clay mb-2">Pilih bank tujuan</p>
                        <div className="flex flex-wrap gap-2">
                          {["bca", "bri", "bni", "mandiri"].map((bank) => (
                            <img key={bank} src={`/graphics/${bank}.webp`} alt={bank.toUpperCase()} className="h-10 w-auto object-contain rounded-lg border border-ink/10 bg-white/50 p-1" loading="lazy" />
                          ))}
                        </div>
                      </div>
                    )}
                  </fieldset>

                  {/* Disclaimer */}
                  <p className="mt-5 rounded-xl bg-cream p-3 text-xs text-ink/70">
                    Pembayaran disimulasikan pada versi ini. Setelah pesanan dibuat,
                    pembayaran dikonfirmasi lewat WhatsApp. Tidak ada pembayaran yang
                    diproses di web ini.
                  </p>

                  {galat && <p className="mt-4 text-sm text-maroon" role="alert">{galat}</p>}

                  <button
                    type="submit"
                    form="checkout"
                    className="mt-6 w-full rounded-full bg-maroon px-8 py-4 text-cream font-medium transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
                  >
                    Buat Pesanan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="relative py-16 bg-maroon text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(/motif/truntum.png)", backgroundSize: "80px", backgroundRepeat: "repeat" }} aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8 z-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">Butuh bantuan?</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-display">Hubungi kami via WhatsApp</h2>
          <p className="mt-4 text-cream/75">Ada pertanyaan soal produk, motif batik, atau pengiriman? Tim Nusaflo siap membantu.</p>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-cream px-8 py-3.5 text-sm font-medium text-cream transition-all duration-300 hover:bg-cream hover:text-maroon">
            Chat WhatsApp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
          </a>
        </div>
      </section>
    </>
  );
}