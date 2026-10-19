export type Profil = { telepon: string };

export type Setoran = {
  id: string;
  waktu: string;
  liter: number;
  poin: number;
  lokasi: string;
};

// Nilai ilustratif, menunggu validasi HPP dan perjanjian bank sampah.
export const POIN_PER_LITER = 1000;
export const RUPIAH_PER_POIN = 10;
export const LOKASI_SETORAN = "Bank Sampah Mitra Bandung";

const KUNCI_PROFIL = "nusaflo-profil";
const KUNCI_SETORAN = "nusaflo-setoran";
const KUNCI_SALDO = "nusaflo-poin-saldo";

function baca<T>(kunci: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const mentah = localStorage.getItem(kunci);
    if (mentah === null) return fallback;
    return JSON.parse(mentah) as T;
  } catch {
    return fallback;
  }
}

function tulis(kunci: string, nilai: unknown) {
  localStorage.setItem(kunci, JSON.stringify(nilai));
}

export function bacaProfil(): Profil | null {
  return baca<Profil | null>(KUNCI_PROFIL, null);
}

export function simpanProfil(telepon: string) {
  tulis(KUNCI_PROFIL, { telepon });
}

// Riwayat setoran bersifat tambah-saja, tidak pernah diubah atau dihapus.
export function bacaSetoran(): Setoran[] {
  return baca<Setoran[]>(KUNCI_SETORAN, []);
}

// Saldo poin adalah proyeksi yang disimpan supaya cepat ditampilkan.
export function saldoPoin(): number {
  return baca<number>(KUNCI_SALDO, 0);
}

export function totalLiter(): number {
  return bacaSetoran().reduce((s, x) => s + x.liter, 0);
}

export function tambahSetoran(liter: number, lokasi: string): Setoran {
  const poin = Math.round(liter * POIN_PER_LITER);
  const s: Setoran = {
    id: "ST-" + Date.now(),
    waktu: new Date().toISOString(),
    liter,
    poin,
    lokasi,
  };
  const daftar = bacaSetoran();
  daftar.push(s);
  tulis(KUNCI_SETORAN, daftar);
  tulis(KUNCI_SALDO, saldoPoin() + poin);
  return s;
}

export function formatWaktu(iso: string): string {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}
