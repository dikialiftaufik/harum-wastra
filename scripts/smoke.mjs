// Uji asap hasil build produksi.
//
// Menjalankan `next start` pada port bebas, lalu memeriksa setiap rute:
// status HTTP, teks kunci pada HTML awal (bukan setelah hidrasi), tidak ada
// sisa latar PNG lewat CSS, dan berkas metadata ikut tersaji.
//
// Jalankan: npm run build && npm run smoke

import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout as jeda } from "node:timers/promises";

const require = createRequire(import.meta.url);
const PORT = Number(process.env.SMOKE_PORT || 4317);
const BASIS = `http://127.0.0.1:${PORT}`;

/** [path, teks yang wajib ada di HTML awal] */
const RUTE = [
  ["/", "Setor minyak jelantah"],
  ["/katalog", "Koleksi motif batik"],
  ["/agenda", "Langkah kecil"],
  ["/akun", "pantau poin Anda"],
  ["/keranjang", "Lengkapi Pesanan Anda"],
  ["/setor", "Cara setor jelantah"],
  ["/pesanan/berhasil", "Rincian pesanan Anda"],
  ["/produk/buket", "Buket Aromaterapi"],
  ["/produk/souvenir", "Souvenir Bloom"],
];

const BERKAS = [
  "/robots.txt",
  "/sitemap.xml",
  "/icon.png",
  "/apple-icon.png",
  "/opengraph-image.png",
  "/motif-tile/kawung.webp",
];

let proses;

async function tungguSiap(batasMs = 90_000) {
  const mulai = Date.now();
  while (Date.now() - mulai < batasMs) {
    try {
      const res = await fetch(BASIS, { redirect: "manual" });
      if (res.status < 500) return true;
    } catch {
      // server belum menerima koneksi
    }
    await jeda(400);
  }
  return false;
}

function bersihkanHtml(html) {
  return html.replace(/<script[\s\S]*?<\/script>/g, "");
}

async function main() {
  const binNext = require.resolve("next/dist/bin/next");
  proses = spawn(
    process.execPath,
    [binNext, "start", "--port", String(PORT)],
    { stdio: "ignore", env: { ...process.env, NODE_ENV: "production" } }
  );

  const siap = await tungguSiap();
  if (!siap) {
    console.error(`Server tidak siap di ${BASIS}`);
    proses.kill();
    process.exitCode = 1;
    return;
  }

  const baris = [];
  let gagal = 0;

  for (const [path, teks] of RUTE) {
    try {
      const res = await fetch(BASIS + path);
      const html = await res.text();
      const isi = bersihkanHtml(html);
      const masalah = [];

      if (res.status !== 200) masalah.push(`status ${res.status}`);
      if (!isi.includes(teks)) masalah.push(`teks "${teks}" tidak ada`);
      if (isi.includes("Halaman ini masih kosong")) masalah.push("masih ada placeholder kosong");
      if (isi.includes("segera hadir")) masalah.push("masih ada teks 'segera hadir'");
      if (/url\(\/backgrounds\/[^)]+\.png\)/.test(html))
        masalah.push("latar PNG via CSS");
      if (!/<main[\s>]/.test(html)) masalah.push("tanpa elemen <main>");

      baris.push({
        Rute: path,
        Status: res.status,
        KB: (html.length / 1024).toFixed(0),
        Hasil: masalah.length === 0 ? "OK" : masalah.join("; "),
      });
      if (masalah.length > 0) gagal++;
    } catch (galat) {
      baris.push({ Rute: path, Status: "-", KB: "-", Hasil: galat.message });
      gagal++;
    }
  }

  // Rute tak dikenal harus memakai halaman 404 kustom.
  try {
    const res = await fetch(`${BASIS}/halaman-tidak-ada-123`, { redirect: "manual" });
    const html = await res.text();
    const kustom = html.includes("Halaman tidak ditemukan");
    baris.push({
      Rute: "/halaman-tidak-ada-123",
      Status: res.status,
      KB: (html.length / 1024).toFixed(0),
      Hasil:
        res.status === 404 && kustom ? "OK (404 kustom)" : `status ${res.status}, kustom=${kustom}`,
    });
    if (res.status !== 404 || !kustom) gagal++;
  } catch (galat) {
    baris.push({ Rute: "/halaman-tidak-ada-123", Status: "-", KB: "-", Hasil: galat.message });
    gagal++;
  }

  // Berkas metadata & aset.
  for (const path of BERKAS) {
    try {
      const res = await fetch(BASIS + path);
      baris.push({
        Rute: path,
        Status: res.status,
        KB: "-",
        Hasil: res.status === 200 ? "OK" : "GAGAL",
      });
      if (res.status !== 200) gagal++;
    } catch (galat) {
      baris.push({ Rute: path, Status: "-", KB: "-", Hasil: galat.message });
      gagal++;
    }
  }

  console.table(baris);
  console.log(
    gagal === 0
      ? `\nSemua ${baris.length} pemeriksaan lolos.`
      : `\n${gagal} pemeriksaan gagal dari ${baris.length}.`
  );

  proses.kill();
  process.exitCode = gagal === 0 ? 0 : 1;
}

main()
  .catch((galat) => {
    console.error("Uji asap gagal:", galat);
    process.exitCode = 1;
  })
  .finally(() => {
    proses?.kill();
  });
