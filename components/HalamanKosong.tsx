import Link from "next/link";

export function HalamanKosong({ judul }: { judul: string }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl text-maroon">{judul}</h1>
      <p className="max-w-md text-clay">
        Halaman ini masih kosong. Isinya dikerjakan pada blok berikutnya.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-maroon px-6 py-2 text-cream hover:bg-maroon-dark"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
