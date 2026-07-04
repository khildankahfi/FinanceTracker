# 💰 Finance Tracker

Aplikasi pencatatan keuangan pribadi yang dibangun dengan **Next.js 16**, **Prisma**, dan **PostgreSQL**. Lacak pemasukan & pengeluaran, atur budget bulanan per kategori, dan pantau kesehatan keuanganmu lewat dashboard yang intuitif.

---

## ✨ Fitur Utama

- 📊 **Dashboard** — Ringkasan saldo, total pemasukan & pengeluaran, dan grafik visualisasi keuangan
- 💸 **Manajemen Transaksi** — Tambah, edit, dan hapus transaksi bertipe `INCOME` atau `EXPENSE`
- 🏷️ **Kategori** — Kelola kategori dengan nama, warna, dan ikon kustom
- 🎯 **Budget Bulanan** — Atur batas pengeluaran per kategori setiap bulannya
- 📅 **Filter Berdasarkan Tanggal** — Saring transaksi berdasarkan periode waktu

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL via [Prisma ORM](https://prisma.io) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| Form Handling | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Charts | [Recharts](https://recharts.org) |
| Icons | [Lucide React](https://lucide.dev) |

---

## 🚀 Memulai

### Prasyarat

- Node.js >= 18
- PostgreSQL database (bisa menggunakan [Supabase](https://supabase.com), [Neon](https://neon.tech), atau lokal)

### 1. Clone & Install Dependensi

```bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker
npm install
```

### 2. Konfigurasi Environment

Salin file `.env` lalu buat `.env.local` dan isi variabel berikut:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

> **Catatan:** `DIRECT_URL` digunakan oleh Prisma Migrate, sedangkan `DATABASE_URL` digunakan oleh Prisma Client (bisa menggunakan connection pooler seperti PgBouncer).

### 3. Migrasi Database

```bash
npx prisma db push
```

### 4. (Opsional) Seed Data Awal

```bash
npx prisma db seed
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📁 Struktur Proyek

```
finance-tracker/
├── prisma/
│   ├── schema.prisma       # Definisi model database
│   └── seed.ts             # Data awal untuk seeding
├── src/
│   ├── app/
│   │   ├── (dashboard)/    # Halaman utama (Dashboard, Transactions, Budgets)
│   │   └── api/            # API Routes (transactions, categories, budgets)
│   ├── components/         # Komponen UI yang dapat digunakan ulang
│   ├── lib/                # Utility functions & konfigurasi (Prisma client, dll)
│   ├── server/             # Server-side logic & data access layer
│   └── store/              # Global state management (Zustand)
└── public/                 # Aset statis
```

---

## 🗄️ Skema Database

```
Category ──< Transaction
Category ──< Budget
```

- **Category** — Kategori transaksi (nama, warna, ikon)
- **Transaction** — Pencatatan transaksi (`INCOME` / `EXPENSE`) dengan tanggal dan catatan
- **Budget** — Batas pengeluaran bulanan per kategori

---

## 📦 Scripts

| Script | Deskripsi |
|---|---|
| `npm run dev` | Jalankan development server |
| `npm run build` | Generate Prisma client & build production |
| `npm run start` | Jalankan production server |
| `npm run lint` | Jalankan ESLint |

---

## 🚢 Deploy ke Vercel

1. Push repository ke GitHub
2. Import proyek di [Vercel](https://vercel.com/new)
3. Tambahkan environment variables `DATABASE_URL` dan `DIRECT_URL` di Vercel dashboard
4. Deploy!

Vercel akan otomatis menjalankan `prisma generate` saat proses build karena sudah dikonfigurasi di script `postinstall`.

---

## 📝 Lisensi

MIT License — bebas digunakan dan dimodifikasi.
