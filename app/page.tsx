import Link from "next/link";

const alasan = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    judul: "Lilin dari minyak jelantah",
    isi: "Bahan lilinnya diolah dari minyak goreng bekas hasil setoran warga, bukan minyak baru.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    judul: "Hadiah yang bisa dicabut",
    isi: "Penerimanya mencabut lilin untuk dipakai, sedangkan bungkus batik dan tatakannya tetap dipakai ulang, tidak berakhir jadi sampah plastik.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    judul: "Kertas batik bermakna",
    isi: "Enam motif batik dari berbagai daerah dengan asal dan makna masing-masing, sehingga pesan hangat ikut tersampaikan lewat kertasnya.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    judul: "Poin untuk langkah baik",
    isi: "Setiap liter yang Anda setorkan dicatat sebagai poin dan bisa ditukar dengan produk Nusaflo.",
  },
];

const langkah = [
  {
    no: "01",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    judul: "Kumpulkan minyak jelantah",
    isi: "Simpan minyak goreng bekas di rumah dalam wadah tertutup. Jangan buang ke saluran air.",
  },
  {
    no: "02",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    judul: "Setor dan pindai QR",
    isi: "Bawa jelantah ke bank sampah mitra, lalu pindai kode QR pada halaman akun Anda.",
  },
  {
    no: "03",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    judul: "Poin masuk ke akun",
    isi: "Setiap liter tercatat otomatis dan berubah menjadi poin yang bisa Anda pantau.",
  },
  {
    no: "04",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    judul: "Tukar atau beli produk",
    isi: "Gunakan poin untuk buket aromaterapi atau souvenir bunga dari Nusaflo.",
  },
];

export default function Beranda() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="hero-section relative min-h-[90vh] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/backgrounds/bg-beranda-hero-section.png)",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(105deg, rgba(245,239,230,0.97) 0%, rgba(245,239,230,0.92) 35%, rgba(245,239,230,0.6) 55%, rgba(245,239,230,0.05) 75%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-xl py-20 md:py-28">
            {/* Tagline */}
            <p className="hero-tagline font-mono text-xs font-semibold uppercase tracking-[0.25em] text-maroon">
              Ekonomi Sirkular Untuk Hadiah Bermakna
            </p>

            {/* Heading */}
            <h1 className="mt-6 text-4xl leading-[1.15] text-maroon sm:text-5xl lg:text-[3.4rem]">
              Setor minyak jelantah, tukar jadi hadiah{" "}
              <em className="font-display not-italic" style={{ fontStyle: "italic" }}>
                yang bernilai
              </em>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">
              Kumpulkan poin dari setiap liter minyak goreng bekas yang Anda
              setorkan, lalu tukarkan dengan buket lilin aromaterapi berbalut
              kertas batik khas Nusaflo.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/setor"
                className="hero-btn-primary group inline-flex items-center gap-2.5 rounded-full bg-maroon px-8 py-4 text-base font-medium text-cream transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20"
              >
                Mulai Setor
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="/katalog"
                className="hero-btn-secondary rounded-full border-2 border-maroon/40 px-8 py-4 text-base font-medium text-maroon transition-all duration-300 hover:border-maroon hover:bg-maroon/5"
              >
                Lihat Katalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mengapa Nusaflo ─── */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-maroon">
              Mengapa Nusaflo
            </p>
            <h2 className="mt-4 text-3xl text-maroon sm:text-4xl">
              Empat nilai di balik setiap buket
            </h2>
            <p className="mt-5 text-ink/70">
              Kami merancang setiap buket supaya setelah hadiahnya dipakai,
              tidak ada bagian yang berakhir jadi sampah.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {alasan.map((a) => (
              <div
                key={a.judul}
                className="rounded-2xl border border-ink/8 bg-white p-7 transition-all duration-300 hover:border-maroon/20 hover:shadow-lg hover:shadow-maroon/5"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
                  {a.icon}
                </div>
                <h3 className="text-lg font-semibold text-ink">{a.judul}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
                  {a.isi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cara Kerja (4 Langkah) ─── */}
      <section className="relative bg-white py-20 md:py-28">
        {/* Decorative top border */}
        <div
          className="absolute left-0 right-0 top-0 h-1"
          style={{
            background: "linear-gradient(90deg, transparent, var(--color-maroon), transparent)",
            opacity: 0.15,
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-maroon">
              Cara kerja
            </p>
            <h2 className="mt-4 text-3xl text-maroon sm:text-4xl">
              Empat langkah dari dapur ke buket
            </h2>
            <p className="mt-5 text-ink/70">
              Seluruh proses bisa Anda ikuti sendiri, dari minyak bekas di dapur
              sampai buket yang siap diberikan.
            </p>
          </div>

          <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {langkah.map((l) => (
              <li
                key={l.no}
                className="group relative overflow-hidden rounded-2xl border border-ink/8 bg-cream/50 p-7 transition-all duration-300 hover:border-maroon/20 hover:shadow-lg hover:shadow-maroon/5"
              >
                {/* Step number watermark */}
                <span
                  className="absolute -right-2 -top-4 font-display text-[5rem] font-bold leading-none text-maroon/[0.06] transition-colors duration-300 group-hover:text-maroon/[0.1]"
                  aria-hidden="true"
                >
                  {l.no}
                </span>

                {/* Icon */}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-maroon/10 text-maroon transition-colors duration-300 group-hover:bg-maroon group-hover:text-cream">
                  {l.icon}
                </div>

                <h3 className="text-lg font-semibold text-ink">{l.judul}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
                  {l.isi}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Pita Batik Pemisah ─── */}
      <div className="h-16 bg-cream" aria-hidden="true">
        <div
          className="h-full opacity-20"
          style={{
            backgroundImage: "url(/motif/sekar-jagad.png)",
            backgroundSize: "112px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* ─── Angka Dampak ─── */}
      <section className="relative overflow-hidden bg-maroon-dark text-cream">
        {/* Decorative batik background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url(/motif/kawung.png)",
            backgroundSize: "80px",
            backgroundRepeat: "repeat",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 md:py-24">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">
            Dampak Nyata
          </p>
          <p className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl">
            3,24 juta kiloliter
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/75">
            Perkiraan volume minyak goreng bekas yang dihasilkan Indonesia
            setiap tahun. Nusaflo hadir untuk mengubah sebagian darinya menjadi
            nilai, bukan limbah. Angka ini masih berupa perkiraan dan menunggu
            validasi lapangan.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/setor"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-3.5 text-sm font-medium text-cream transition-all duration-300 hover:border-cream hover:bg-cream/10"
            >
              Mulai Berkontribusi
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
