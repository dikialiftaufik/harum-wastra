import type { ItemKeranjang } from "./keranjang";

export type Pesanan = {
  nomor: string;
  waktu: string;
  items: ItemKeranjang[];
  nama: string;
  telepon: string;
  alamat: string;
  kota: string;
  kodepos: string;
  catatan: string;
  metode: string;
  subtotal: number;
  ongkir: number;
  total: number;
};

const KUNCI = "nusaflo-pesanan-terakhir";

export function buatNomor(): string {
  const d = new Date();
  const ymd =
    d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  const acak = Math.floor(1000 + Math.random() * 9000);
  return `NF-${ymd}-${acak}`;
}

export function simpanPesanan(p: Pesanan) {
  localStorage.setItem(KUNCI, JSON.stringify(p));
}

export function bacaPesananTerakhir(): Pesanan | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(KUNCI) || "null") as Pesanan | null;
  } catch {
    return null;
  }
}

export function formatWaktu(iso: string): string {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}
