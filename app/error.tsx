"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ganti dengan layanan pemantauan galat bila sudah tersedia.
    console.error("Galat halaman:", error);
  }, [error]);

  return (
    <section className="page-top flex min-h-[70vh] items-center bg-cream pb-20">
      <div className="mx-auto max-w-xl px-5 text-center sm:px-8">
        <p className="eyebrow text-clay">Terjadi kendala</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-maroon sm:text-5xl">
          Halaman gagal dimuat
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/70">
          Ada gangguan saat memuat bagian ini. Coba muat ulang; bila masih
          gagal, kembali ke beranda lalu buka kembali halamannya.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark"
          >
            Coba muat ulang
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink/75 transition-colors hover:border-maroon/30 hover:text-maroon"
          >
            Kembali ke beranda
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 font-mono text-xs text-ink/45">
            Kode galat: {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
