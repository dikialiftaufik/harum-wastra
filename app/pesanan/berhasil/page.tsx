"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bacaPesananTerakhir, formatWaktu, type Pesanan } from "@/lib/pesanan";
import { formatRupiah } from "@/lib/data";

export default function Berhasil() {
  const [p, setP] = useState<Pesanan | null>(null);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    setP(bacaPesananTerakhir());
    setSiap(true);
  }, []);

  if (!siap) return null;

  if (!p) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl text-maroon">Belum ada pesanan</h1>
        <p className="mt-4 text-ink/80">
          Tidak menemukan pesanan terakhir di peramban ini. Silakan belanja
          lebih dulu.
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
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 md:py-24">
      <div className="rounded-3xl border border-ink/10 bg-white p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-maroon">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f5efe6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl text-maroon">Pemesanan berhasil</h1>
        <p className="mt-2 font-mono text-sm text-clay">{p.nomor}</p>

        <p className="mt-5 text-ink/80">
          Pesanan Anda sudah tercatat. Pembayaran akan dikonfirmasi lewat
          WhatsApp.
        </p>

        <dl className="mt-8 space-y-2 border-t border-ink/10 pt-6 text-left text-sm">
          <div className="flex justify-between">
            <dt className="text-ink/70">Atas nama</dt>
            <dd>{p.nama}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink/70">Metode pembayaran</dt>
            <dd>{p.metode}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink/70">Kirim ke</dt>
            <dd className="text-right">
              {p.kota} {p.kodepos}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink/70">Waktu</dt>
            <dd>{formatWaktu(p.waktu)}</dd>
          </div>
          <div className="flex justify-between border-t border-ink/10 pt-2 text-base">
            <dt className="font-semibold text-maroon">Total</dt>
            <dd className="font-mono text-maroon">{formatRupiah(p.total)}</dd>
          </div>
        </dl>

        <ul className="mt-6 space-y-1 text-left text-sm text-ink/70">
          {p.items.map((it) => (
            <li key={it.key}>
              {it.qty} x {it.nama} ({it.motifNama})
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/katalog"
          className="rounded-full bg-maroon px-7 py-3 text-cream transition hover:bg-maroon-dark"
        >
          Lanjut belanja
        </Link>
        <Link
          href="/"
          className="rounded-full border border-maroon px-7 py-3 text-maroon transition hover:bg-maroon/5"
        >
          Ke beranda
        </Link>
      </div>
    </section>
  );
}
