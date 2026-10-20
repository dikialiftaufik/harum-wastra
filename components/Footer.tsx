import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/backgrounds/bg-footer.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 bg-maroon-dark/95 text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-12 md:grid-cols-12">
            {/* Col 1 - Logo and description */}
            <div className="md:col-span-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-nusaflo-alt.png"
                alt="Nusaflo"
                className="h-14 w-auto object-contain"
              />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">
                Nusaflo menghadirkan perubahan nyata melalui ekonomi sirkular,
                dengan mengolah minyak jelantah menjadi hadiah bermakna bagi
                Anda dan lingkungan yang lebih baik.
              </p>

              {/* Social icons */}
              <div className="mt-6 flex items-center gap-3">
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream/10 text-cream transition-colors hover:bg-cream/20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream/10 text-cream transition-colors hover:bg-cream/20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href="#"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream/10 text-cream transition-colors hover:bg-cream/20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.05a6.33 6.33 0 0 0-.88-.05 6.34 6.34 0 1 0 6.34 6.34v-6.92A8.16 8.16 0 0 0 20.59 10V6.69h-1z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream/10 text-cream transition-colors hover:bg-cream/20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2 - Navigasi */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-cream/70">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L4.59 22l6.5-4.5C14 19.5 18 18 21 15c4.09-4.09 3.31-10.83 0-12-1.14.42-2.5 1.2-3.5 2.5L17 8z" />
                </svg>
                <p className="font-display text-lg font-bold">Navigasi</p>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-cream/75">
                <li>
                  <Link href="/" className="transition-colors hover:text-cream">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/katalog" className="transition-colors hover:text-cream">
                    Katalog
                  </Link>
                </li>
                <li>
                  <Link href="/agenda" className="transition-colors hover:text-cream">
                    Eco Events
                  </Link>
                </li>
                <li>
                  <Link href="/akun" className="transition-colors hover:text-cream">
                    Eco Points
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3 - Bantuan */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cream/70">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
                <p className="font-display text-lg font-bold">Bantuan</p>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-cream/75">
                <li>
                  <Link href="/setor" className="transition-colors hover:text-cream">
                    Cara Setor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-cream">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/katalog" className="transition-colors hover:text-cream">
                    Tukar Hadiah
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-cream">
                    Peta Situs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4 - Kontak */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-cream/70">
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                <p className="font-display text-lg font-bold">Kontak</p>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-cream/75">
                <li className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  halo@nusaflo.id
                </li>
                <li className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M20.52 3.449C12.831-3.984.106 1.407.101 11.893c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                  +62 812 3456 7890 (WhatsApp)
                </li>
                <li className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Nusaflo Creative Space,<br />Jakarta Selatan</span>
                </li>
              </ul>

              {/* Newsletter */}
              <p className="mt-6 font-display text-sm font-bold text-cream">
                Dapatkan kabar terbaru dari Nusaflo
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="relative flex-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    className="w-full rounded-xl border border-cream/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-cream placeholder:text-cream/40 backdrop-blur-sm focus:border-cream/40 focus:outline-none"
                  />
                </div>
                <button className="shrink-0 rounded-xl bg-maroon px-5 py-3 text-sm font-semibold text-cream transition-all duration-200 hover:bg-maroon/90">
                  Berlangganan
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-6 sm:flex-row">
            <div className="flex items-center gap-3">
              {/* Small leaf icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-cream/50">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L4.59 22l6.5-4.5C14 19.5 18 18 21 15c4.09-4.09 3.31-10.83 0-12-1.14.42-2.5 1.2-3.5 2.5L17 8z" />
              </svg>
              <p className="text-xs text-cream/55">
                © 2025 Nusaflo. Semua hak dilindungi.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden h-5 w-px bg-cream/20 sm:block" />
              <Link href="#" className="text-xs text-cream/55 transition-colors hover:text-cream">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="text-xs text-cream/55 transition-colors hover:text-cream">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
