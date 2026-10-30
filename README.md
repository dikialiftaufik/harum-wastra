# Harum Wastra

Website Harum Wastra: buket bunga lilin aromaterapi dari minyak jelantah bekas, dibungkus kertas batik pilihan. Pengunjung dapat menyetor jelantah, mengumpulkan poin, lalu menukarnya dengan produk.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Perintah

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Server pengembangan |
| `npm run build` | Build produksi |
| `npm start` | Menjalankan hasil build |
| `npm run lint` | Pemeriksaan ESLint |
| `npm run check` | Typecheck + ESLint + build sekaligus |
| `npm run smoke` | Uji asap hasil build (menjalankan `next start` sendiri) |
| `npm run assets` | Membuat turunan aset (tile motif, favicon, gambar OG) |

## Halaman

- `/` — beranda
- `/katalog` — daftar produk dan koleksi motif batik
- `/produk/[slug]` — detail produk, pilihan motif, tab ulasan, dan FAQ
- `/agenda` — Eco Events, filter kategori, dan formulir pendaftaran
- `/akun` — Eco Points: QR setoran, simulasi setoran, riwayat, dan tukar voucher
- `/keranjang` — keranjang, alamat pengiriman, metode bayar, dan checkout
- `/setor` — halaman setor jelantah (tujuan pemindaian QR)
- `/pesanan/berhasil` — konfirmasi pesanan beserta rincian biaya
- Halaman 404 dan halaman galat sudah didesain sendiri (`app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`)

## Teknologi

Next.js (App Router) 16, React 19, TypeScript, dan Tailwind CSS v4. Warna serta huruf diatur di `app/globals.css`, logo ada di `components/Logo.tsx`, dan identitas/kontak situs dipusatkan di `lib/situs.ts`.

Catatan Next.js 16 yang dipakai proyek ini:

- `cacheComponents` dan `partialPrefetching` aktif di `next.config.ts`.
- Tahun di footer memakai `io()` dari `next/cache` (lihat `components/Tahun.tsx`), karena `new Date()` saat prerender akan membuat build gagal.
- Rute yang bergantung pada `params` memakai `export const instant = false` (`app/produk/[slug]/page.tsx`).

## Penyimpanan data

Semua data pengguna disimpan di `localStorage` peramban, jadi data tiap perangkat terpisah dan tidak tersinkron. Kuncinya:

| Kunci | Isi |
| --- | --- |
| `harum-wastra-keranjang` | item keranjang |
| `harum-wastra-alamat` | buku alamat pengiriman |
| `harum-wastra-pesanan-terakhir` | pesanan terakhir |
| `harum-wastra-setoran` | riwayat setoran jelantah |
| `harum-wastra-poin-saldo` | saldo poin |
| `harum-wastra-profil` | nomor WhatsApp |
| `harum-wastra-ulasan` | ulasan produk |
| `harum-wastra-voucher` | voucher yang sudah ditukar |

Helper penyimpanan ada di `lib/penyimpanan.ts`. Setiap penulisan mengirim event `harum-wastra:simpan`, sehingga badge keranjang di navbar ikut berubah tanpa memuat ulang halaman. Pembacaan data selalu dibungkus `try/catch`, jadi data rusak tidak membuat halaman gagal tampil.

Yang masih simulasi:

- Pembayaran (transfer/QRIS/e-wallet) hanya simulasi, tidak ada transaksi uang nyata.
- Penukaran voucher mencatat kepemilikan voucher, tetapi tidak mengurangi angka saldo karena saldo masih ilustratif.
- Riwayat setoran di halaman Eco Points memakai data contoh bila perangkat belum punya setoran.

## Aset dan optimasi gambar

Gambar sumber desain disimpan di `public/backgrounds`, `public/graphics`, dan `public/motif`. Latar seksi memakai komponen `GambarLatar` (memakai `<Image>`) sehingga Next mengirim varian AVIF/WebP berukuran sesuai layar, bukan PNG 1–2 MB.

Pola batik berulang tidak bisa lewat `<Image>`, jadi dibuat tile kecil WebP 240px di `public/motif-tile/`. Tile dibuat oleh:

```bash
npm run assets
```

Skrip itu juga membuat `app/icon.png`, `app/apple-icon.png`, dan `app/opengraph-image.png` dari logo. Berkas hasilnya ikut di-commit; skrip hanya perlu dijalankan ulang bila gambar sumber diganti.

Ringkasan bobot gambar yang benar-benar diunduh (diukur di peramban):

| Halaman | Sebelum | Sesudah (390px / 1440px) |
| --- | --- | --- |
| Beranda | ± 9,9 MB | 88 KB / 260 KB |
| Detail produk | ± 13,4 MB | 84 KB / 84 KB |
| Katalog | ± 3,2 MB | 237 KB / 121 KB |
| Eco Points | ± 9,3 MB | 46 KB / 58 KB |

## Deploy

Panduan langkah demi langkah untuk Vercel ada di [PANDUAN-DEPLOY-VERCEL.md](./PANDUAN-DEPLOY-VERCEL.md).

Sebelum presentasi, jalankan:

```bash
npm run check   # typecheck + lint + build
npm run smoke   # memeriksa setiap rute pada hasil build
```
