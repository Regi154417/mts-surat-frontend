# 📬 Sistem Administrasi Surat MTs Al-Muttaqin

Aplikasi web full-stack untuk mengelola surat masuk, surat keluar, disposisi, dan persetujuan
di lingkungan MTs Al-Muttaqin. Dibangun dengan **Node.js + Express** (backend) dan
**Vue 3 + Vite + Tailwind CSS** (frontend).

---

## 🗂️ Daftar Isi

- [Fitur](#-fitur)
- [Teknologi](#-teknologi)
- [Struktur Proyek](#-struktur-proyek)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Akun Default](#-akun-default)
- [API Endpoint](#-api-endpoint)
- [Role & Hak Akses](#-role--hak-akses)
- [Lisensi](#-lisensi)

---

## ✨ Fitur

### 👤 Autentikasi
- Login dengan JWT (expired 8 jam)
- Navigasi guard berdasarkan role
- Ganti password

### 📥 Surat Masuk
- Tambah, edit, hapus surat masuk
- Upload lampiran (PDF / DOC / DOCX, maks. 5 MB)
- Filter berdasarkan status disposisi & kata kunci
- Paginasi data

### 📤 Surat Keluar
- Tambah, edit, hapus surat keluar
- Upload file surat
- Status persetujuan otomatis (menunggu → disetujui / ditolak)
- Filter & paginasi

### 📋 Disposisi
- Admin mengirim disposisi dari surat masuk
- Kepala sekolah mengisi arahan & mengubah status
- Sinkronisasi otomatis status pada surat masuk terkait

### ✅ Persetujuan Surat Keluar
- Kepala sekolah menyetujui atau menolak surat keluar
- Tambahkan catatan keputusan
- Sinkronisasi status otomatis ke surat keluar

### 🗄️ Arsip Digital
- Gabungan arsip surat masuk & surat keluar
- Filter berdasarkan jenis surat, kata kunci, dan periode tanggal

### 📊 Laporan
- Generate laporan per periode & jenis surat
- Ringkasan total surat masuk dan keluar
- Export ke CSV & cetak halaman

---

## 🛠️ Teknologi

| Bagian    | Teknologi                                      |
|-----------|------------------------------------------------|
| Backend   | Node.js, Express.js, MySQL2, JWT, Bcrypt, Multer |
| Frontend  | Vue 3, Vite, Pinia, Vue Router, Axios, Tailwind CSS, Day.js |
| Database  | MySQL 8 / MariaDB                             |

---

## 📁 Struktur Proyek
mts-almuttaqin/

├── mts-surat-backend/          # Backend (Node.js + Express)

│   ├── src/

│   │   ├── app.js

│   │   ├── config/database.js

│   │   ├── controllers/        # authController, suratMasuk, suratKeluar, dst.

│   │   ├── routes/             # authRoutes, suratMasukRoutes, dst.

│   │   └── middleware/         # auth.js, roleCheck.js, upload.js

│   ├── uploads/

│   │   ├── surat_masuk/

│   │   └── surat_keluar/

│   └── .env

│

└── mts-surat-frontend/         # Frontend (Vue 3 + Vite)

├── src/

│   ├── assets/

│   ├── components/         # 24 komponen reusable

│   ├── composables/        # useAuth, usePagination, useFilter, dst.

│   ├── layouts/            # AuthLayout, DashboardLayout

│   ├── router/

│   ├── services/           # Axios service per fitur

│   ├── stores/             # Pinia store per fitur

│   ├── utils/              # formatDate, formatNomor, constants

│   └── views/              # admin/, kepsek/, auth/, errors/

└── .env

---

## ✅ Prasyarat

Pastikan sudah terinstal di mesin Anda:

- [Node.js](https://nodejs.org/) v18 atau lebih baru
- [npm](https://www.npmjs.com/) v9 atau lebih baru
- [MySQL](https://www.mysql.com/) 8 / MariaDB 10.4+

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/mts-almuttaqin.git
cd mts-almuttaqin
```

### 2. Setup Database

Buka MySQL client, lalu jalankan:

```sql
CREATE DATABASE mts_surat
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mts_surat;
```

Kemudian jalankan seluruh skrip SQL pada file `database.sql`
(termasuk pembuatan tabel dan data seed akun default).

### 3. Setup Backend

```bash
cd mts-surat-backend
npm install
cp .env.example .env
# Edit .env sesuai konfigurasi database Anda
```

### 4. Setup Frontend

```bash
cd ../mts-surat-frontend
npm install
cp .env.example .env
# Sesuaikan VITE_API_BASE_URL jika diperlukan
```

---

## ⚙️ Konfigurasi Environment

### Backend — `mts-surat-backend/.env`

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mts_surat
JWT_SECRET=mts_almuttaqin_jwt_secret_2025
JWT_EXPIRES_IN=8h
```

### Frontend — `mts-surat-frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## ▶️ Menjalankan Aplikasi

### Backend

```bash
cd mts-surat-backend

# Mode development (hot-reload dengan nodemon)
npm run dev

# Mode production
npm start
```

Server berjalan di: `http://localhost:3000`

### Frontend

```bash
cd mts-surat-frontend

# Mode development
npm run dev

# Build production
npm run build
```

Aplikasi berjalan di: `http://localhost:5173`

---

## 🔑 Akun Default

| Role           | Username | Password   |
|----------------|----------|------------|
| Administrator  | `admin`  | `password` |
| Kepala Sekolah | `kepsek` | `password` |

> ⚠️ **Segera ganti password** setelah login pertama melalui menu profil.

---

## 📡 API Endpoint

Semua endpoint (kecuali login) memerlukan header:
Authorization: Bearer <token>

### Auth

| Method | Endpoint                    | Akses       | Keterangan          |
|--------|-----------------------------|-------------|---------------------|
| POST   | `/api/auth/login`           | Public      | Login               |
| GET    | `/api/auth/profile`         | Semua login | Profil user         |
| PUT    | `/api/auth/ganti-password`  | Semua login | Ganti password      |

### Surat Masuk

| Method | Endpoint               | Akses        | Keterangan          |
|--------|------------------------|--------------|---------------------|
| GET    | `/api/surat-masuk`     | Semua login  | List + filter       |
| GET    | `/api/surat-masuk/:id` | Semua login  | Detail              |
| POST   | `/api/surat-masuk`     | Admin        | Tambah + upload     |
| PUT    | `/api/surat-masuk/:id` | Admin        | Edit + upload       |
| DELETE | `/api/surat-masuk/:id` | Admin        | Hapus               |

### Surat Keluar

| Method | Endpoint                | Akses        | Keterangan          |
|--------|-------------------------|--------------|---------------------|
| GET    | `/api/surat-keluar`     | Semua login  | List + filter       |
| GET    | `/api/surat-keluar/:id` | Semua login  | Detail              |
| POST   | `/api/surat-keluar`     | Admin        | Tambah + upload     |
| PUT    | `/api/surat-keluar/:id` | Admin        | Edit + upload       |
| DELETE | `/api/surat-keluar/:id` | Admin        | Hapus               |

### Disposisi

| Method | Endpoint           | Akses          | Keterangan              |
|--------|--------------------|----------------|-------------------------|
| GET    | `/api/disposisi`   | Semua login    | List disposisi          |
| GET    | `/api/disposisi/:id` | Semua login  | Detail disposisi        |
| POST   | `/api/disposisi`   | Admin          | Kirim disposisi baru    |
| PUT    | `/api/disposisi/:id` | Kepala Sekolah | Isi arahan & ubah status |

### Persetujuan

| Method | Endpoint              | Akses          | Keterangan               |
|--------|-----------------------|----------------|--------------------------|
| GET    | `/api/persetujuan`    | Semua login    | List persetujuan         |
| GET    | `/api/persetujuan/:id` | Semua login   | Detail persetujuan       |
| POST   | `/api/persetujuan`    | Kepala Sekolah | Setujui / tolak surat    |

### Arsip

| Method | Endpoint      | Akses       | Keterangan                     |
|--------|---------------|-------------|--------------------------------|
| GET    | `/api/arsip`  | Semua login | Gabungan arsip surat masuk & keluar |

### Laporan

| Method | Endpoint       | Akses       | Keterangan                  |
|--------|----------------|-------------|-----------------------------|
| GET    | `/api/laporan` | Semua login | Generate laporan per periode |

#### Query Parameters — Laporan

| Parameter      | Wajib | Nilai                        |
|----------------|-------|------------------------------|
| `tanggal_mulai` | ✅   | `YYYY-MM-DD`                |
| `tanggal_akhir` | ✅   | `YYYY-MM-DD`                |
| `jenis`         | ❌   | `semua` / `masuk` / `keluar` |

---

## 🔐 Role & Hak Akses

| Fitur                        | Admin | Kepala Sekolah |
|------------------------------|:-----:|:--------------:|
| Tambah / edit / hapus surat masuk  | ✅  | ❌           |
| Tambah / edit / hapus surat keluar | ✅  | ❌           |
| Kirim disposisi              | ✅    | ✅             |
| Isi arahan & ubah status disposisi | ❌ | ✅           |
| Beri persetujuan surat keluar | ❌   | ✅             |
| Lihat arsip digital          | ✅    | ✅             |
| Generate & export laporan    | ✅    | ✅             |

---

## 📄 Lisensi

Proyek ini dikembangkan untuk keperluan internal **MTs Al-Muttaqin**.
Seluruh hak cipta dilindungi © 2025 MTs Al-Muttaqin.