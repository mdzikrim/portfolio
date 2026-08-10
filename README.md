# Portfolio — Muhammad Dzikri Muqimulhaq

Portfolio website built with Next.js (App Router), TypeScript, and Tailwind CSS.
Project case studies are plain Markdown files, so adding a project never requires touching React.

## Menjalankan di lokal

```bash
npm install
```

```bash
npm run dev
```

Buka http://localhost:3000.

## Struktur folder

```
content/
  profile.ts                 ← semua data diri: bio, skill, experience, kontak, link CV
  projects/
    *.md                     ← satu file = satu project (frontmatter + isi case study)
public/
  Muhammad-...-CV.pdf        ← file CV yang di-download pengunjung
  projects/<slug>/           ← simpan screenshot project di sini
src/
  app/                       ← halaman: / , /projects , /projects/[slug]
  components/                ← komponen UI
  lib/projects.ts            ← pembaca file Markdown
scripts/new-project.mjs      ← generator file project baru
```

Dua hal yang paling sering Anda ubah: **`content/profile.ts`** dan **`content/projects/`**.
Selebihnya jarang perlu disentuh.

## Menambah project baru

Baca [ADDING-A-PROJECT.md](./ADDING-A-PROJECT.md). Versi singkatnya:

```bash
npm run new:project -- "Nama Project Baru"
```

Lalu edit file yang muncul di `content/projects/`, dan ubah `draft: true` menjadi `draft: false`
kalau sudah siap tampil.

## Mengubah data diri

Semuanya ada di `content/profile.ts` — nama, tagline, bio, daftar skill, pengalaman kerja,
organisasi, bahasa, dan link sosial media. Ubah nilainya, simpan, halaman langsung ter-update.

Untuk mengganti CV: taruh PDF baru di `public/`, lalu sesuaikan `profile.cv.href`.

## Deploy ke Vercel

1. Push repo ini ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new), import repo-nya. Vercel mendeteksi Next.js
   otomatis — tidak ada konfigurasi yang perlu diisi.
3. Setelah dapat domain (misal `dzikri.vercel.app`), buka `src/app/layout.tsx` dan ganti
   `metadataBase` dengan URL tersebut supaya preview link di LinkedIn/WhatsApp benar.

Setiap `git push` berikutnya otomatis men-deploy ulang.

## Perintah

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (jalankan sebelum push kalau ragu) |
| `npm run lint` | ESLint |
| `npm run new:project -- "Judul"` | Buat kerangka case study baru |
