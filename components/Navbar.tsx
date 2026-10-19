"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const tautan = [
  { href: "/katalog", label: "Katalog" },
  { href: "/setor", label: "Setor" },
  { href: "/agenda", label: "Agenda" },
  { href: "/akun", label: "Akun" },
];

export function Navbar() {
  const pathname = usePathname();
  const [buka, setBuka] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setBuka(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-nusaflo.png"
            alt="Logo Nusaflo"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-display text-xl text-maroon">Nusaflo</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {tautan.map((t) => {
            const aktif =
              pathname === t.href || pathname.startsWith(t.href + "/");
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  aktif ? "text-maroon" : "text-ink/70 hover:text-maroon"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
          <Link
            href="/keranjang"
            className="ml-2 rounded-full bg-maroon px-5 py-2 text-sm text-cream transition hover:bg-maroon-dark"
          >
            Keranjang
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setBuka(!buka)}
          aria-label={buka ? "Tutup menu" : "Buka menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
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

      {buka && (
        <div className="border-t border-ink/10 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {tautan.map((t) => {
              const aktif =
                pathname === t.href || pathname.startsWith(t.href + "/");
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  onClick={() => setBuka(false)}
                  className={`rounded-lg px-3 py-3 text-base ${
                    aktif ? "text-maroon" : "text-ink/80"
                  }`}
                >
                  {t.label}
                </Link>
              );
            })}
            <Link
              href="/keranjang"
              onClick={() => setBuka(false)}
              className="mt-1 rounded-lg bg-maroon px-3 py-3 text-base text-cream"
            >
              Keranjang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
