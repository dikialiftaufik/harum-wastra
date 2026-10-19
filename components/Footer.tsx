import Link from "next/link";

export function Footer() {
  return (
    <footer>
      {/* Pita batik pemisah, corak kawung samar di atas latar krem */}
      <div className="h-14 bg-cream" aria-hidden="true">
        <div
          className="h-full opacity-25"
          style={{
            backgroundImage: "url(/gambar/motif-sekar-jagad.svg)",
            backgroundSize: "112px",
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <div className="bg-maroon text-cream">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            <div className="max-w-sm">
              <p className="font-display text-2xl">Nusaflo</p>
              <p className="mt-3 text-sm text-cream/80">
                Buket bunga lilin dan souvenir dari minyak jelantah bekas,
                dibungkus kertas batik pilihan.
              </p>
            </div>

            <div className="flex gap-12">
              <div>
                <p className="text-sm font-semibold">Jelajahi</p>
                <ul className="mt-3 space-y-2 text-sm text-cream/80">
                  <li>
                    <Link href="/katalog" className="hover:text-cream">
                      Katalog
                    </Link>
                  </li>
                  <li>
                    <Link href="/setor" className="hover:text-cream">
                      Setor jelantah
                    </Link>
                  </li>
                  <li>
                    <Link href="/agenda" className="hover:text-cream">
                      Agenda
                    </Link>
                  </li>
                  <li>
                    <Link href="/akun" className="hover:text-cream">
                      Akun dan poin
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold">Motif batik</p>
                <ul className="mt-3 space-y-2 text-sm text-cream/80">
                  <li>Kawung</li>
                  <li>Sekar Jagad</li>
                  <li>Mega Mendung</li>
                  <li>Parang Rusak</li>
                  <li>Pring Sedapur</li>
                  <li>Truntum</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-10 border-t border-cream/20 pt-6 text-xs text-cream/60">
            Nusaflo, bersama bank sampah mitra di Bandung. Seluruh angka pada
            web ini masih berupa perkiraan dan menunggu validasi lapangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
