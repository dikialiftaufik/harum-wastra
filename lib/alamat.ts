import { bacaJson, tulisJson } from "./penyimpanan";

export type Alamat = {
  id: string;
  label: string;
  nama: string;
  telepon: string;
  jalan: string;
  kota: string;
  kodepos: string;
};

const KUNCI = "harum-wastra-alamat";

/** Alamat awal supaya checkout langsung bisa dipakai pada demo pertama. */
export const ALAMAT_BAWAAN: Alamat = {
  id: "utama",
  label: "Rumah",
  nama: "Diki Alif Taufik",
  telepon: "+62 812 3456 7890",
  jalan: "Jl. Melati No. 12, Rt 03/Rw 01, Kec. Coblong",
  kota: "Bandung",
  kodepos: "40132",
};

export function bacaAlamat(): Alamat[] {
  const data = bacaJson<Alamat[]>(KUNCI, [ALAMAT_BAWAAN]);
  if (!Array.isArray(data) || data.length === 0) return [ALAMAT_BAWAAN];
  return data.filter((a) => a && typeof a.id === "string");
}

export function simpanDaftarAlamat(daftar: Alamat[]): void {
  tulisJson(KUNCI, daftar);
}

export function buatIdAlamat(): string {
  return `alamat-${Date.now().toString(36)}`;
}

export type GalatAlamat = Partial<Record<keyof Omit<Alamat, "id">, string>>;

/** Validasi ringan sebelum alamat dipakai di checkout. */
export function validasiAlamat(
  a: Omit<Alamat, "id">
): GalatAlamat {
  const galat: GalatAlamat = {};
  if (a.nama.trim().length < 3) galat.nama = "Nama penerima minimal 3 huruf.";
  const digit = a.telepon.replace(/\D/g, "");
  if (digit.length < 9) galat.telepon = "Nomor telepon minimal 9 digit.";
  if (a.jalan.trim().length < 10) galat.jalan = "Alamat minimal 10 karakter.";
  if (a.kota.trim().length < 3) galat.kota = "Isi nama kota.";
  if (!/^\d{5}$/.test(a.kodepos.trim())) galat.kodepos = "Kode pos harus 5 angka.";
  return galat;
}
