import { bacaJson, tulisJson } from "./penyimpanan";

export type VoucherKatalog = {
  id: string;
  ikon: "percent" | "rupiah" | "ongkir";
  judul: string;
  deskripsi: string;
  poin: number;
};

export const VOUCHER: VoucherKatalog[] = [
  {
    id: "diskon-10",
    ikon: "percent",
    judul: "Voucher Diskon 10%",
    deskripsi: "Dapatkan diskon 10% untuk semua produk Harum Wastra.",
    poin: 5000,
  },
  {
    id: "potongan-25k",
    ikon: "rupiah",
    judul: "Voucher Potongan Rp25.000",
    deskripsi: "Potongan Rp25.000 untuk pembelian minimal Rp100.000.",
    poin: 10000,
  },
  {
    id: "gratis-ongkir",
    ikon: "ongkir",
    judul: "Gratis Ongkir",
    deskripsi: "Voucher gratis ongkir untuk pembelian di website Harum Wastra.",
    poin: 7500,
  },
];

export type VoucherDimiliki = {
  kode: string;
  voucherId: string;
  judul: string;
  poin: number;
  waktu: string;
};

const KUNCI = "harum-wastra-voucher";

export function formatPoin(n: number): string {
  return `${n.toLocaleString("id-ID")} Poin`;
}

export function bacaVoucherDimiliki(): VoucherDimiliki[] {
  const data = bacaJson<VoucherDimiliki[]>(KUNCI, []);
  return Array.isArray(data) ? data : [];
}

/** Kode unik sederhana, cukup untuk ditunjukkan pada halaman demo. */
export function buatKodeVoucher(): string {
  const acak = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `HW-${acak}`;
}

/**
 * Catat voucher yang ditukar. Saldo poin pada halaman Eco Points bersifat
 * ilustratif, jadi penukaran hanya mencatat kepemilikan voucher tanpa
 * mengurangi angka saldo.
 */
export function tukarVoucher(v: VoucherKatalog): VoucherDimiliki {
  const item: VoucherDimiliki = {
    kode: buatKodeVoucher(),
    voucherId: v.id,
    judul: v.judul,
    poin: v.poin,
    waktu: new Date().toISOString(),
  };
  const daftar = [item, ...bacaVoucherDimiliki()];
  tulisJson(KUNCI, daftar);
  return item;
}
