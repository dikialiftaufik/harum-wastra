# Panduan Deploy Nusaflo ke Vercel (untuk Pemula)

Panduan ini menuntun dari nol sampai web Nusaflo bisa dibuka publik lewat alamat `https://....vercel.app`, lalu opsional memakai domain sendiri. Ikuti berurutan. Tidak perlu paham server.

---

## 0. Yang perlu disiapkan

1. Akun GitHub yang sudah punya akses ke repositori `nusaflo`.
2. Akun Vercel. Daftar cukup memakai tombol **Continue with GitHub**, tidak perlu kartu kredit untuk paket gratis (Hobby).
3. Node.js versi 20 atau lebih baru di komputer (hanya untuk uji build lokal).
4. Proyek sudah berjalan lokal dengan `npm run dev`.

---

## 1. Pastikan build lokal bersih

Jalankan di folder proyek (`web-nusaflo`):

```bash
npm install
npm run build
```

Build harus selesai dengan keterangan halaman ter-prerender tanpa error. Kalau ada error TypeScript, perbaiki dulu. Vercel memakai perintah yang sama, jadi build lokal gagal berarti deploy juga gagal.

Catatan untuk proyek ini: jangan menyimpan atau menjalankan build saat file sedang setengah tersunting di editor, karena error setengah jadi mudah muncul. Pastikan semua file sudah tersimpan.

---

## 2. Kirim kode ke GitHub

```bash
git status
git add .
git commit -m "chore: siap deploy"
git push origin main
```

Vercel hanya membaca kode yang ada di GitHub, bukan file di laptop.

---

## 3. Impor proyek di Vercel

1. Buka [vercel.com/new](https://vercel.com/new) dan masuk dengan akun GitHub.
2. Pada daftar **Import Git Repository**, cari `nusaflo`, klik **Import**.
3. Isian yang muncul:
   - **Project Name**: `nusaflo` (bebas, ini menjadi bagian alamat web).
   - **Framework Preset**: biarkan **Next.js** (terdeteksi otomatis).
   - **Root Directory**: biarkan kosong atau `./`. Repositori ini sudah berisi proyek Next.js langsung di akarnya.
   - **Build and Output Settings**: biarkan default (`npm run build`).
4. Buka bagian **Environment Variables**, tambahkan:
   - **Name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://nusaflo.vercel.app` (sesuaikan dengan alamat yang akan didapat; kalau belum tahu, isi sementara lalu perbaiki di langkah 6).
5. Klik **Deploy** dan tunggu 1 sampai 3 menit.

Selama proses, Vercel menampilkan log build. Bila selesai, akan muncul gambar confetti dan tombol **Visit**.

---

## 4. Buka web publiknya

Alamat web ada di bentuk `https://<nama-proyek>.vercel.app`. Buka alamat itu di ponsel dan komputer. Uji minimal:

1. Beranda, Katalog, Eco Events, Eco Points terbuka tanpa error.
2. Pilih produk, pilih motif, masukkan ke keranjang.
3. Checkout sampai halaman pesanan berhasil.
4. Buka Eco Points, tekan tombol QR, lalu pindai QR dari ponsel kedua dan selesaikan setoran.

Halaman yang error bisa dicek log-nya di Vercel: buka project, tab **Logs**, pilih **Runtime Logs**.

---

## 5. Perbarui otomatis setiap kali ada perubahan

Setelah impor, Vercel terhubung ke repositori. Setiap `git push` ke branch `main` otomatis membuat deploy baru. Branch lain otomatis mendapat **Preview Deployment** dengan alamat terpisah, jadi aman untuk uji coba tanpa mengganggu web publik.

---

## 6. Samakan alamat QR dengan domain produksi

QR di halaman Eco Points memakai `NEXT_PUBLIC_SITE_URL`. Kalau nilai ini salah, QR akan menunjuk ke alamat yang tidak bisa dibuka juri. Caranya:

1. Buka project di Vercel, masuk **Settings**, lalu **Environment Variables**.
2. Ubah `NEXT_PUBLIC_SITE_URL` menjadi alamat produksi persis, misalnya `https://nusaflo.vercel.app`.
3. Masuk tab **Deployments**, buka deployment teratas, klik menu titik tiga, pilih **Redeploy**.

Variabel `NEXT_PUBLIC_` ditanam saat build, jadi wajib redeploy setelah diubah.

---

## 7. Opsional: pakai domain sendiri

1. Beli domain (misalnya `nusaflo.id`) di registrar seperti Rumahweb, Namecheap, atau Cloudflare.
2. Di Vercel: **Settings**, lalu **Domains**, klik **Add**, masukkan domain.
3. Vercel menampilkan dua nilai DNS. Di panel registrar, buat:
   - Record `A` untuk `@` menuju `76.76.21.21`, atau ikuti nilai yang ditampilkan Vercel.
   - Record `CNAME` untuk `www` menuju `cname.vercel-dns.com`.
4. Tunggu 5 menit sampai 24 jam. Status di Vercel berubah menjadi **Valid Configuration**.
5. Setelah domain aktif, perbarui `NEXT_PUBLIC_SITE_URL` ke domain baru dan redeploy (langkah 6).

---

## 8. Kalau deploy gagal

| Gejala | Penyebab umum | Tindakan |
| --- | --- | --- |
| Build gagal, ada `Type error` | Kode error atau file setengah tersimpan | Jalankan `npm run build` lokal, perbaiki, commit, push lagi |
| Build gagal, `Module not found` | Ada file tidak ikut ter-commit | Cek `git status`, pastikan file baru ikut `git add` |
| Gambar 404 hanya di Vercel | Nama file beda huruf besar dan kecil. Linux di Vercel peka huruf besar, Windows tidak | Samakan nama file persis dengan yang dipanggil kode, misalnya `motif-kawung.png` |
| Variabel env terbaca kosong | Diubah setelah build | Redeploy |
| Halaman kosong atau error klien | Cek **Runtime Logs** di Vercel, biasanya masalah akses `localStorage` di browser | Uji mode incognito untuk memastikan, lalu perbaiki kode |

---

## 9. Hal yang perlu dijelaskan saat demo

1. Semua data (keranjang, poin, pesanan) disimpan di `localStorage` peramban. Tiap perangkat punya data sendiri, tidak tersinkron. Ini batasan yang sudah diterima untuk tahap ini dan jujur disebut saat demo.
2. Pembayaran masih simulasi. Tidak ada transaksi uang nyata.
3. Nama mitra bank sampah masih penampung dan harus diganti sebelum demo.
4. Alamat web produksi harus dibuka lewat HTTPS. Vercel menyediakan sertifikat otomatis, tidak perlu diatur.

---

## 10. Checklist sebelum presentasi

1. `npm run build` lokal hijau.
2. Deploy terakhir berstatus **Ready** di Vercel.
3. `NEXT_PUBLIC_SITE_URL` sama dengan alamat produksi yang dipakai.
4. QR di Eco Points sudah dipindai dari ponsel lain dan mengarah ke halaman setor yang benar.
5. Alur demo utuh berjalan di ponsel nyata: daftar akun, catat setoran, saldo poin bertambah, checkout sampai pesanan berhasil.
6. Nama mitra bank sampah sudah diganti nama sebenarnya.
7. Semua tautan yang masih `#` sudah dihapus atau diarahkan.
