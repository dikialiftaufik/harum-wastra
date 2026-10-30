// Satu sumber untuk identitas situs, kontak, dan lokasi mitra.
// Dipakai navbar, footer, halaman setor, dan halaman pesanan supaya teks
// tidak berbeda antar halaman.
//
// Nilai kontak masih penampung untuk MVP; ganti di sini saja bila sudah ada
// nomor/alamat resmi.

export const SITUS = {
  nama: "Harum Wastra",
  deskripsiSingkat:
    "Buket bunga lilin aromaterapi dari minyak jelantah bekas, dibungkus kertas batik pilihan.",
  email: "halo@harumwastra.id",
  /** Ditampilkan apa adanya di footer dan halaman bantuan. */
  whatsapp: "+62 812 3456 7890",
  /** Versi tanpa spasi untuk tautan wa.me. */
  whatsappHref: "https://wa.me/6281234567890",
  alamat: "Harum Wastra Creative Space, Bandung",
  jamLayanan: "Senin–Sabtu, 09.00–17.00 WIB",
  lokasiMitra: "Bank Sampah Mitra Bandung",
  /** Basis URL absolut; dipakai metadata dan QR setoran. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

/** Tautan sosial. Isi `href` dengan URL asli saat akun resmi sudah ada. */
export const TAUTAN_SOSIAL = {
  instagram: "#",
  youtube: "#",
  tiktok: "#",
  linkedin: "#",
} as const;

export function urlAbsolut(path: string): string {
  return `${SITUS.url.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}
