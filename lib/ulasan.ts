import { bacaJson, tulisJson } from "./penyimpanan";

export type Ulasan = {
  id: string;
  slug: string;
  nama: string;
  rating: number;
  komentar: string;
  waktu: string;
};

const KUNCI = "harum-wastra-ulasan";

export function bacaUlasan(slug: string): Ulasan[] {
  const data = bacaJson<Ulasan[]>(KUNCI, []);
  if (!Array.isArray(data)) return [];
  return data.filter((u) => u && u.slug === slug);
}

export function tambahUlasan(u: {
  slug: string;
  nama: string;
  rating: number;
  komentar: string;
}): Ulasan {
  const data = bacaJson<Ulasan[]>(KUNCI, []);
  const daftar = Array.isArray(data) ? data : [];
  const baru: Ulasan = {
    ...u,
    id: `ul-${Date.now().toString(36)}`,
    waktu: new Date().toISOString(),
  };
  tulisJson(KUNCI, [baru, ...daftar]);
  return baru;
}
