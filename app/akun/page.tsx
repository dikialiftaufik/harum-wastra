"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  bacaProfil,
  simpanProfil,
  bacaSetoran,
  saldoPoin,
  totalLiter,
  formatWaktu,
  RUPIAH_PER_POIN,
  type Profil,
  type Setoran,
} from "@/lib/poin";

const inputKelas =
  "mt-1 w-full border-b border-ink/20 bg-transparent py-2 text-ink placeholder:text-clay/60 focus:border-maroon focus:outline-none";

export default function Akun() {
  const [profil, setProfil] = useState<Profil | null>(null);
  const [siap, setSiap] = useState(false);
  const [teleponBaru, setTeleponBaru] = useState("");
  const [galat, setGalat] = useState("");
  const [qr, setQr] = useState("");
  const [setoran, setSetoran] = useState<Setoran[]>([]);

  useEffect(() => {
    const p = bacaProfil();
    setProfil(p);
    setSetoran(bacaSetoran());
    setSiap(true);
  }, []);

  useEffect(() => {
    if (!profil) return;
    const site = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const url = `${site}/setor?telepon=${encodeURIComponent(profil.telepon)}`;
    QRCode.toDataURL(url, {
      margin: 1,
      width: 360,
      color: { dark: "#292423", light: "#ffffff" },
    })
      .then(setQr)
      .catch(() => setQr(""));
  }, [profil]);

  function masuk(e: React.FormEvent) {
    e.preventDefault();
    const t = teleponBaru.trim();
    if (t.length < 8) {
      setGalat("Masukkan nomor telepon yang valid.");
      return;
    }
    simpanProfil(t);
    setProfil({ telepon: t });
    setGalat("");
  }

  if (!siap) return null;

  // Belum dikenali: minta nomor telepon, tanpa kata sandi.
  if (!profil) {
    return (
      <section className="mx-auto max-w-md px-4 py-20 sm:px-6">
        <h1 className="text-3xl text-maroon">Masuk atau daftar</h1>
        <p className="mt-3 text-ink/80">
          Cukup dengan nomor telepon. Tidak perlu kata sandi.
        </p>
        <form onSubmit={masuk} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-xs uppercase tracking-wide text-clay">
              Nomor telepon
            </span>
            <input
              className={inputKelas}
              inputMode="tel"
              value={teleponBaru}
              onChange={(e) => setTeleponBaru(e.target.value)}
              placeholder="08xxxxxxxxxx"
            />
          </label>
          {galat && <p className="text-sm text-maroon">{galat}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-maroon px-8 py-3 text-cream transition hover:bg-maroon-dark"
          >
            Masuk
          </button>
        </form>
      </section>
    );
  }

  const saldo = saldoPoin();
  const liter = totalLiter();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-3xl text-maroon sm:text-4xl">Akun Anda</h1>
        <p className="font-mono text-sm text-clay">{profil.telepon}</p>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* QR setoran */}
        <div className="rounded-3xl border border-ink/10 bg-white p-6 text-center">
          <p className="text-sm font-semibold">Kode QR setoran</p>
          <p className="mt-1 text-xs text-ink/70">
            Pindai QR ini di bank sampah untuk membuka halaman setoran.
          </p>
          <div className="mt-5 flex justify-center">
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qr}
                alt="Kode QR setoran"
                className="h-56 w-56 rounded-xl border border-ink/10"
              />
            ) : (
              <div className="h-56 w-56 rounded-xl bg-cream" />
            )}
          </div>
        </div>

        {/* Saldo poin dan dampak */}
        <div className="rounded-3xl bg-maroon p-6 text-cream">
          <p className="text-sm text-cream/80">Saldo poin</p>
          <p className="mt-2 font-display text-5xl">{saldo.toLocaleString("id-ID")}</p>
          <p className="mt-1 font-mono text-sm text-cream/80">
            ≈ Rp{(saldo * RUPIAH_PER_POIN).toLocaleString("id-ID")}
          </p>

          <div className="mt-6 border-t border-cream/20 pt-5">
            <p className="text-sm text-cream/80">Total jelantah disumbangkan</p>
            <p className="mt-1 font-display text-3xl">
              {liter.toLocaleString("id-ID")} liter
            </p>
          </div>
          <p className="mt-4 text-xs text-cream/60">
            Nilai poin masih ilustrasi dan menunggu validasi HPP serta
            perjanjian bank sampah.
          </p>
        </div>
      </div>

      {/* Riwayat setoran */}
      <div className="mt-10">
        <h2 className="text-xl text-maroon">Riwayat setoran</h2>
        {setoran.length === 0 ? (
          <p className="mt-3 text-ink/70">
            Belum ada setoran. Pindai QR di atas untuk mulai.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {setoran
              .slice()
              .reverse()
              .map((s) => (
                <li key={s.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm">
                      {s.liter.toLocaleString("id-ID")} liter · {s.lokasi}
                    </p>
                    <p className="text-xs text-clay">{formatWaktu(s.waktu)}</p>
                  </div>
                  <p className="font-mono text-sm text-maroon">
                    +{s.poin.toLocaleString("id-ID")} poin
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}
