/**
 * Animasi muncul saat digulir.
 *
 * Prinsipnya: konten harus tetap terlihat kalau JavaScript tidak jalan.
 * Karena itu kelas "tersembunyi" (`reveal-tunda`) baru dipasang dari sini,
 * bukan langsung di CSS. Elemen yang sudah ada di layar tidak pernah
 * disembunyikan supaya tidak ada kedipan.
 *
 * Mengembalikan fungsi pembersih.
 */
export function aktifkanReveal(): () => void {
  const semua = Array.from(
    document.querySelectorAll<HTMLElement>(".reveal-on-scroll")
  );
  if (semua.length === 0) return () => {};

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  semua.forEach((el) => {
    const kotak = el.getBoundingClientRect();
    // Hanya sembunyikan yang masih di bawah lipatan layar.
    if (kotak.top > window.innerHeight) {
      el.classList.add("reveal-tunda");
      obs.observe(el);
    }
  });

  return () => obs.disconnect();
}
