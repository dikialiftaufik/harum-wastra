import Link from "next/link";
import { formatRupiah, produk } from "@/lib/data";

const langkah = [
  {
    no: "01",
    judul: "Kumpulkan minyak jelantah",
    isi: "Simpan minyak goreng bekas di rumah dalam wadah tertutup. Jangan buang ke saluran air.",
  },
  {
    no: "02",
    judul: "Setor dan pindai QR",
    isi: "Bawa jelantah ke bank sampah mitra, lalu pindai kode QR pada halaman akun Anda.",
  },
  {
    no: "03",
    judul: "Poin masuk ke akun",
    isi: "Setiap liter tercatat otomatis dan berubah menjadi poin yang bisa Anda pantau.",
  },
  {
    no: "04",
    judul: "Tukar atau beli produk",
    isi: "Gunakan poin untuk buket aromaterapi atau souvenir bunga dari Nusaflo.",
  },
];

export default function Beranda() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-maroon">
              Ekonomi sirkular dari dapur
            </p>
            <h1 className="mt-4 text-4xl leading-tight text-maroon sm:text-5xl">
              Ubah minyak jelantah menjadi buket yang bermakna
            </h1>
            <p className="mt-5 max-w-md text-ink/80">
              Nusaflo mengolah minyak goreng bekas menjadi buket bunga lilin
              aromaterapi dan souvenir, dibungkus kertas batik pilihan. Setor
              jelantah, kumpulkan poin, lalu tukar dengan produknya.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/katalog"
                className="rounded-full bg-maroon px-7 py-3 text-cream transition hover:bg-maroon-dark"
              >
                Lihat katalog
              </Link>
              <Link
                href="/setor"
                className="rounded-full border border-maroon px-7 py-3 text-maroon transition hover:bg-maroon/5"
              >
                Setor jelantah
              </Link>
            </div>
            <p className="mt-8 font-mono text-xs uppercase tracking-wider text-clay">
              Buket aromaterapi, souvenir bloom, enam motif batik
            </p>
          </div>

          {/* Kartu produk, pita batik sebagai pembungkus */}
          <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
            <div
              className="h-10"
              style={{
                backgroundImage: "url(/gambar/motif-kawung.svg)",
                backgroundSize: "72px",
                backgroundRepeat: "repeat",
              }}
              aria-hidden="true"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gambar/produk-buket.svg"
              alt="Ilustrasi buket aromaterapi Nusaflo"
              className="w-full"
            />
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-display text-lg text-maroon">
                  Buket Aromaterapi
                </p>
                <p className="text-xs text-clay">
                  Lilin aroma terapi, kertas batik
                </p>
              </div>
              <p className="font-mono text-sm text-maroon">
                {formatRupiah(175000)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pita batik pemisah */}
      <div className="h-14 bg-cream" aria-hidden="true">
        <div
          className="h-full opacity-25"
          style={{
            backgroundImage: "url(/gambar/motif-sekar-jagad.svg)",
            backgroundSize: "112px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Empat langkah */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-maroon">
            Cara kerja
          </p>
          <h2 className="mt-3 text-3xl text-maroon sm:text-4xl">
            Empat langkah dari dapur ke buket
          </h2>
          <p className="mt-4 text-ink/80">
            Seluruh proses bisa Anda ikuti sendiri, dari minyak bekas di dapur
            sampai buket yang siap diberikan.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {langkah.map((l) => (
            <li
              key={l.no}
              className="rounded-2xl border border-ink/10 bg-white p-6"
            >
              <span className="font-mono text-2xl text-maroon">{l.no}</span>
              <h3 className="mt-3 text-lg text-ink">{l.judul}</h3>
              <p className="mt-2 text-sm text-ink/70">{l.isi}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Dua produk */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl text-maroon">Dua produk, enam motif batik</h2>
          <Link
            href="/katalog"
            className="text-sm text-maroon underline underline-offset-4 hover:text-maroon-dark"
          >
            Lihat katalog
          </Link>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {produk.map((p) => (
            <Link
              key={p.slug}
              href={`/produk/${p.slug}`}
              className="group overflow-hidden rounded-3xl border border-ink/10 bg-white transition hover:shadow-md"
            >
              <div
                className="h-10"
                style={{
                  backgroundImage: `url(${p.pita})`,
                  backgroundSize: "72px",
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
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="font-display text-lg text-maroon">{p.nama}</p>
                  <p className="text-xs text-clay">{p.ringkas}</p>
                </div>
                <p className="font-mono text-sm text-maroon">
                  {formatRupiah(p.harga)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Angka dampak, masih perkiraan */}
      <section className="bg-maroon-dark text-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <p className="font-display text-3xl sm:text-4xl">
            3,24 juta kiloliter
          </p>
          <p className="mt-4 text-sm text-cream/80">
            Perkiraan volume minyak goreng bekas yang dihasilkan Indonesia
            setiap tahun. Nusaflo hadir untuk mengubah sebagian darinya menjadi
            nilai, bukan limbah. Angka ini masih berupa perkiraan dan menunggu
            validasi lapangan.
          </p>
        </div>
      </section>
    </>
  );
}
