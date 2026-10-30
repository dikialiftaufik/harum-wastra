import Image from "next/image";

type GambarLatarProps = {
  /** Path gambar di public/. */
  src: string;
  /** Pengganti `background-position`; mis. "center", "center right", "left center". */
  posisi?: string;
  /** Preload gambar (pakai hanya untuk gambar hero / LCP). */
  prioritas?: boolean;
  /** Kelas untuk lapisan pembungkus, mis. z-index atau warna dasar. */
  className?: string;
};

/**
 * Latar seksi yang memakai <Image> supaya Next mengirim varian AVIF/WebP
 * berukuran sesuai layar. Sebelumnya latar dipasang lewat CSS `background-image`
 * sehingga PNG 1–2 MB terunduh apa adanya.
 */
export function GambarLatar({
  src,
  posisi = "center",
  prioritas = false,
  className = "",
}: GambarLatarProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden bg-cream ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        priority={prioritas}
        className="object-cover"
        style={{ objectPosition: posisi }}
      />
    </div>
  );
}
