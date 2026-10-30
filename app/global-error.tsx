"use client";

/**
 * Dipakai saat root layout sendiri gagal, sehingga file ini harus memuat
 * <html> dan <body> sendiri. Gaya ditulis inline karena globals.css belum
 * tentu ikut termuat pada kondisi ini.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#D9E7E8",
          color: "#182729",
          fontFamily: "system-ui, -apple-system, Segoe UI, Arial, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#495D60",
            }}
          >
            Harum Wastra
          </p>
          <h1
            style={{
              margin: "12px 0 0",
              fontSize: "2rem",
              lineHeight: 1.2,
              color: "#096D73",
            }}
          >
            Aplikasi gagal dimuat
          </h1>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "#495D60",
            }}
          >
            Terjadi kesalahan yang menghentikan seluruh halaman. Silakan muat
            ulang peramban. Bila masalah berlanjut, hubungi kami lewat WhatsApp
            di halaman kontak.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "24px",
              border: 0,
              borderRadius: "9999px",
              background: "#096D73",
              color: "#FFFFFF",
              padding: "14px 28px",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Muat ulang
          </button>
          {error.digest && (
            <p
              style={{
                margin: "16px 0 0",
                fontSize: "0.75rem",
                color: "#495D60",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              Kode galat: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
