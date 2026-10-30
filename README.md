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

## Halaman

- `/` — beranda
- `/katalog` — daftar produk
- `/produk/[slug]` — detail produk dan pilihan motif
- `/agenda` — Eco Events
- `/akun` — Eco Points, setoran, dan voucher
- `/keranjang` — keranjang dan checkout
- `/setor` — halaman setor jelantah (target QR)
- `/pesanan/berhasil` — konfirmasi pesanan

## Teknologi

Next.js (App Router), React, TypeScript, dan Tailwind CSS v4. Warna serta huruf diatur di `app/globals.css`, logo ada di `components/Logo.tsx`.

## Penyimpanan data

Keranjang, poin, profil, dan riwayat pesanan disimpan di `localStorage` peramban, jadi data tiap perangkat terpisah dan tidak tersinkron. Pembayaran masih simulasi.

## Deploy

Panduan langkah demi langkah untuk Vercel ada di [PANDUAN-DEPLOY-VERCEL.md](./PANDUAN-DEPLOY-VERCEL.md).
