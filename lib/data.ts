export type Motif = {
  id: string;
  nama: string;
  asal: string;
  makna: string;
  gambar: string;
};

export const motif: Motif[] = [
  {
    id: "kawung",
    nama: "Kawung",
    asal: "Yogyakarta",
    makna:
      "Melambangkan siklus yang berulang dan kesucian, sejalan dengan gagasan ekonomi sirkular yang menjadikan bekas sebagai nilai baru.",
    gambar: "/gambar/motif-kawung.svg",
  },
  {
    id: "sekar-jagad",
    nama: "Sekar Jagad",
    asal: "Solo",
    makna:
      "Berarti bunga dari seluruh penjuru, cocok untuk buket yang kaya bentuk dan warna.",
    gambar: "/gambar/motif-sekar-jagad.svg",
  },
  {
    id: "mega-mendung",
    nama: "Mega Mendung",
    asal: "Cirebon",
    makna:
      "Awan berlapis yang menenangkan, selaras dengan ketenangan dari relaksasi aroma terapi.",
    gambar: "/gambar/motif-mega-mendung.svg",
  },
  {
    id: "parang-rusak",
    nama: "Parang Rusak",
    asal: "Yogyakarta",
    makna:
      "Melambangkan ketekunan dan kekuatan, pas untuk hadiah pada momen formal atau wisuda.",
    gambar: "/gambar/motif-parang-rusak.svg",
  },
  {
    id: "pring-sedapur",
    nama: "Pring Sedapur",
    asal: "Magetan",
    makna:
      "Bermakna kebersamaan dan kelestarian, penuh arti untuk hadiah yang diberikan bersama.",
    gambar: "/gambar/motif-pring-sedapur.svg",
  },
  {
    id: "truntum",
    nama: "Truntum",
    asal: "Solo",
    makna:
      "Berarti cinta yang bersemi kembali, penuh makna untuk hadiah bagi pasangan.",
    gambar: "/gambar/motif-truntum.svg",
  },
];

export type Produk = {
  slug: string;
  nama: string;
  harga: number;
  ringkas: string;
  gambar: string;
  pita: string;
  satuan: string;
};

export const produk: Produk[] = [
  {
    slug: "buket",
    nama: "Buket Aromaterapi",
    harga: 175000,
    ringkas: "Buket bunga lilin dengan aroma terapi, dibungkus kertas batik pilihan.",
    gambar: "/gambar/produk-buket.svg",
    pita: "/gambar/motif-kawung.svg",
    satuan: "per buket",
  },
  {
    slug: "souvenir",
    nama: "Souvenir Bloom",
    harga: 30000,
    ringkas: "Satu kelopak bunga lilin, hadiah kecil yang manis untuk orang terkasih.",
    gambar: "/gambar/produk-souvenir.svg",
    pita: "/gambar/motif-truntum.svg",
    satuan: "per kelopak",
  },
];

export function formatRupiah(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}
