"use client";

import { useState } from "react";
import Link from "next/link";
import { motif, formatRupiah, type Produk, type Motif } from "@/lib/data";
import { tambahKeKeranjang } from "@/lib/keranjang";

export function ProdukDetail({ produk }: { produk: Produk }) {
  const [aktifId, setAktifId] = useState<string>(motif[0].id);
  const [ditambahkan, setDitambahkan] = useState(false);
  const aktif: Motif = motif.find((m) => m.id === aktifId) ?? motif[0];

  const spek =
    produk.slug === "buket" ? "LILIN AROMA TERAPI" : "SATU KELOPAK";

  function tambah() {
    tambahKeKeranjang({
      slug: produk.slug,
      nama: produk.nama,
      motifId: aktif.id,
      motifNama: aktif.nama,
      harga: produk.harga,
      gambar: produk.gambar,
      pita: aktif.gambar,
    });
    setDitambahkan(true);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Gambar produk, pita mengikuti motif yang sedang dipilih */}
        <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white">
          <div
            className="h-12"
            style={{
              backgroundImage: `url(${aktif.gambar})`,
              backgroundSize: "84px",
              backgroundRepeat: "repeat",
            }}
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={produk.gambar}
            alt={`Ilustrasi ${produk.nama}`}
            className="w-full"
          />
        </div>

        {/* Rincian dan pemilih motif */}
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-clay">
            {spek} / KERTAS BATIK
          </p>
          <h1 className="mt-3 text-3xl text-maroon sm:text-4xl">
            {produk.nama}
          </h1>
          <p className="mt-3 font-mono text-lg text-maroon">
            {formatRupiah(produk.harga)}{" "}
            <span className="text-xs text-clay">{produk.satuan}</span>
          </p>
          <p className="mt-4 text-ink/80">{produk.ringkas}</p>

          <div className="mt-8">
            <p className="text-sm font-semibold">Pilih motif batik</p>

            {/* Motif besar yang sedang dipilih */}
            <div className="mt-4 flex items-start gap-4">
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-ink/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aktif.gambar}
                  alt={`Motif ${aktif.nama}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-display text-lg text-maroon">
                  {aktif.nama}
                </p>
                <p className="font-mono text-xs uppercase tracking-wide text-clay">
                  Asal: {aktif.asal}
                </p>
                <p className="mt-1 text-sm text-ink/70">{aktif.makna}</p>
              </div>
            </div>

            {/* Enam swatch, baris kecil yang bisa digeser */}
            <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
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
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    m.id === aktifId
                      ? "border-maroon ring-2 ring-maroon/25"
                      : "border-ink/10 hover:border-maroon/40"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.gambar}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={tambah}
            className="mt-8 w-full rounded-full bg-maroon px-8 py-4 text-cream transition hover:bg-maroon-dark sm:w-auto"
          >
            Masukkan ke keranjang
          </button>

          {ditambahkan && (
            <p className="mt-3 text-sm text-maroon">
              Ditambahkan ke keranjang.{" "}
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
    </section>
  );
}
