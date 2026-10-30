type Nada = "maroon" | "cream";

type LogoProps = {
  /** Warna logo. "maroon" untuk latar terang, "cream" untuk latar maroon. */
  nada?: Nada;
  /** Ukuran keseluruhan logo. */
  ukuran?: "sm" | "md" | "lg";
  className?: string;
};

const ukuranMark = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-12 w-12",
} as const;

const ukuranTeks = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
} as const;

export function Logo({
  nada = "maroon",
  ukuran = "md",
  className = "",
}: LogoProps) {
  const warna = nada === "cream" ? "text-cream" : "text-maroon";

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${warna} ${className}`}
      aria-label="Harum Wastra"
    >
      {/* Tunas daun dengan nyala lilin: jelantah yang kembali jadi keindahan */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`shrink-0 ${ukuranMark[ukuran]}`}
      >
        <path d="M16 28V11.5" />
        <path d="M16 21c-4.6 0-7.4-2.9-7.4-7 4.6 0 7.4 2.9 7.4 7Z" />
        <path d="M16 15.8c4.6 0 7.4-2.9 7.4-7-4.6 0-7.4 2.9-7.4 7Z" />
        <path d="M16 10.6c1.9-1.7 2.7-3.4 2.7-4.9a2.7 2.7 0 1 0-5.4 0c0 1.5.8 3.2 2.7 4.9Z" />
      </svg>

      <span
        className={`font-display font-semibold leading-none tracking-tight ${ukuranTeks[ukuran]}`}
      >
        Harum <span className="font-medium italic">Wastra</span>
      </span>
    </span>
  );
}
