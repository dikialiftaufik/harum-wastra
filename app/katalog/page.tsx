import Link from "next/link";
import { formatRupiah, produk } from "@/lib/data";

export default function Katalog() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-maroon">
          Katalog
        </p>
        <h1 className="mt-3 text-4xl text-maroon">Dua produk, enam motif batik</h1>
        <p className="mt-4 text-ink/80">
          Setiap produk dibungkus kertas batik yang bisa Anda pilih sendiri dari
          enam motif, lengkap dengan maknanya.
        </p>
      </div>

      <div className="mt-12 grid gap-x-10 gap-y-16 sm:grid-cols-2">
        {produk.map((p) => (
          <Link key={p.slug} href={`/produk/${p.slug}`} className="group block">
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white">
              <div
                className="h-12"
                style={{
                  backgroundImage: `url(${p.pita})`,
                  backgroundSize: "84px",
                  backgroundRepeat: "repeat",
                }}
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.gambar}
                alt={`Ilustrasi ${p.nama}`}
                className="w-full"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h2 className="font-display text-2xl text-maroon">{p.nama}</h2>
              <p className="font-mono text-sm text-maroon">
                {formatRupiah(p.harga)}
              </p>
            </div>
            <p className="mt-2 text-sm text-ink/70">{p.ringkas}</p>
            <p className="mt-3 text-sm text-maroon underline underline-offset-4 group-hover:text-maroon-dark">
              Pilih motif
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
