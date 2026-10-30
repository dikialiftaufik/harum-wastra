import type { Motif } from "@/lib/data";

/**
 * Pola batik berulang memakai tile WebP 240px (≈20 KB) alih-alih PNG motif
 * 1,9–2,6 MB. Pola berulang tidak bisa lewat <Image>, jadi tile dibuat sekali
 * oleh `npm run assets`.
 */
type MotifTileProps = {
  id: Motif["id"] | string;
  /** Ukuran ubin dalam piksel, sama seperti `background-size` sebelumnya. */
  ukuran: number;
  className?: string;
};

export function MotifTile({ id, ukuran, className = "" }: MotifTileProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `url(/motif-tile/${id}.webp)`,
        backgroundSize: `${ukuran}px`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
