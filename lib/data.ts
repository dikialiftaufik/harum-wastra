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
    asal: "Jawa Tengah",
    makna:
      "Melambangkan kesucian, kesinambungan dan harapan baik.",
    gambar: "/motif/kawung.png",
  },
  {
    id: "sekar-jagad",
    nama: "Sekar Jagad",
    asal: "Jawa Tengah",
    makna:
      "Melambangkan keindahan bumi dan keberagaman budaya.",
    gambar: "/motif/sekar-jagad.png",
  },
  {
    id: "mega-mendung",
    nama: "Mega Mendung",
    asal: "Cirebon",
    makna:
      "Melambangkan kesabaran, keteduhan, dan pembawa hujan.",
    gambar: "/motif/mega-mendung.png",
  },
  {
    id: "parang-rusak",
    nama: "Parang Rusak",
    asal: "Jawa Tengah",
    makna:
      "Melambangkan keteguhan, keberanian, dan semangat pantang menyerah.",
    gambar: "/motif/parang-rusak.png",
  },
  {
    id: "pring-sedapur",
    nama: "Pring Sedapur",
    asal: "Jawa Tengah",
    makna:
      "Melambangkan kebersamaan, harmoni, dan pertumbuhan.",
    gambar: "/motif/pring-sedapur.png",
  },
  {
    id: "truntum",
    nama: "Truntum",
    asal: "Solo",
    makna:
      "Melambangkan cinta yang tulus dan berkesinambungan.",
    gambar: "/motif/truntum.png",
  },
];

export type Produk = {
  slug: string;
  nama: string;
  namaKatalog: string;
  harga: number;
  hargaMulai: number;
  ringkas: string;
  tagline: string;
  deskripsiKatalog: string;
  deskripsiDetail: string[];
  gambar: string;
  gambarGaleri: string[];
  pita: string;
  satuan: string;
  rating: number;
  ulasan: number;
};

export const produk: Produk[] = [
  {
    slug: "buket",
    nama: "Buket Lilin Aromaterapi",
    namaKatalog: "Buket Lilin Aromaterapi",
    harga: 175000,
    hargaMulai: 89000,
    ringkas: "Buket bunga lilin dengan aroma terapi, dibungkus kertas batik pilihan.",
    tagline: "HADIAH YANG PENUH MAKNA",
    deskripsiKatalog:
      "Rangkaian lilin aromaterapi berbentuk bunga yang dibungkus kertas batik dan dilengkapi tatakan bernilai guna. Hadiah istimewa yang indah, harum, dan lebih ramah lingkungan.",
    deskripsiDetail: [
      "Buket Lilin Aromaterapi dari Nusaflo adalah perpaduan keindahan, keharuman, dan makna dalam satu hadiah istimewa.",
      "Setiap rangkaian berisi lilin aromaterapi berbentuk bunga yang dibuat dengan detail, menghadirkan kehangatan dan aroma menenangkan untuk berbagai momen spesial. Dibungkus dengan kertas batik pilihan yang elegan, buket ini tidak hanya cantik untuk diberikan, tetapi juga lebih ramah lingkungan karena pembungkusnya dapat digunakan kembali.",
      "Cocok untuk hadiah ulang tahun, ucapan terima kasih, anniversary, atau sekadar tanda perhatian untuk orang tersayang. Nusaflo percaya bahwa hadiah yang indah seharusnya juga membawa kebaikan bagi penerima dan lingkungan.",
    ],
    gambar: "/graphics/product.png",
    gambarGaleri: [
      "/graphics/product.png",
      "/graphics/product-deskripsi.png",
      "/graphics/product-details-1.png",
      "/graphics/product-details-2.png",
      "/graphics/product-details-3.png",
    ],
    pita: "/motif/kawung.png",
    satuan: "per buket",
    rating: 5.0,
    ulasan: 99,
  },
  {
    slug: "souvenir",
    nama: "Souvenir Lilin Aromaterapi",
    namaKatalog: "Souvenir Lilin Aromaterapi",
    harga: 30000,
    hargaMulai: 49000,
    ringkas: "Satu kelopak bunga lilin, hadiah kecil yang manis untuk orang terkasih.",
    tagline: "KENANGAN KECIL, DAMPAK BESAR",
    deskripsiKatalog:
      "Souvenir lilin aromaterapi dengan kemasan batik yang elegan dan dapat digunakan kembali. Pilihan tepat untuk acara spesial, sebagai tanda terima kasih yang berkesan dan berkelanjutan.",
    deskripsiDetail: [
      "Souvenir Lilin Aromaterapi dari Nusaflo hadir sebagai pilihan hadiah yang elegan dan bermakna.",
      "Setiap kelopak lilin dibuat dengan cermat dari minyak jelantah yang telah diproses, menghasilkan aroma yang menenangkan dan bentuk yang indah. Dikemas dengan kertas batik pilihan yang dapat digunakan kembali.",
      "Cocok untuk souvenir pernikahan, ulang tahun, atau acara spesial lainnya. Cantik, harum, dan bermakna.",
    ],
    gambar: "/graphics/product-lilin.png",
    gambarGaleri: [
      "/graphics/product-lilin.png",
      "/graphics/product-details-1.png",
      "/graphics/product-details-2.png",
      "/graphics/product-details-3.png",
    ],
    pita: "/motif/truntum.png",
    satuan: "per kelopak",
    rating: 5.0,
    ulasan: 99,
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
