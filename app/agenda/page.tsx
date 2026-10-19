"use client";

import { useState } from "react";
import { acara } from "@/lib/data";

export default function Agenda() {
  const [ikut, setIkut] = useState<Record<number, boolean>>({});

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-maroon">
          Agenda
        </p>
        <h1 className="mt-3 text-4xl text-maroon">Acara eco events</h1>
        <p className="mt-4 text-ink/80">
          Kegiatan Nusaflo bersama warga dan bank sampah di Bandung. Ikut
          agar tidak ketinggalan.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {acara.map((a, i) => (
          <li
            key={a.judul}
            className="flex flex-col rounded-3xl border border-ink/10 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-maroon/10 px-3 py-1 text-xs text-maroon">
                {a.status}
              </span>
            </div>

            <h2 className="mt-4 font-display text-xl text-maroon">{a.judul}</h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-clay">
              {a.tanggal} · {a.lokasi}
            </p>
            <p className="mt-3 flex-1 text-sm text-ink/70">{a.ringkas}</p>

            {ikut[i] ? (
              <p className="mt-5 rounded-full bg-cream px-4 py-2 text-center text-sm text-maroon">
                Terima kasih, Anda terdaftar.
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setIkut((s) => ({ ...s, [i]: true }))}
                className="mt-5 rounded-full border border-maroon px-4 py-2 text-sm text-maroon transition hover:bg-maroon/5"
              >
                Ikut
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
