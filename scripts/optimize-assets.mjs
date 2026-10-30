// Menghasilkan turunan aset yang kecil dari berkas desain asli di public/.
//
// Kenapa perlu: motif batik dipakai sebagai pola berulang (background-repeat) dan
// latar seksi dipakai lewat <Image>. Pola berulang tidak bisa dioptimalkan Next.js
// karena berupa CSS `background-image`, jadi versi kecilnya dibuat sekali di sini.
//
// Jalankan: npm run assets
// Butuh sharp (ikut terpasang sebagai optionalDependency Next.js).
//
// Berkas hasil skrip ini ikut di-commit supaya build Vercel tidak bergantung
// pada eksekusi skrip.

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const akar = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const MOTIF = [
  "kawung",
  "sekar-jagad",
  "mega-mendung",
  "parang-rusak",
  "pring-sedapur",
  "truntum",
];

const TILE_UKURAN = 240;
const TILE_KUALITAS = 78;

async function buatTileMotif() {
  const tujuan = path.join(akar, "public", "motif-tile");
  await mkdir(tujuan, { recursive: true });

  for (const id of MOTIF) {
    const sumber = path.join(akar, "public", "motif", `${id}.png`);
    const keluar = path.join(tujuan, `${id}.webp`);
    const info = await sharp(sumber)
      .resize(TILE_UKURAN, TILE_UKURAN, { fit: "cover" })
      .webp({ quality: TILE_KUALITAS })
      .toFile(keluar);
    console.log(
      `tile  motif-tile/${id}.webp  ${TILE_UKURAN}px  ${(info.size / 1024).toFixed(1)} KB`
    );
  }
}

/** Potong ruang kosong transparan supaya monogram tidak tampak kecil. */
async function potongTransparan(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 8) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) return { input, width: info.width, height: info.height };

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const buffer = await sharp(input)
    .extract({ left: minX, top: minY, width, height })
    .png()
    .toBuffer();

  return { input: buffer, width, height };
}

async function buatIkon() {
  const sumber = path.join(akar, "public", "logo-secondary.png");
  const { input } = await potongTransparan(sumber);

  // Ikon diberi sedikit ruang (padding) supaya tidak menyentuh tepi tab.
  const target = [
    { keluar: path.join(akar, "app", "icon.png"), ukuran: 64 },
    { keluar: path.join(akar, "app", "apple-icon.png"), ukuran: 180 },
  ];

  for (const { keluar, ukuran } of target) {
    const dalam = Math.round(ukuran * 0.82);
    const monogram = await sharp(input)
      .resize(dalam, dalam, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    const info = await sharp({
      create: {
        width: ukuran,
        height: ukuran,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      },
    })
      .composite([{ input: monogram, gravity: "center" }])
      .png({ compressionLevel: 9 })
      .toFile(keluar);

    console.log(
      `ikon  ${path.relative(akar, keluar)}  ${ukuran}px  ${(info.size / 1024).toFixed(1)} KB`
    );
  }
}

/** Ubah isi logo (yang berwarna gelap) menjadi putih, alpha tetap utuh. */
async function warnaiPutih(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

async function buatGambarOG() {
  const keluar = path.join(akar, "app", "opengraph-image.png");

  // Latar gradien teal + pita lembut, dibuat sebagai SVG supaya tajam di semua ukuran.
  const latarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0B7C82"/>
        <stop offset="0.55" stop-color="#096D73"/>
        <stop offset="1" stop-color="#064A4F"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <circle cx="1060" cy="90" r="260" fill="#FFFFFF" opacity="0.05"/>
    <circle cx="1120" cy="560" r="200" fill="#FFFFFF" opacity="0.04"/>
    <rect x="80" y="196" width="72" height="4" rx="2" fill="#D9E7E8" opacity="0.75"/>
  </svg>`;

  const latar = await sharp(Buffer.from(latarSvg)).png().toBuffer();

  const { input: logo } = await potongTransparan(
    path.join(akar, "public", "logo-primary.png")
  );
  const logoPutih = await warnaiPutih(logo);
  const logoKecil = await sharp(logoPutih)
    .resize({ width: 720, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const info = await sharp(latar)
    .composite([{ input: logoKecil, left: 80, top: 250 }])
    .png({ compressionLevel: 9 })
    .toFile(keluar);

  console.log(
    `og    ${path.relative(akar, keluar)}  1200x630  ${(info.size / 1024).toFixed(1)} KB`
  );
}

async function main() {
  await buatTileMotif();
  await buatIkon();
  await buatGambarOG();
  console.log("\nSelesai. Commit berkas hasilnya agar build tidak perlu menjalankan skrip ini.");
}

main().catch((galat) => {
  console.error("Gagal membuat turunan aset:", galat.message);
  process.exitCode = 1;
});
