"use client";

import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@/components/Dialog";
import type { Motif } from "@/lib/data";

/** Detail motif batik: dipakai dari kartu motif di halaman katalog. */
export function MotifDialog({
  motif,
  onTutup,
}: {
  motif: Motif | null;
  onTutup: () => void;
}) {
  return (
    <Dialog
      buka={motif !== null}
      onTutup={onTutup}
      judul={motif ? `Motif ${motif.nama}` : "Motif batik"}
      deskripsi={motif ? `Berasal dari ${motif.asal}` : undefined}
      aksi={
        <>
          <Link
            href="/produk/buket"
            className="inline-flex items-center justify-center rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark"
          >
            Pilih buket
          </Link>
          <Link
            href="/produk/souvenir"
            className="inline-flex items-center justify-center rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink/75 transition-colors hover:border-maroon/30 hover:text-maroon"
          >
            Pilih souvenir
          </Link>
        </>
      }
    >
      {motif && (
        <div className="mt-5">
          <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl border border-ink/10">
            <Image
              src={motif.gambar}
              alt={`Motif ${motif.nama}`}
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
          <p className="mt-4 rounded-2xl bg-cream/60 p-4 text-left text-sm leading-relaxed text-ink/70">
            {motif.makna}
          </p>
          <p className="mt-3 text-left text-xs text-ink/55">
            Motif ini bisa dipilih saat menambahkan produk ke keranjang.
          </p>
        </div>
      )}
    </Dialog>
  );
}
