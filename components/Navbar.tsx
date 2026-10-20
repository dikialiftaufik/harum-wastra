"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const tautan = [
  { href: "/", label: "Beranda", exact: true },
  { href: "/katalog", label: "Katalog" },
  { href: "/agenda", label: "Eco Events" },
  { href: "/akun", label: "Eco Points" },
];

export function Navbar() {
  const pathname = usePathname();
  const [buka, setBuka] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setBuka(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-nusaflo.png"
            alt="Logo Nusaflo"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {tautan.map((t) => {
            const aktif = t.exact
              ? pathname === t.href
              : pathname === t.href || pathname.startsWith(t.href + "/");
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                  aktif
                    ? "text-maroon"
                    : "text-ink/60 hover:text-maroon"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>

        {/* Right section: Keranjang + Profile icon */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Keranjang button */}
          <Link
            href="/keranjang"
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-2.5 text-sm font-medium text-cream transition-all duration-200 hover:bg-maroon-dark hover:shadow-md"
          >
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
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            Keranjang
          </Link>

          {/* Separator */}
          <div className="h-6 w-px bg-ink/10" aria-hidden="true" />

          {/* User/Account icon */}
          <Link
            href="/akun"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink/50 transition-colors hover:text-maroon"
            aria-label="Akun"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setBuka(!buka)}
          aria-label={buka ? "Tutup menu" : "Buka menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
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
      </nav>

      {/* Mobile menu */}
      {buka && (
        <div className="border-t border-ink/5 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3 sm:px-8">
            {tautan.map((t) => {
              const aktif = t.exact
                ? pathname === t.href
                : pathname === t.href || pathname.startsWith(t.href + "/");
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  onClick={() => setBuka(false)}
                  className={`rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    aktif ? "text-maroon" : "text-ink/70 hover:text-maroon"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
            <Link
              href="/keranjang"
              onClick={() => setBuka(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-4 py-3 text-base font-medium text-cream"
            >
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
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Keranjang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
