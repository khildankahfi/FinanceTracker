# Finance Tracker

> A personal finance management application built with **Next.js 16**, **Prisma**, and **PostgreSQL** — track income & expenses, manage monthly budgets per category, and monitor your financial health through an intuitive dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Dashboard** | Summary of balance, total income & expenses with financial visualization charts |
| 💸 **Transaction Management** | Create, edit, and delete transactions typed as `INCOME` or `EXPENSE` |
| 🏷️ **Category Management** | Manage categories with custom names, colors, and icons |
| 🎯 **Monthly Budgets** | Set spending limits per category on a monthly basis |
| 📅 **Date Filtering** | Filter and browse transactions by custom date ranges |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **Database** | PostgreSQL via [Prisma ORM](https://prisma.io) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Data Fetching** | [TanStack Query v5](https://tanstack.com/query) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **Charts** | [Recharts](https://recharts.org) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Date Utility** | [date-fns](https://date-fns.org) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **PostgreSQL** database — local, [Supabase](https://supabase.com), or [Neon](https://neon.tech)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and fill in your database credentials:

```bash
cp .env .env.local
```

Then edit `.env.local`:

```env
# Used by Prisma Client (supports connection pooling via PgBouncer)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Used by Prisma Migrate (requires a direct connection)
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

> **Note:** `DATABASE_URL` is used by Prisma Client and can point to a connection pooler. `DIRECT_URL` is used by `prisma migrate` and must be a direct database connection.

### 4. Run Database Migrations

```bash
npx prisma db push
```

### 5. (Optional) Seed Initial Data

Populate the database with default categories and sample data:

```bash
npx prisma db seed
```

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
finance-tracker/
├── prisma/
│   ├── schema.prisma        # Database model definitions
│   └── seed.ts              # Initial seed data
├── src/
│   ├── app/
│   │   ├── (dashboard)/     # Main pages: Dashboard, Transactions, Budgets
│   │   └── api/             # API Routes: /transactions, /categories, /budgets
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions & configuration (Prisma client, etc.)
│   ├── server/              # Server-side logic & data access layer
│   └── store/               # Global state management (Zustand)
└── public/                  # Static assets
```

---

## 🗄️ Database Schema

```
Category ──< Transaction
Category ──< Budget
```

| Model | Description |
|---|---|
| **Category** | Transaction category with a name, color, and icon |
| **Transaction** | A single financial record (`INCOME` / `EXPENSE`) with date, amount, and notes |
| **Budget** | Monthly spending limit set per category |

---

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Generate Prisma client & build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## 🚢 Deployment

This project is optimized for deployment on **Vercel**.

1. Push the repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Add the following environment variables in the Vercel dashboard:
   - `DATABASE_URL`
   - `DIRECT_URL`
4. Deploy — Vercel will automatically run `prisma generate` during the build via the `postinstall` script

---

## 📝 License

This project is licensed under the **MIT License** — free to use and modify.

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
