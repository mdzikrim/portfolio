# Cara menambah project ke portfolio

Satu project = satu file Markdown. Tidak ada kode React yang perlu disentuh.

---

## 1. Buat filenya

```bash
npm run new:project -- "Fraud Detection with XGBoost"
```

Perintah itu membuat `content/projects/fraud-detection-with-xgboost.md` yang sudah berisi
kerangka lengkap, dan otomatis diberi `draft: true` supaya belum tampil ke publik.

(Kalau lebih suka manual: copy salah satu file `.md` yang sudah ada, ganti isinya.)

---

## 2. Isi bagian frontmatter

Bagian di antara dua garis `---` di paling atas file. Ini yang mengatur kartu project, filter,
dan metadata halaman.

```yaml
---
title: "Fraud Detection with XGBoost"
summary: "Satu-dua kalimat. Muncul di kartu project dan di bawah judul halaman detail."
category: "Machine Learning"
year: "2026"
role: "Peran Anda di project ini"
tags: ["Python", "XGBoost", "pandas"]
cover: "/projects/fraud/cover.png"
featured: true
draft: false
order: 1
links:
  repo: "https://github.com/mdzikrim/..."
  demo: ""
  article: ""
highlights:
  - label: "ROC-AUC"
    value: "0.94"
  - label: "Dataset"
    value: "284k rows"
---
```

### Penjelasan tiap field

| Field | Wajib? | Keterangan |
| --- | --- | --- |
| `title` | ya | Judul project. |
| `summary` | ya | 1–2 kalimat. Jangan terlalu panjang, kartu memotong di 3 baris. |
| `category` | ya | Jadi tombol filter. Pakai ulang kategori yang sudah ada agar tidak beranak-pinak: `Machine Learning`, `Computer Vision`, `Data Analysis`, `Cybersecurity`, `IoT & Data`. |
| `year` | ya | Tahun pengerjaan. |
| `role` | ya | Misal `ML Engineer`, `Final-Year Research`, `Solo project`. |
| `tags` | ya | Tech stack. Kartu menampilkan 4 pertama, sisanya jadi `+n`. |
| `cover` | tidak | Path gambar di dalam `public/`. Kosongkan (`""`) dan kartu akan pakai placeholder inisial yang rapi. |
| `featured` | tidak | `true` = ikut tampil di halaman depan. Semua project tetap muncul di `/projects`. |
| `draft` | tidak | `true` = disembunyikan total dari situs. Default template baru adalah `true`. |
| `order` | tidak | Angka kecil tampil duluan. Default 100. |
| `links` | tidak | Field kosong otomatis tidak ditampilkan. |
| `highlights` | tidak | 2–3 angka yang jadi kartu statistik besar di halaman detail. Kosongkan kalau tidak ada. |

---

## 3. Tulis case study-nya

Bagian di bawah frontmatter adalah Markdown biasa. Gunakan `##` untuk judul bagian — otomatis
diberi garis pemisah dan jarak yang benar.

Struktur yang saya sarankan (dan sudah dipakai dua project pertama):

```markdown
## The problem
Apa yang rusak / hilang / belum diketahui, dan siapa yang merasakannya.

## What I built
Jelaskan dulu dengan bahasa manusia, baru masuk ke teknisnya.

## Approach
Metode, arsitektur, model. Yang penting: **kenapa pilih ini** dibanding alternatifnya.

## Results
Tabel angka. Kalau tidak ada angka, deskripsikan apa adanya.

## Limitations
Jujur. Menyebut kelemahan sendiri terbaca sebagai kematangan, bukan kekurangan.

## What I'd do next
Tiga sampai empat perbaikan konkret.
```

### Yang didukung di Markdown

- Tabel (GitHub-flavored)
- Blok kode dengan syntax fence
- Gambar: `![Halaman hasil](/projects/fraud/hasil.png)`
- Link, list, blockquote, bold/italic

### Menaruh gambar

Simpan di `public/projects/<nama-project>/`, lalu panggil dengan path tanpa kata `public`:

```
public/projects/fraud/cover.png   →   /projects/fraud/cover.png
```

Screenshot aplikasi jauh lebih meyakinkan daripada deskripsi. Kalau punya, pakai.

---

## 4. Cek, lalu publikasikan

```bash
npm run dev
```

Buka `http://localhost:3000/projects` dan pastikan tampilannya benar.
Kalau sudah oke, ubah `draft: true` → `draft: false`, lalu:

```bash
git add . && git commit -m "Add fraud detection case study" && git push
```

Vercel otomatis men-deploy ulang dalam ~1 menit.

---

## Tips isi yang bikin beda saat melamar kerja

1. **Mulai dari masalah, bukan dari tools.** Recruiter membaca "kenapa" sebelum "pakai apa".
2. **Sebutkan peran Anda secara spesifik.** Kalau kerja tim, tulis bagian mana yang Anda pegang.
3. **Angka mengalahkan kata sifat.** "Akurasi naik dari 78% ke 91%" > "akurasi meningkat signifikan".
4. **Tulis bagian Limitations.** Ini pembeda terbesar antara portfolio mahasiswa dan portfolio
   engineer. Orang yang tahu batas karyanya sendiri lebih dipercaya.
5. **Satu screenshot** lebih kuat dari tiga paragraf.
