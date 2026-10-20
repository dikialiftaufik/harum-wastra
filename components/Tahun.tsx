"use client";

import { use } from "react";
import { io } from "next/cache";

// io() menahan perenderan shell statis sehingga tahun dihitung saat request di browser,
// bukan saat prerender; tanpa ini new Date() membuat prerender gagal.
export function Tahun() {
  use(io());
  return <>{new Date().getFullYear()}</>;
}
