/**
 * Helper penyimpanan peramban dengan penanganan galat terpusat.
 *
 * - Semua pembacaan menangkap JSON rusak dan mengembalikan nilai cadangan,
 *   jadi data lama/rusak tidak pernah membuat halaman gagal render.
 * - Setiap penulisan mengirim event `harum-wastra:simpan` supaya komponen lain
 *   (mis. badge keranjang di navbar) bisa ikut memperbarui diri.
 */

export const EVENT_SIMPAN = "harum-wastra:simpan";

export function bacaJson<T>(kunci: string, cadangan: T): T {
  if (typeof window === "undefined") return cadangan;
  try {
    const mentah = window.localStorage.getItem(kunci);
    if (mentah === null) return cadangan;
    const hasil = JSON.parse(mentah) as T | null;
    return hasil === null ? cadangan : hasil;
  } catch {
    return cadangan;
  }
}

export function tulisJson(kunci: string, nilai: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(kunci, JSON.stringify(nilai));
    window.dispatchEvent(
      new CustomEvent(EVENT_SIMPAN, { detail: { kunci } })
    );
    return true;
  } catch {
    return false;
  }
}

export function hapusKunci(kunci: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.removeItem(kunci);
    window.dispatchEvent(
      new CustomEvent(EVENT_SIMPAN, { detail: { kunci } })
    );
    return true;
  } catch {
    return false;
  }
}

/** Tanggal + jam ringkas untuk riwayat di UI. */
export function waktuRingkas(iso: string): string {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}
