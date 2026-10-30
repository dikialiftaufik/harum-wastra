"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Logo } from "@/components/Logo";
import { bacaKeranjang } from "@/lib/keranjang";
import { EVENT_SIMPAN } from "@/lib/penyimpanan";

const tautan = [
  { href: "/", label: "Beranda", exact: true },
  { href: "/katalog", label: "Katalog" },
  { href: "/agenda", label: "Eco Events" },
  { href: "/akun", label: "Eco Points" },
];

/* ─── Jumlah item keranjang sebagai sumber eksternal (lintas tab) ─── */

function langgananKeranjang(cb: () => void) {
  window.addEventListener(EVENT_SIMPAN, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT_SIMPAN, cb);
    window.removeEventListener("storage", cb);
  };
}

const potretKeranjang = () =>
  bacaKeranjang().reduce((total, item) => total + item.qty, 0);

const potretServer = () => 0;

export function Navbar() {
  const pathname = usePathname();
  const [buka, setBuka] = useState(false);
  const jumlahItem = useSyncExternalStore(
    langgananKeranjang,
    potretKeranjang,
    potretServer
  );

  /* Menu mobile: tutup dengan Esc dan kunci scroll halaman saat terbuka. */
  useEffect(() => {
    if (!buka) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBuka(false);
    };
    const overflowAsal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflowAsal;
    };
  }, [buka]);

  /* Tutup menu otomatis saat rute berubah (mis. tombol kembali peramban). */
  const [ruteSebelumnya, setRuteSebelumnya] = useState(pathname);
  if (ruteSebelumnya !== pathname) {
    // Penyesuaian saat render: React akan mengulang render sebelum menggambar,
    // jadi menu tidak sempat tampil terbuka di halaman baru.
    setRuteSebelumnya(pathname);
    if (buka) setBuka(false);
  }

  const badge =
    jumlahItem > 0 ? (
      <span
        aria-hidden="true"
        className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cream px-1 text-[11px] font-bold leading-none text-maroon-dark ring-2 ring-white"
      >
        {jumlahItem > 99 ? "99+" : jumlahItem}
      </span>
    ) : null;

  const labelKeranjang =
    jumlahItem > 0
      ? `Keranjang, ${jumlahItem} produk`
      : "Keranjang, belum ada produk";

  return (
    <header className="navbar-wrapper fixed top-0 z-40 w-full px-4 pt-3 sm:px-6">
      <nav
        aria-label="Navigasi utama"
        className="navbar-glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl bg-white/85 px-5 py-3 shadow-sm backdrop-blur-xl sm:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setBuka(false)}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation - centered */}
        <div className="hidden items-center gap-1 md:flex">
          {tautan.map((t) => {
            const aktif = t.exact
              ? pathname === t.href
              : pathname === t.href || pathname.startsWith(t.href + "/");
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={aktif ? "page" : undefined}
                className={`nav-link relative px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                  aktif ? "text-maroon" : "text-ink/65 hover:text-maroon"
                }`}
              >
                {t.label}
                {aktif && (
                  <span className="absolute bottom-0 left-1/2 h-[2.5px] w-6 -translate-x-1/2 rounded-full bg-maroon" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right section: Cart button + User icon */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Cart button - rounded square maroon */}
          <Link
            href="/keranjang"
            aria-label={labelKeranjang}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-maroon text-white transition-all duration-200 hover:bg-maroon-dark hover:shadow-md"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {badge}
          </Link>

          {/* User/Account icon */}
          <Link
            href="/akun"
            aria-label="Akun dan Eco Points"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-ink/55 transition-colors hover:text-maroon"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          </Link>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/keranjang"
            aria-label={labelKeranjang}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-maroon text-white transition-colors hover:bg-maroon-dark"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {badge}
          </Link>

          <button
            type="button"
            onClick={() => setBuka(!buka)}
            aria-label={buka ? "Tutup menu" : "Buka menu"}
            aria-expanded={buka}
            aria-controls="menu-mobile"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {buka ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {buka && (
        <div
          id="menu-mobile"
          className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-ink/5 bg-white/95 shadow-lg backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col px-5 py-3 sm:px-8">
            {tautan.map((t) => {
              const aktif = t.exact
                ? pathname === t.href
                : pathname === t.href || pathname.startsWith(t.href + "/");
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  onClick={() => setBuka(false)}
                  aria-current={aktif ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    aktif ? "text-maroon" : "text-ink/75 hover:text-maroon"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
            <Link
              href="/keranjang"
              onClick={() => setBuka(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-maroon px-4 py-3 text-base font-medium text-white"
            >
              Keranjang
              {jumlahItem > 0 && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
                  {jumlahItem} produk
                </span>
              )}
            </Link>
            <Link
              href="/setor"
              onClick={() => setBuka(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 px-4 py-3 text-base font-medium text-ink/80"
            >
              Cara Setor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
