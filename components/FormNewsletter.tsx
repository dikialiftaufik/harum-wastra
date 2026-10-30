"use client";

import { useState } from "react";

const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Form langganan di footer. Belum tersambung ke layanan email; hanya memberi
 * umpan balik di halaman supaya tidak ada tombol yang diam saja. */
export function FormNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"diam" | "sukses" | "galat">("diam");

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    if (!POLA_EMAIL.test(email.trim())) {
      setStatus("galat");
      return;
    }
    setStatus("sukses");
    setEmail("");
  }

  return (
    <form onSubmit={kirim} className="mt-3" noValidate>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <label htmlFor="email-newsletter" className="sr-only">
            Alamat email untuk kabar terbaru
          </label>
          <input
            id="email-newsletter"
            type="email"
            autoComplete="email"
            placeholder="Masukkan email Anda"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "diam") setStatus("diam");
            }}
            aria-invalid={status === "galat"}
            aria-describedby="status-newsletter"
            className="w-full rounded-xl border border-white/25 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:border-white/50 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-maroon px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-maroon-dark"
        >
          Berlangganan
        </button>
      </div>
      <p
        id="status-newsletter"
        aria-live="polite"
        className={`mt-2 min-h-4 text-xs ${
          status === "galat" ? "text-red-200" : "text-white/75"
        }`}
      >
        {status === "sukses"
          ? "Terima kasih! Kabar terbaru akan dikirim ke email Anda."
          : status === "galat"
            ? "Masukkan alamat email yang benar, misalnya nama@contoh.com."
            : ""}
      </p>
    </form>
  );
}
