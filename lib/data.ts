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
    gambar: "/motif/kawung.png",
  },
  {
    id: "sekar-jagad",
    nama: "Sekar Jagad",
    asal: "Solo",
    makna:
      "Berarti bunga dari seluruh penjuru, cocok untuk buket yang kaya bentuk dan warna.",
    gambar: "/motif/sekar-jagad.png",
  },
  {
    id: "mega-mendung",
    nama: "Mega Mendung",
    asal: "Cirebon",
    makna:
      "Awan berlapis yang menenangkan, selaras dengan ketenangan dari relaksasi aroma terapi.",
    gambar: "/motif/mega-mendung.png",
  },
  {
    id: "parang-rusak",
    nama: "Parang Rusak",
    asal: "Yogyakarta",
    makna:
      "Melambangkan ketekunan dan kekuatan, pas untuk hadiah pada momen formal atau wisuda.",
    gambar: "/motif/parang-rusak.png",
  },
  {
    id: "pring-sedapur",
    nama: "Pring Sedapur",
    asal: "Magetan",
    makna:
      "Bermakna kebersamaan dan kelestarian, penuh arti untuk hadiah yang diberikan bersama.",
    gambar: "/motif/pring-sedapur.png",
  },
  {
    id: "truntum",
    nama: "Truntum",
    asal: "Solo",
    makna:
      "Berarti cinta yang bersemi kembali, penuh makna untuk hadiah bagi pasangan.",
    gambar: "/motif/truntum.png",
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
    pita: "/motif/kawung.png",
    satuan: "per buket",
  },
  {
    slug: "souvenir",
    nama: "Souvenir Bloom",
    harga: 30000,
    ringkas: "Satu kelopak bunga lilin, hadiah kecil yang manis untuk orang terkasih.",
    gambar: "/gambar/produk-souvenir.svg",
    pita: "/motif/truntum.png",
    satuan: "per kelopak",
  },
];

export function formatRupiah(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

export type Acara = {
  judul: string;
  tanggal: string;
  lokasi: string;
  ringkas: string;
  status: string;
};

// Acara masih berupa rencana. Tanggal dan lokasi tetap ditulis agar halaman tidak kosong.
export const acara: Acara[] = [
  {
    judul: "Lomba Daur Ulang Jelantah",
    tanggal: "8 November 2026",
    lokasi: "Bandung",
    ringkas:
      "Ajak warga mengumpulkan minyak goreng bekas dan mengubahnya menjadi produk bernilai.",
    status: "Akan datang",
  },
  {
    judul: "Workshop Buket Lilin Aromaterapi",
    tanggal: "22 November 2026",
    lokasi: "Bandung",
    ringkas:
      "Belajar membuat buket bunga lilin dari jelantah bersama perajin Nusaflo.",
    status: "Akan datang",
  },
  {
    judul: "Panen Poin Bank Sampah",
    tanggal: "13 Desember 2026",
    lokasi: "Bandung",
    ringkas:
      "Penukaran poin menjadi produk bagi penyetor jelantah se-Bandung.",
    status: "Akan datang",
  },
];
