import Link from "next/link";
import Image from "next/image";
import { StatCard } from "@/components/AnimatedCounter";

export default function Beranda() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="hero-section relative min-h-[92vh] overflow-hidden reveal-up">
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
              "linear-gradient(105deg, rgba(245,239,230,0.97) 0%, rgba(245,239,230,0.93) 38%, rgba(245,239,230,0.65) 55%, rgba(245,239,230,0.1) 72%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-5 sm:px-8">
          <div className="max-w-[580px] py-20 md:py-28">
            {/* Tagline */}
            <p className="hero-tagline font-mono text-xs font-semibold uppercase tracking-[0.25em] text-clay">
              Ekonomi Sirkular Untuk Hadiah Bermakna
            </p>

            {/* Heading */}
            <h1 className="mt-6 font-display text-[2.6rem] leading-[1.12] text-maroon sm:text-5xl lg:text-[3.5rem]">
              Setor minyak jelantah,{" "}
              <br className="hidden sm:block" />
              tukar jadi hadiah{" "}
              <br className="hidden sm:block" />
              yang bernilai
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[500px] text-[0.95rem] leading-[1.75] text-ink/70 sm:text-base">
              Minyak jelantah yang Anda setor di bank sampah mitra
              akan dikonversi menjadi poin. Poin tersebut dapat
              ditukar dengan buket lilin aromaterapi yang dibungkus
              kertas batik penuh makna. Lilinnya dapat dicabut,
              sementara pembungkus dan tatakannya tetap bernilai
              dan dapat digunakan kembali, sehingga tidak menjadi
              sampah.
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
                className="hero-btn-secondary rounded-full border-2 border-maroon/30 px-8 py-4 text-base font-medium text-maroon transition-all duration-300 hover:border-maroon hover:bg-maroon/5"
              >
                Lihat Katalog
              </Link>
            </div>

            {/* Bottom tagline with line */}
            <div className="mt-14 flex items-center gap-4">
              <span className="h-px w-10 bg-clay/40" />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-clay/70">
                Dari Dapur Ke Hadiah
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mengapa Harum Wastra ─── */}
      <section className="mengapa-section relative overflow-hidden reveal-up">
        {/* Full background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/backgrounds/bg-beranda-mengapa-harum-wastra.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          {/* Section header - centered */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-maroon">
              Mengapa Harum Wastra?
            </p>
            <h2 className="mt-5 font-display text-[2.4rem] leading-[1.15] text-ink sm:text-5xl lg:text-[3.2rem]">
              Pilihan sederhana,
              <br />
              <span className="text-maroon">dampak yang lebih luas</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/70">
              Harum Wastra hadir untuk menghubungkan niat baik Anda di dapur
              dengan hadiah yang bermakna, sekaligus lingkungan yang lebih bersih.
            </p>
          </div>

          {/* 4 cards with graphic icons */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 - Mulai dari dapur Anda */}
            <div className="mengapa-card reveal-stagger-1 flex flex-col items-center text-center">
              <div className="mb-4 h-44 w-44">
                <Image
                  src="/graphics/house.png"
                  alt="Mulai dari dapur Anda"
                  width={176}
                  height={176}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-ink">
                Mulai dari dapur<br />Anda
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Minyak jelantah yang biasanya dibuang, kini bisa dikumpulkan
                dan disetor ke bank sampah mitra.
              </p>
              <span className="mt-5 h-[3px] w-8 rounded-full bg-maroon" />
            </div>

            {/* Card 2 - Dikonversi menjadi poin */}
            <div className="mengapa-card reveal-stagger-2 flex flex-col items-center text-center">
              <div className="mb-4 h-44 w-44">
                <Image
                  src="/graphics/points.png"
                  alt="Dikonversi menjadi poin"
                  width={176}
                  height={176}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-ink">
                Dikonversi<br />menjadi poin
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Setiap liter jelantah yang Anda setor akan tercatat dan
                dikonversi menjadi poin yang dapat digunakan.
              </p>
              <span className="mt-5 h-[3px] w-8 rounded-full bg-maroon" />
            </div>

            {/* Card 3 - Ditukar dengan hadiah bermakna */}
            <div className="mengapa-card reveal-stagger-3 flex flex-col items-center text-center">
              <div className="mb-4 h-44 w-44">
                <Image
                  src="/graphics/gift.png"
                  alt="Ditukar dengan hadiah bermakna"
                  width={176}
                  height={176}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-ink">
                Ditukar dengan<br />hadiah bermakna
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Poin dapat ditukarkan dengan buket bunga lilin aromaterapi
                dengan kertas batik dan tatakan yang tetap bernilai.
              </p>
              <span className="mt-5 h-[3px] w-8 rounded-full bg-maroon" />
            </div>

            {/* Card 4 - Bersama menjaga lingkungan */}
            <div className="mengapa-card reveal-stagger-4 flex flex-col items-center text-center">
              <div className="mb-4 h-44 w-44">
                <Image
                  src="/graphics/earth.png"
                  alt="Bersama menjaga lingkungan"
                  width={176}
                  height={176}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-ink">
                Bersama menjaga<br />lingkungan
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Mengurangi pencemaran minyak jelantah dan mendorong ekonomi
                sirkular untuk masa depan yang lebih baik.
              </p>
              <span className="mt-5 h-[3px] w-8 rounded-full bg-maroon" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Cara Kerja (4 Langkah) ─── */}
      <section className="cara-kerja-section relative overflow-hidden reveal-up">
        {/* Full background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/backgrounds/bg-beranda-cara-kerja.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          {/* Section header - left aligned */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-clay">
                Cara Kerja
              </p>
              <span className="h-px w-12 bg-maroon/30" />
            </div>
            <h2 className="mt-4 font-display text-[2.4rem] leading-[1.12] text-ink sm:text-5xl lg:text-[3.2rem]">
              <span className="text-maroon">Empat langkah</span>{" "}
              dari dapur ke buket
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70">
              Minyak jelantah yang Anda setor di bank sampah mitra akan dikonversi menjadi poin.
              Poin tersebut dapat ditukar dengan buket lilin aromaterapi yang dibungkus kertas batik
              penuh makna, sehingga tidak hanya mengurangi sampah, tetap juga menjadi hadiah bernilai.
            </p>
          </div>

          {/* 4 Step Cards */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="cara-kerja-card reveal-stagger-1 group overflow-hidden rounded-2xl bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-maroon text-sm font-bold text-cream">
                  01
                </span>
                <Image
                  src="/graphics/cara-kerja-1.png"
                  alt="Kumpulkan minyak jelantah"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Text */}
              <div className="p-5">
                <div className="mb-3 flex items-start gap-3">
                  {/* Bottle icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10 text-maroon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 2h4v4l2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l2-2V2z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug text-maroon">
                    Kumpulkan<br />minyak jelantah
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-ink/65">
                  Simpan minyak goreng bekas di wadah tertutup di rumah sampai siap disetor.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="cara-kerja-card reveal-stagger-2 group overflow-hidden rounded-2xl bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden">
                <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-maroon text-sm font-bold text-cream">
                  02
                </span>
                <Image
                  src="/graphics/cara-kerja-2.png"
                  alt="Setor dan pindai QR"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10 text-maroon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug text-maroon">
                    Setor dan<br />pindai QR
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-ink/65">
                  Datangi bank sampah mitra, serahkan jelantah, lalu pindai QR untuk mencatat setoran.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="cara-kerja-card reveal-stagger-3 group overflow-hidden rounded-2xl bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden">
                <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-maroon text-sm font-bold text-cream">
                  03
                </span>
                <Image
                  src="/graphics/cara-kerja-3.png"
                  alt="Poin masuk ke akun"
                  width={400}
                  height={300}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10 text-maroon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug text-maroon">
                    Poin masuk<br />ke akun
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-ink/65">
                  Setiap liter yang tercatat akan menambah Eco Points ke akun Anda secara ilustratif.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="cara-kerja-card reveal-stagger-4 group overflow-hidden rounded-2xl bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden">
                <span className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-maroon text-sm font-bold text-cream">
                  04
                </span>
                <Image
                  src="/graphics/cara-kerja-4.png"
                  alt="Tukar atau beli produk"
                  width={400}
                  height={300}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon/10 text-maroon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 12 20 22 4 22 4 12" />
                      <rect x="2" y="7" width="20" height="5" />
                      <line x1="12" y1="22" x2="12" y2="7" />
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg font-bold leading-snug text-maroon">
                    Tukar atau<br />beli produk
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-ink/65">
                  Gunakan poin untuk menukar hadiah Harum Wastra. Lilinnya dapat dicabut, sementara pembungkus batik dan tatakannya tetap bernilai dan bisa digunakan kembali.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button - centered */}
          <div className="mt-14 flex justify-center">
            <Link
              href="/setor"
              className="group inline-flex items-center gap-2.5 rounded-full bg-maroon px-10 py-4 text-base font-medium text-cream transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/20"
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
          </div>

          {/* Bottom tagline with lines */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-clay/40" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-clay/70">
              Dari Dapur Ke Hadiah
            </p>
            <span className="h-px w-10 bg-clay/40" />
          </div>

          {/* Scroll down indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/60 text-ink/40 transition-colors hover:border-maroon/30 hover:text-maroon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Angka Dampak ─── */}
      <section className="angka-dampak-section relative overflow-hidden reveal-up">
        {/* Full background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/backgrounds/bg-beranda-angka-dampak.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          {/* Section header - centered */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-maroon">
              Angka Dampak
            </p>
            <h2 className="mt-5 font-display text-[2.4rem] leading-[1.12] text-ink sm:text-5xl lg:text-[3.2rem]">
              <span className="text-maroon">Dampak nyata</span>
              <br />
              dari langkah sederhana Anda
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/70">
              Setiap liter minyak jelantah yang disetor tidak hanya menjadi poin,
              tetapi juga membantu lingkungan yang lebih bersih dan masa depan yang lebih baik.
            </p>
          </div>

          {/* 4 Stats Cards with Animated Counters */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stat 1 - Liter Minyak */}
            <StatCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L4.59 22l6.5-4.5C14 19.5 18 18 21 15c4.09-4.09 3.31-10.83 0-12-1.14.42-2.5 1.2-3.5 2.5L17 8z" />
                  <path d="M2 12s4-2 8 2" />
                </svg>
              }
              value={1250}
              label="Liter Minyak Jelantah"
              description="Berhasil dikumpulkan melalui bank sampah mitra."
              suffix="+"
              duration={2200}
              delay={0}
            />

            {/* Stat 2 - Orang Berpartisipasi */}
            <StatCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              value={850}
              label="Orang Berpartisipasi"
              description="Masyarakat yang telah bergabung dan setia menyetor jelantah."
              suffix="+"
              duration={2400}
              delay={0.15}
            />

            {/* Stat 3 - CO2 Terkurang */}
            <StatCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <text x="5" y="16" fontSize="10" fill="currentColor" stroke="none" fontWeight="600">CO₂</text>
                </svg>
              }
              value={2.8}
              label="Potensi Emisi Terkurang"
              description="Setara dengan mengurangi pencemaran lingkungan."
              prefix=""
              suffix=" Ton"
              decimals={1}
              duration={2600}
              delay={0.3}
            />

            {/* Stat 4 - Buket Ditukarkan */}
            <StatCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              }
              value={400}
              label="Buket Telah Ditukarkan"
              description="Menjadi hadiah bermakna dengan kertas batik yang tetap bernilai."
              suffix="+"
              duration={2800}
              delay={0.45}
            />
          </div>
        </div>
      </section>
    </>
  );
}
