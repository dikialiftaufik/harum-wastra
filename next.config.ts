import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  // Matikan header penanda framework.
  poweredByHeader: false,

  images: {
    // AVIF lebih kecil dari WebP; keduanya disajikan otomatis oleh <Image>.
    formats: ["image/avif", "image/webp"],
  },

  // Header keamanan dasar. CSP belum dipasang karena butuh nonce untuk
  // inline style/script yang dipakai animasi di halaman ini.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        // Berkas desain asli tidak perlu diindeks dan aman di-cache lama.
        source: "/motif-tile/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
