import { bacaJson, hapusKunci, tulisJson } from "./penyimpanan";

export type ItemKeranjang = {
  key: string;
  slug: string;
  nama: string;
  motifId: string;
  motifNama: string;
  harga: number;
  qty: number;
  gambar: string;
  pita: string;
};

const KUNCI = "harum-wastra-keranjang";

export function bacaKeranjang(): ItemKeranjang[] {
  const data = bacaJson<ItemKeranjang[]>(KUNCI, []);
  return Array.isArray(data) ? data : [];
}

export function simpanKeranjang(items: ItemKeranjang[]) {
  tulisJson(KUNCI, items);
}

export function kosongkanKeranjang() {
  hapusKunci(KUNCI);
}

export function hapusItem(key: string): ItemKeranjang[] {
  const items = bacaKeranjang().filter((i) => i.key !== key);
  simpanKeranjang(items);
  return items;
}

export function ubahQty(key: string, delta: number): ItemKeranjang[] {
  const items = bacaKeranjang();
  const item = items.find((i) => i.key === key);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) return hapusItem(key);
  }
  simpanKeranjang(items);
  return items;
}

export function tambahKeKeranjang(
  item: Omit<ItemKeranjang, "key" | "qty">
): ItemKeranjang[] {
  const items = bacaKeranjang();
  const key = item.slug + "-" + item.motifId;
  const ada = items.find((i) => i.key === key);
  if (ada) {
    ada.qty += 1;
  } else {
    items.push({ ...item, key, qty: 1 });
  }
  simpanKeranjang(items);
  return items;
}

export function totalKeranjang(items: ItemKeranjang[]): number {
  return items.reduce((sum, i) => sum + i.harga * i.qty, 0);
}

export function jumlahItemKeranjang(items: ItemKeranjang[]): number {
  return items.reduce((total, i) => total + i.qty, 0);
}
