import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITUS } from "@/lib/situs";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const judulDefault = "Harum Wastra | Buket Bunga Lilin dari Minyak Jelantah";

export const metadata: Metadata = {
  metadataBase: new URL(SITUS.url),
  applicationName: SITUS.nama,
  title: {
    default: judulDefault,
    template: "%s | Harum Wastra",
  },
  description:
    "Buket bunga lilin aromaterapi dari minyak jelantah bekas, dengan kertas pembungkus batik pilihan. Setor jelantah, kumpulkan poin, tukar produk.",
  keywords: [
    "buket lilin aromaterapi",
    "minyak jelantah",
    "batik",
    "hadiah ramah lingkungan",
    "eco points",
    "bank sampah",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITUS.nama,
    url: "/",
    title: judulDefault,
    description:
      "Setor minyak jelantah, kumpulkan Eco Points, lalu tukarkan dengan buket lilin aromaterapi berkertas batik.",
  },
  twitter: {
    card: "summary_large_image",
    title: judulDefault,
    description:
      "Setor minyak jelantah, kumpulkan Eco Points, lalu tukarkan dengan buket lilin aromaterapi berkertas batik.",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#096D73",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${jakarta.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-maroon focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Lewati ke konten
        </a>
        <Navbar />
        {/*
          `min-w-0` penting: main adalah flex item dari body, dan tiap seksi di
          dalamnya juga flex item. Tanpa ini, satu elemen selebar kontennya
          (mis. deretan tab yang tidak boleh patah) akan melebarkan seluruh
          halaman dan memicu scroll horizontal.
        */}
        <main id="konten" className="flex min-w-0 flex-1 flex-col [&>*]:min-w-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
