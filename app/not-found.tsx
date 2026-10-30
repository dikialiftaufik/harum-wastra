import Link from "next/link";
import { GambarLatar } from "@/components/GambarLatar";
import { MotifTile } from "@/components/MotifTile";

export default function NotFound() {
  return (
    <section className="page-top relative flex min-h-[70vh] items-center overflow-hidden bg-cream pb-20">
      <GambarLatar src="/backgrounds/bg-beranda-hero-section.png" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-cream/95 via-cream/90 to-cream/65" />
      <MotifTile id="kawung" ukuran={120} className="z-[1] opacity-[0.07]" />

      <div className="relative z-10 mx-auto max-w-xl px-5 text-center sm:px-8">
        <p className="eyebrow text-clay">Halaman tidak ditemukan</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-maroon sm:text-5xl">
          Sepertinya halaman ini{" "}
          <span className="italic">sudah berpindah</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/70">
          Alamat yang Anda buka tidak tersedia. Mungkin tautannya salah ketik,
          atau halaman sudah diganti dengan alamat baru.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-maroon px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-maroon-dark"
          >
            Kembali ke beranda
          </Link>
          <Link
            href="/katalog"
            className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white/90 px-7 py-3.5 text-sm font-semibold text-ink/80 backdrop-blur-sm transition-colors hover:border-maroon/30 hover:text-maroon"
          >
            Lihat katalog
          </Link>
        </div>

        <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
          {[
            { href: "/katalog", label: "Katalog produk" },
            { href: "/agenda", label: "Eco Events" },
            { href: "/akun", label: "Eco Points" },
          ].map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-xl border border-ink/10 bg-white/90 px-4 py-3 text-sm font-medium text-ink/80 shadow-sm backdrop-blur-sm transition-colors hover:border-maroon/30 hover:text-maroon"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
