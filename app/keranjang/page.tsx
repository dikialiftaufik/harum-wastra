"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

// Ongkos kirim tetap untuk versi ini. Angka masih estimasi.
const ONGKIR = 10000;

const METODE = ["QRIS", "Transfer bank", "Bayar di tempat"];

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

function Kolom({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide text-clay">{label}</span>
      {children}
    </label>
  );
}

const inputKelas =
  "mt-1 w-full border-b border-ink/20 bg-transparent py-2 text-ink placeholder:text-clay/60 focus:border-maroon focus:outline-none";

export default function Keranjang() {
  const router = useRouter();
  const [items, setItems] = useState<ItemKeranjang[]>([]);
  const [siap, setSiap] = useState(false);
  const [form, setForm] = useState<Form>(KOSONG);
  const [metode, setMetode] = useState(METODE[0]);
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
      setGalat(
        "Mohon lengkapi nama, nomor telepon, alamat, kota, dan kode pos."
      );
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
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl text-maroon">Keranjang kosong</h1>
        <p className="mt-4 text-ink/80">
          Belum ada produk di keranjang. Pilih buket atau souvenir dan tentukan
          motif batiknya.
        </p>
        <Link
          href="/katalog"
          className="mt-8 inline-block rounded-full bg-maroon px-7 py-3 text-cream transition hover:bg-maroon-dark"
        >
          Lihat katalog
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <h1 className="text-3xl text-maroon sm:text-4xl">Keranjang</h1>

      {/* Daftar produk */}
      <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
        {items.map((it) => (
          <li key={it.key} className="flex gap-4 py-5">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-ink/10 bg-white">
              <div
                className="h-4"
                style={{
                  backgroundImage: `url(${it.pita})`,
                  backgroundSize: "36px",
                  backgroundRepeat: "repeat",
                }}
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.gambar}
                alt={it.nama}
                className="h-[calc(100%-1rem)] w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg text-maroon">{it.nama}</p>
                  <p className="mt-0.5 text-sm text-ink/70">
                    Motif: {it.motifNama}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setItems(hapusItem(it.key))}
                  className="text-xs text-clay underline underline-offset-4 hover:text-maroon"
                >
                  Hapus
                </button>
              </div>

              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Kurangi jumlah"
                    onClick={() => setItems(ubahQty(it.key, -1))}
                    className="h-9 w-9 rounded-full border border-ink/20 text-ink hover:border-maroon"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-mono">{it.qty}</span>
                  <button
                    type="button"
                    aria-label="Tambah jumlah"
                    onClick={() => setItems(ubahQty(it.key, 1))}
                    className="h-9 w-9 rounded-full border border-ink/20 text-ink hover:border-maroon"
                  >
                    +
                  </button>
                </div>
                <p className="font-mono text-sm text-maroon">
                  {formatRupiah(it.harga * it.qty)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {/* Formulir alamat dan kontak */}
        <form id="checkout" onSubmit={kirim} className="space-y-5">
          <h2 className="text-xl text-maroon">Alamat pengiriman</h2>
          <Kolom label="Nama">
            <input
              className={inputKelas}
              value={form.nama}
              onChange={(e) => setField("nama", e.target.value)}
              placeholder="Nama lengkap"
            />
          </Kolom>
          <Kolom label="Nomor telepon">
            <input
              className={inputKelas}
              inputMode="tel"
              value={form.telepon}
              onChange={(e) => setField("telepon", e.target.value)}
              placeholder="08xxxxxxxxxx"
            />
          </Kolom>
          <Kolom label="Alamat">
            <textarea
              className={inputKelas + " min-h-20"}
              value={form.alamat}
              onChange={(e) => setField("alamat", e.target.value)}
              placeholder="Jalan, nomor rumah, patokan"
            />
          </Kolom>
          <div className="grid grid-cols-2 gap-5">
            <Kolom label="Kota">
              <input
                className={inputKelas}
                value={form.kota}
                onChange={(e) => setField("kota", e.target.value)}
                placeholder="Bandung"
              />
            </Kolom>
            <Kolom label="Kode pos">
              <input
                className={inputKelas}
                inputMode="numeric"
                value={form.kodepos}
                onChange={(e) => setField("kodepos", e.target.value)}
                placeholder="40111"
              />
            </Kolom>
          </div>
          <Kolom label="Catatan (opsional)">
            <input
              className={inputKelas}
              value={form.catatan}
              onChange={(e) => setField("catatan", e.target.value)}
              placeholder="Misalnya jam pengiriman"
            />
          </Kolom>
        </form>

        {/* Ringkasan dan pembayaran */}
        <div>
          <div className="rounded-2xl border border-ink/10 bg-white p-6">
            <h2 className="text-xl text-maroon">Ringkasan</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/70">Subtotal</dt>
                <dd className="font-mono">{formatRupiah(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/70">Ongkos kirim (estimasi)</dt>
                <dd className="font-mono">{formatRupiah(ongkir)}</dd>
              </div>
              <div className="flex justify-between border-t border-ink/10 pt-2 text-base">
                <dt className="font-semibold text-maroon">Total</dt>
                <dd className="font-mono text-maroon">{formatRupiah(total)}</dd>
              </div>
            </dl>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold">
                Metode pembayaran
              </legend>
              <div className="mt-3 space-y-2">
                {METODE.map((m) => (
                  <label
                    key={m}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                      metode === m
                        ? "border-maroon bg-maroon/5"
                        : "border-ink/15 hover:border-maroon/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="metode"
                      value={m}
                      checked={metode === m}
                      onChange={() => setMetode(m)}
                      className="accent-maroon"
                    />
                    <span className="text-sm">{m}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className="mt-5 rounded-xl bg-cream p-3 text-xs text-ink/70">
              Pembayaran disimulasikan pada versi ini. Setelah pesanan dibuat,
              pembayaran dikonfirmasi lewat WhatsApp. Tidak ada pembayaran yang
              diproses di web ini.
            </p>

            {galat && <p className="mt-4 text-sm text-maroon">{galat}</p>}

            <button
              type="submit"
              form="checkout"
              className="mt-6 w-full rounded-full bg-maroon px-8 py-4 text-cream transition hover:bg-maroon-dark"
            >
              Buat pesanan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
