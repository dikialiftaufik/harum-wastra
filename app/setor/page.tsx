"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  tambahSetoran,
  saldoPoin,
  POIN_PER_LITER,
  LOKASI_SETORAN,
  type Setoran,
} from "@/lib/poin";

const inputKelas =
  "mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-center font-mono text-3xl text-ink focus:border-maroon focus:outline-none";

export default function Setor() {
  const [telepon, setTelepon] = useState("");
  const [liter, setLiter] = useState("");
  const [hasil, setHasil] = useState<{ setoran: Setoran; saldo: number } | null>(
    null
  );
  const [galat, setGalat] = useState("");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("telepon");
    if (t) setTelepon(t);
  }, []);

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(liter);
    if (!n || n <= 0) {
      setGalat("Masukkan volume dalam liter yang valid.");
      return;
    }
    const s = tambahSetoran(n, LOKASI_SETORAN);
    setHasil({ setoran: s, saldo: saldoPoin() });
    setGalat("");
  }

  if (hasil) {
    return (
      <section className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
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
        <h1 className="mt-6 text-3xl text-maroon">Setoran tercatat</h1>
        <p className="mt-3 text-ink/80">
          {hasil.setoran.liter.toLocaleString("id-ID")} liter dari{" "}
          {hasil.setoran.lokasi}.
        </p>
        <p className="mt-4 font-mono text-2xl text-maroon">
          +{hasil.setoran.poin.toLocaleString("id-ID")} poin
        </p>
        <p className="mt-1 text-sm text-ink/70">
          Saldo sekarang {hasil.saldo.toLocaleString("id-ID")} poin.
        </p>
        <Link
          href="/akun"
          className="mt-8 inline-block rounded-full bg-maroon px-7 py-3 text-cream transition hover:bg-maroon-dark"
        >
          Buka akun
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-ink/10 bg-white p-6 text-center">
        <p className="text-xs uppercase tracking-widest text-clay">
          Pemindaian berhasil
        </p>
        <h1 className="mt-2 text-2xl text-maroon">{LOKASI_SETORAN}</h1>
        {telepon && (
          <p className="mt-1 font-mono text-sm text-ink/70">
            Setoran untuk {telepon}
          </p>
        )}

        <form onSubmit={kirim} className="mt-8">
          <label className="block">
            <span className="text-sm font-semibold">Volume jelantah</span>
            <input
              className={inputKelas}
              inputMode="decimal"
              value={liter}
              onChange={(e) => setLiter(e.target.value)}
              placeholder="0"
            />
            <span className="mt-1 block text-sm text-clay">liter</span>
          </label>

          <p className="mt-3 text-xs text-ink/70">
            {POIN_PER_LITER.toLocaleString("id-ID")} poin per liter.
          </p>

          {galat && <p className="mt-3 text-sm text-maroon">{galat}</p>}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-maroon px-8 py-4 text-cream transition hover:bg-maroon-dark"
          >
            Catat setoran
          </button>
        </form>
      </div>
    </section>
  );
}
