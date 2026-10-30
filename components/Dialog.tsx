"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

type DialogProps = {
  buka: boolean;
  onTutup: () => void;
  judul: string;
  /** Kalimat penjelas di bawah judul. */
  deskripsi?: string;
  /** Ikon/tanda di bagian atas (mis. centang sukses). */
  ikon?: ReactNode;
  /** Isi tambahan di antara deskripsi dan tombol aksi. */
  children?: ReactNode;
  /** Tombol aksi di bagian bawah. */
  aksi?: ReactNode;
};

/**
 * Dialog sederhana yang bisa dipakai ulang: mengunci scroll halaman,
 * menutup dengan Esc/klik latar, menjebak fokus Tab di dalam panel, dan
 * mengembalikan fokus ke elemen pemicu saat ditutup.
 */
export function Dialog({
  buka,
  onTutup,
  judul,
  deskripsi,
  ikon,
  children,
  aksi,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const tutupRef = useRef<HTMLButtonElement>(null);
  const onTutupRef = useRef(onTutup);
  const idJudul = useId();
  const idDeskripsi = useId();

  // Simpan callback terbaru setelah render supaya efek di bawah cukup
  // bergantung pada `buka` dan tidak melepas fokus setiap kali induk render.
  useEffect(() => {
    onTutupRef.current = onTutup;
  });

  useEffect(() => {
    if (!buka) return;

    const pemicu = document.activeElement as HTMLElement | null;
    const overflowAsal = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onTutupRef.current();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const fokusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

      if (fokusable.length === 0) {
        e.preventDefault();
        return;
      }

      const pertama = fokusable[0];
      const terakhir = fokusable[fokusable.length - 1];

      if (e.shiftKey && document.activeElement === pertama) {
        e.preventDefault();
        terakhir.focus();
      } else if (!e.shiftKey && document.activeElement === terakhir) {
        e.preventDefault();
        pertama.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    tutupRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflowAsal;
      pemicu?.focus?.();
    };
  }, [buka]);

  if (!buka) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => onTutupRef.current()}
        className="dialog-tirai absolute inset-0 cursor-default bg-ink/45 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idJudul}
        aria-describedby={deskripsi ? idDeskripsi : undefined}
        className="dialog-panel relative w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl border border-ink/10 bg-white p-6 text-center shadow-2xl sm:p-7"
      >
        <button
          ref={tutupRef}
          type="button"
          onClick={() => onTutupRef.current()}
          aria-label="Tutup dialog"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>

        {ikon && <div className="mx-auto mb-4 mt-2">{ikon}</div>}

        <h2 id={idJudul} className="font-display text-xl font-bold text-ink sm:text-2xl">
          {judul}
        </h2>

        {deskripsi && (
          <p id={idDeskripsi} className="mt-2 text-sm leading-relaxed text-ink/65">
            {deskripsi}
          </p>
        )}

        {children}

        {aksi && <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">{aksi}</div>}
      </div>
    </div>
  );
}
