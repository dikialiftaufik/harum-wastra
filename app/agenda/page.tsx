"use client";

import { useState } from "react";
import Image from "next/image";
import { acara, type Acara } from "@/lib/data";
import { GambarLatar } from "@/components/GambarLatar";
import { MotifTile } from "@/components/MotifTile";

const KATEGORI_ALL = "Semua";
const KATEGORI_LIST = [KATEGORI_ALL, "Edukasi", "Workshop", "Aksi Lingkungan", "Komunitas"] as const;

export default function Agenda() {
  const [activeKategori, setActiveKategori] = useState<string>(KATEGORI_ALL);
  const [selectedEvent, setSelectedEvent] = useState<Acara | null>(null);

  const filtered =
    activeKategori === KATEGORI_ALL
      ? acara
      : acara.filter((a) => a.kategori === activeKategori);

  if (selectedEvent) {
    return (
      <EventRegistration
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
      />
    );
  }

  return (
    <>
      {/* ─── Hero Section ─── */}
      {/* Banner full-bleed memakai komposisi asli aset: sisi kiri sengaja kosong untuk teks */}
      <section className="eco-events-hero relative flex min-h-[420px] items-center overflow-hidden bg-cream pt-28 pb-20 md:min-h-[520px] md:pt-32 md:pb-24">
        <GambarLatar
          src="/backgrounds/bg-eco-events-hero.png"
          posisi="left center"
          prioritas
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-16">
          <div className="eco-events-hero-text max-w-xl">
            <p className="eco-events-label font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">
              ECO EVENTS
            </p>
            <h1 className="eco-events-heading mt-4 font-display text-4xl leading-[1.15] text-ink italic sm:text-5xl lg:text-[3.5rem]">
              Langkah kecil,{" "}
              <br className="hidden sm:block" />
              dampak besar{" "}
              <br className="hidden sm:block" />
              untuk lingkungan
            </h1>
            <p className="eco-events-desc mt-6 max-w-lg text-base leading-relaxed text-ink/70">
              Ikuti berbagai kegiatan Harum Wastra yang mengajak kita untuk lebih
              peduli pada bumi melalui edukasi, workshop, dan aksi nyata
              bersama komunitas.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Event Listing Section ─── */}
      <section className="eco-events-listing relative bg-cream pb-16 md:pb-24">
        <MotifTile id="kawung" ukuran={100} className="opacity-5" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          {/* Section Header with Filter */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">
                DAFTAR ACARA
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink italic sm:text-4xl">
                <span className="font-normal">Kegiatan </span>yang Akan Datang
              </h2>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {KATEGORI_LIST.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setActiveKategori(k)}
                  className={`eco-filter-btn rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeKategori === k
                      ? "border-maroon bg-maroon text-white shadow-md shadow-maroon/20"
                      : "border-ink/15 bg-white text-ink/70 hover:border-maroon/40 hover:text-maroon"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Event Cards Grid */}
          {filtered.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((event, idx) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={idx}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          ) : (
            /* Empty state: kategori tanpa acara tetap punya tampilan yang utuh */
            <div className="mt-10 rounded-2xl border border-dashed border-ink/20 bg-white/70 px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-maroon/10">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-maroon"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">
                Belum ada acara untuk kategori {activeKategori}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/65">
                Acara baru ditambahkan secara berkala. Sementara itu, lihat semua
                kegiatan yang sedang dibuka.
              </p>
              <button
                type="button"
                onClick={() => setActiveKategori(KATEGORI_ALL)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark"
              >
                Tampilkan semua acara
              </button>
            </div>
          )}

          {/* Reset filter — hanya muncul saat filter aktif */}
          {activeKategori !== KATEGORI_ALL && filtered.length > 0 && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setActiveKategori(KATEGORI_ALL)}
                className="group inline-flex items-center gap-3 rounded-full border border-ink/15 bg-white px-8 py-3.5 text-sm font-medium text-ink/80 transition-all duration-300 hover:border-maroon/40 hover:text-maroon hover:shadow-lg hover:shadow-maroon/5"
              >
                Lihat Semua Acara
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ─── Event Card Component ─── */
function EventCard({
  event,
  index,
  onClick,
}: {
  event: Acara;
  index: number;
  onClick: () => void;
}) {
  // Category color map
  const kategoriColor: Record<string, string> = {
    Edukasi: "bg-maroon/10 text-maroon",
    Workshop: "bg-maroon/10 text-maroon",
    "Aksi Lingkungan": "bg-maroon/10 text-maroon",
    Komunitas: "bg-maroon/10 text-maroon",
  };

  return (
    <div className="reveal-up" style={{ animationDelay: `${index * 0.12}s` }}>
      <div
        role="button"
        tabIndex={0}
        aria-label={`Lihat detail dan daftar acara ${event.judul}`}
        className="eco-event-card group h-full cursor-pointer overflow-hidden rounded-2xl border border-ink/8 bg-white hover:border-maroon/20 hover:shadow-xl focus-visible:border-maroon/40"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
      >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.gambar}
          alt={event.judul}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Date Badge - top left */}
        <div className="absolute top-4 left-4 flex flex-col items-center rounded-xl bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-sm">
          <span className="text-2xl font-bold leading-none text-ink">
            {event.tanggalHari}
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-ink/60">
            {event.tanggalBulan}
          </span>
        </div>

        {/* Category Badge - top right */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-block rounded-lg px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${
              kategoriColor[event.kategori] || "bg-ink/10 text-ink"
            } bg-white/90`}
          >
            {event.kategori}
          </span>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-maroon">
          {event.judul}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">
          {event.ringkas}
        </p>

        {/* Meta info */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-ink/60">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="shrink-0 text-maroon/70"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.lokasi}
          </div>
          <div className="flex items-center gap-2 text-sm text-ink/60">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="shrink-0 text-maroon/70"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {event.waktu}
          </div>
          <div className="flex items-center gap-2 text-sm text-ink/60">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="shrink-0 text-maroon/70"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Kuota {event.kuota}
          </div>
        </div>

        {/* Arrow CTA */}
        <div className="mt-5 flex items-center justify-end">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-maroon/30">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

/* ─── Event Registration Page ─── */
function EventRegistration({
  event,
  onBack,
}: {
  event: Acara;
  onBack: () => void;
}) {
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    email: "",
    jumlahPeserta: "1 peserta",
    domisili: "",
    catatan: "",
    setuju: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ─── Hero Banner ─── */}
      <section className="eco-events-hero relative overflow-hidden bg-cream pt-24 pb-10 md:pt-28 md:pb-14">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/90 to-cream/60" />
        <MotifTile id="truntum" ukuran={100} className="opacity-10" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          <p className="eco-events-label font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">
            PENDAFTARAN ACARA
          </p>
          <h1 className="eco-events-heading mt-4 font-display text-3xl leading-[1.15] text-ink italic sm:text-4xl lg:text-[2.8rem]">
            Daftar untuk ikut acara{" "}
            <br className="hidden sm:block" />
            lingkungan pilihan Anda
          </h1>
          <p className="eco-events-desc mt-4 max-w-2xl text-base leading-relaxed text-ink/70">
            Lengkapi formulir pendaftaran di bawah ini untuk bergabung dalam
            acara pilihan Anda. Setelah mendaftar, Anda akan menerima konfirmasi
            dan detail kehadiran melalui email.
          </p>
        </div>
      </section>

      {/* ─── Form + Event Detail ─── */}
      <section className="relative pb-16 md:pb-24">
        <GambarLatar src="/backgrounds/bg-eco-points-and-events.png" posisi="top center" />
        <MotifTile id="kawung" ukuran={100} className="opacity-5" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: Registration Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-ink/8 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="font-display text-2xl font-bold text-maroon">
                  Form Pendaftaran
                </h2>

                {submitted ? (
                  <div className="mt-8 rounded-xl bg-maroon/5 p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-maroon/10">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-maroon"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-maroon">
                      Pendaftaran Berhasil!
                    </h3>
                    <p className="mt-2 text-sm text-ink/70">
                      Terima kasih telah mendaftar untuk{" "}
                      <strong>{event.judul}</strong>. Konfirmasi dan detail
                      kehadiran akan dikirim ke email Anda.
                    </p>
                    <button
                      type="button"
                      onClick={onBack}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-maroon-dark"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                      Kembali ke Eco Events
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {/* Name + Phone */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="daftar-nama"
                          className="mb-1.5 block text-sm font-medium text-ink"
                        >
                          Nama lengkap{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <input
                            id="daftar-nama"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Masukkan nama lengkap Anda"
                            value={formData.nama}
                            onChange={(e) =>
                              setFormData((s) => ({
                                ...s,
                                nama: e.target.value,
                              }))
                            }
                            className="eco-form-input w-full rounded-xl border border-ink/12 bg-cream/30 py-3 pl-10 pr-4 text-sm text-ink placeholder:text-ink/35 transition-all duration-200 focus:border-maroon/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="daftar-telepon"
                          className="mb-1.5 block text-sm font-medium text-ink"
                        >
                          Nomor telepon{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                          <input
                            id="daftar-telepon"
                            type="tel"
                            required
                            autoComplete="tel"
                            placeholder="Contoh: 0812 3456 7890"
                            value={formData.telepon}
                            onChange={(e) =>
                              setFormData((s) => ({
                                ...s,
                                telepon: e.target.value,
                              }))
                            }
                            className="eco-form-input w-full rounded-xl border border-ink/12 bg-cream/30 py-3 pl-10 pr-4 text-sm text-ink placeholder:text-ink/35 transition-all duration-200 focus:border-maroon/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email + Jumlah Peserta */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="daftar-email"
                          className="mb-1.5 block text-sm font-medium text-ink"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                          <input
                            id="daftar-email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="nama@contoh.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((s) => ({
                                ...s,
                                email: e.target.value,
                              }))
                            }
                            className="eco-form-input w-full rounded-xl border border-ink/12 bg-cream/30 py-3 pl-10 pr-4 text-sm text-ink placeholder:text-ink/35 transition-all duration-200 focus:border-maroon/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="daftar-peserta"
                          className="mb-1.5 block text-sm font-medium text-ink"
                        >
                          Jumlah peserta{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          <select
                            id="daftar-peserta"
                            value={formData.jumlahPeserta}
                            onChange={(e) =>
                              setFormData((s) => ({
                                ...s,
                                jumlahPeserta: e.target.value,
                              }))
                            }
                            className="eco-form-input w-full appearance-none rounded-xl border border-ink/12 bg-cream/30 py-3 pl-10 pr-10 text-sm text-ink transition-all duration-200 focus:border-maroon/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10"
                          >
                            <option>1 peserta</option>
                            <option>2 peserta</option>
                            <option>3 peserta</option>
                            <option>4 peserta</option>
                            <option>5 peserta</option>
                          </select>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Domisili */}
                    <div>
                      <label
                        htmlFor="daftar-domisili"
                        className="mb-1.5 block text-sm font-medium text-ink"
                      >
                        Domisili <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <select
                          id="daftar-domisili"
                          required
                          value={formData.domisili}
                          onChange={(e) =>
                            setFormData((s) => ({
                              ...s,
                              domisili: e.target.value,
                            }))
                          }
                          className="eco-form-input w-full appearance-none rounded-xl border border-ink/12 bg-cream/30 py-3 pl-10 pr-10 text-sm text-ink transition-all duration-200 focus:border-maroon/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10"
                        >
                          <option value="" disabled>
                            Pilih domisili Anda
                          </option>
                          <option>Bandung</option>
                          <option>Jakarta</option>
                          <option>Surabaya</option>
                          <option>Yogyakarta</option>
                          <option>Semarang</option>
                          <option>Lainnya</option>
                        </select>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    {/* Catatan */}
                    <div>
                      <label
                        htmlFor="daftar-catatan"
                        className="mb-1.5 block text-sm font-medium text-ink"
                      >
                        Catatan
                      </label>
                      <div className="relative">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="absolute left-3.5 top-4 text-ink/30"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        <textarea
                          id="daftar-catatan"
                          rows={3}
                          maxLength={300}
                          placeholder="Tulis catatan tambahan (opsional)"
                          value={formData.catatan}
                          onChange={(e) =>
                            setFormData((s) => ({
                              ...s,
                              catatan: e.target.value,
                            }))
                          }
                          className="eco-form-input w-full resize-none rounded-xl border border-ink/12 bg-cream/30 py-3 pl-10 pr-4 text-sm text-ink placeholder:text-ink/35 transition-all duration-200 focus:border-maroon/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10"
                        />
                        <span className="absolute right-3 bottom-3 text-xs text-ink/30">
                          {formData.catatan.length}/300
                        </span>
                      </div>
                    </div>

                    {/* Checkbox */}
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.setuju}
                        onChange={(e) =>
                          setFormData((s) => ({
                            ...s,
                            setuju: e.target.checked,
                          }))
                        }
                        className="mt-0.5 h-4 w-4 rounded border-ink/20 text-maroon accent-maroon"
                      />
                      <span className="text-sm text-ink/70">
                        Saya bersedia menerima informasi lanjutan terkait acara
                        ini.
                      </span>
                    </label>

                    {/* Info notice */}
                    <div className="flex items-center gap-3 rounded-xl bg-cream/70 px-4 py-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="shrink-0 text-ink/40"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <p className="text-xs text-ink/50">
                        Setelah mendaftar, Anda akan menerima konfirmasi dan
                        detail kehadiran melalui email.
                      </p>
                    </div>

                    {/* Form buttons */}
                    <div className="grid gap-3 pt-2 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={onBack}
                        className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-medium text-ink/70 transition-all duration-300 hover:border-maroon/30 hover:text-maroon"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="transition-transform duration-300 group-hover:-translate-x-1"
                        >
                          <line x1="19" y1="12" x2="5" y2="12" />
                          <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Eco Events
                      </button>
                      <button
                        type="submit"
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-maroon-dark hover:shadow-lg hover:shadow-maroon/25"
                      >
                        Daftar Acara
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Event Detail Card */}
            <div className="lg:col-span-5">
              <div className="eco-event-detail-card sticky top-28 space-y-6">
                {/* Event Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={event.gambar}
                    alt={event.judul}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>

                {/* Event Info */}
                <div className="rounded-2xl border border-ink/8 bg-white p-6">
                  {/* Status badge */}
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-maroon"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="rounded-full bg-maroon/8 px-3 py-1 text-xs font-semibold text-maroon">
                      {event.status}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink">
                    {event.judul}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    {event.deskripsiLengkap}
                  </p>

                  {/* Detail grid */}
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2.5">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="mt-0.5 shrink-0 text-maroon/60"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <div>
                        <p className="text-xs text-ink/50">Tanggal</p>
                        <p className="text-sm font-semibold text-ink">
                          {event.tanggalLengkap}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="mt-0.5 shrink-0 text-maroon/60"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <div>
                        <p className="text-xs text-ink/50">Kuota</p>
                        <p className="text-sm font-semibold text-ink">
                          {event.kuota}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="mt-0.5 shrink-0 text-maroon/60"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <div>
                        <p className="text-xs text-ink/50">Waktu</p>
                        <p className="text-sm font-semibold text-ink">
                          {event.waktu}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="mt-0.5 shrink-0 text-maroon/60"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <div>
                        <p className="text-xs text-ink/50">Biaya</p>
                        <p className="text-sm font-semibold text-ink">
                          {event.biaya}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mt-4 flex items-start gap-2.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="mt-0.5 shrink-0 text-maroon/60"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <p className="text-xs text-ink/50">Lokasi</p>
                      <p className="text-sm font-semibold text-ink">
                        {event.lokasi}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confirmation notice */}
                <div className="flex items-start gap-3 rounded-xl bg-maroon/5 px-4 py-3.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="mt-0.5 shrink-0 text-maroon"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <p className="text-xs leading-relaxed text-ink/60">
                    Setelah mendaftar, Anda akan menerima konfirmasi dan detail
                    kehadiran.
                  </p>
                </div>

                {/* Eco-friendly badge */}
                <div className="flex items-center gap-4 rounded-xl border border-ink/8 bg-white px-5 py-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon/8">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-maroon"
                    >
                      <path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z" />
                      <path d="M12 8v8" />
                      <path d="M8 12h8" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Acara ramah lingkungan
                    </p>
                    <p className="mt-0.5 text-xs text-ink/50">
                      Mengurangi limbah, meningkatkan kreativitas, untuk masa
                      depan yang lebih hijau.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
