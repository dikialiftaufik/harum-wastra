import Image from "next/image";

type Nada = "primary" | "light";

type LogoProps = {
  /** Nada logo. "primary" untuk latar terang, "light" untuk latar gelap (footer). */
  nada?: Nada;
  /** Ukuran keseluruhan logo. */
  ukuran?: "sm" | "md" | "lg";
  className?: string;
};

/** Logo sumber berukuran 1680x420 (rasio 4:1), jadi semua ukuran ikut rasio itu. */
const ukuranGambar = {
  sm: { w: 96, h: 24 },
  md: { w: 128, h: 32 },
  lg: { w: 168, h: 42 },
} as const;

export function Logo({
  nada = "primary",
  ukuran = "md",
  className = "",
}: LogoProps) {
  const { w, h } = ukuranGambar[ukuran];

  return (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src="/logo-primary.png"
        alt="Harum Wastra"
        width={w}
        height={h}
        className={`object-contain ${nada === "light" ? "brightness-0 invert" : ""}`}
        priority
      />
    </span>
  );
}
