# Aplikasi Kuesioner Perceived Stress Scale (PSS)

Aplikasi web untuk mengukur tingkat stres menggunakan skala PSS (Perceived Stress Scale) dengan 10 pertanyaan. Data tersimpan di database Supabase dan dilengkapi dengan dashboard admin untuk mengelola data.

## Fitur

- **Form Kuesioner PSS**: Form dengan 10 pertanyaan menggunakan skala Likert (0-4)
- **Perhitungan Otomatis**: Skor dan kategori stres (Rendah/Sedang/Tinggi) dihitung otomatis
- **Dashboard Admin**: Melihat, mengedit, dan menghapus data responden
- **Database Supabase**: Data tersimpan dengan aman di cloud
- **Responsive Design**: Tampilan optimal di semua ukuran layar

## Kategori Stres

- **Rendah**: Skor 0-13
- **Sedang**: Skor 14-26
- **Tinggi**: Skor 27-40

## Setup Lokal

### 1. Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Buat akun di [Supabase](https://supabase.com)
2. Buat project baru
3. Database sudah otomatis dibuat melalui migration
4. Copy URL dan Anon Key dari Settings > API

### 4. Konfigurasi Environment Variables

Buat file `.env` di root project:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_ACCESS_CODE=kode-rahasia-admin
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## Deployment ke Vercel

### 1. Install Vercel CLI (Opsional)

```bash
npm install -g vercel
```

### 2. Deploy via Dashboard Vercel

1. Push code ke GitHub
2. Login ke [Vercel](https://vercel.com)
3. Import repository
4. Tambahkan Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy

### 3. Deploy via CLI

```bash
vercel
```

Ikuti instruksi di terminal.

## Struktur Database

Tabel `responses` memiliki kolom:

- `id` (uuid): ID unik
- `nama` (text): Nama responden
- `answers` (jsonb): Array 10 jawaban (0-4)
- `total_score` (integer): Total skor (0-40)
- `category` (text): Kategori stres
- `created_at` (timestamptz): Waktu pengisian
- `updated_at` (timestamptz): Waktu update

## Cara Penggunaan

### Mengisi Kuesioner

1. Buka halaman aplikasi
2. Klik tab "Form"
3. Isi nama lengkap
4. Jawab semua 10 pertanyaan
5. Klik "Kirim Kuesioner"
6. Hasil akan langsung ditampilkan

### Dashboard Admin

1. Klik tab "Admin"
2. Masukkan `VITE_ADMIN_ACCESS_CODE` yang hanya diketahui admin
3. Setelah kode valid, dashboard akan terbuka dan akses tersimpan di browser
4. Klik ikon pensil untuk edit data / ikon tempat sampah untuk hapus data
5. Gunakan tombol "Keluar Admin" untuk mengunci ulang pada perangkat bersama

## Teknologi

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Build Production

```bash
npm run build
```

Output akan ada di folder `dist/`

## Lisensi

Perceived Stress Scale (PSS) dikembangkan oleh Sheldon Cohen (1983).

## Catatan Penting

Hasil kuesioner ini hanya alat bantu untuk menilai tingkat stres dan bukan diagnosis medis. Jika ada kekhawatiran tentang kesehatan mental, konsultasikan dengan tenaga profesional.
