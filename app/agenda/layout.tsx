import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eco Events",
  description:
    "Ikuti edukasi, workshop, dan aksi lingkungan Harum Wastra. Daftar acara yang akan datang dan lengkapi formulir pendaftarannya.",
  alternates: { canonical: "/agenda" },
  openGraph: {
    title: "Eco Events Harum Wastra",
    description:
      "Edukasi, workshop lilin aromaterapi, dan aksi bersih lingkungan bersama komunitas.",
    url: "/agenda",
  },
};

export default function AgendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
