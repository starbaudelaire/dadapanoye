# 📑 SYSTEM CONTEXT: PLATFORM DIGI-DADAPAN (STATIC SSG)

## 1. DESKRIPSI UTAMA & SCOPE
* **Nama Program:** DIGI-DADAPAN (Portal Resmi Padukuhan Dadapan)
* **Lokasi Lokus:** Padukuhan Dadapan, Kalurahan Timbulharjo, Kecamatan Sewon, Kabupaten Bantul, D.I. Yogyakarta.
* **Tipe Arsitektur:** Next.js (React) + Tailwind CSS + Shadcn UI.
* **Strategi Deployment:** Pure Static Site Generation (SSG) via `output: 'export'` (folder `out`). Deployment murni ke direktori `public_html` cPanel hosting statis.
* **Data Management:** Zero database backend (No Supabase/Prisma/SQL). Semua konten ditaruh di dalam file lokal JSON (`/src/data/`).

## 2. STRUKTUR NAVBAR & HIERARKI HALAMAN (ARCHITECTURE INFORMATION)
* **Beranda (`/`):** 
  * Hero Section (Placeholder gambar desa premium + Welcoming Text).
  * Statistik Demografi (4 Stat Cards minimalis dari Shadcn: Total Jiwa, Total KK, Luas Wilayah, Persentase Sektor Utama).
  * Highlight Cards (3 Navigasi cepat).
* **Profil Padukuhan (`/profil#id` - Dropdown Menu):**
  * Sub-Menu 1: Sejarah & Visi Misi (`#sejarah`) -> Narasi 1 paragraf + Visi Misi dikemas dalam Shadcn `Accordion`.
  * Sub-Menu 2: Pemerintahan (`#pamong`) -> Struktur Kepengurusan lokal khusus: **Dukuh ➡️ Kukuban (Dadapan Lor & Kidul) ➡️ RT**. Tampilan Card Grid minimalis + Avatar.
  * Sub-Menu 3: Lembaga Desa (`#lembaga`) -> Menggunakan komponen Shadcn `Tabs` (PKK, Karang Taruna, Posyandu, Kelompok Wanita Tani/KWT).
* **Peta Wilayah (`/peta`):** 
  * Layout Split-Screen/Side-by-Side menggunakan Shadcn `Carousel`.
  * Menampilkan 2 Peta Teknis: **Peta Administrasi** (dengan fitur Viewer Zoom Ringan) dan **Peta Bencana Gempa**.
  * Di samping/bawah gambar peta wajib menyertakan Card Teks Ringkas berisi interpretasi/analisis data peta kependudukan dan mitigasi aman.
* **Katalog UMKM (`/umkm`):** 
  * Killer Feature Proker Pribadi "MODAL".
  * Integrasi **mapcn** (React SVG Map Tooltip) berbasis plotting koordinat statis persentase absolut (`absolute top-[X%] left-[Y%]`) dari file `umkm.json`.
  * Interaktivitas: Pin Peta diklik ➡️ Muncul Shadcn `Dialog` (Modal Popup) berisi detail produk, tombol direct WhatsApp (`wa.me`), dan link redirect rute Google Maps asli.
* **Galeri KKN (`/galeri`):**
  * Grid Gallery foto dokumentasi Tim KKN UPNYK Kelompok 84.021 selama 30 hari mengabdi sebagai arsip kenangan.

## 3. WAJIB DIINGAT UNTUK AI AGENT
1. **No Backend Runtime:** Jangan pernah generate fungsi `getServerSideProps`, `getStaticPaths` dinamis, atau server components yang butuh node server berjalan.
2. **Embedded Third Party:** Jika butuh fitur dinamis (Form Buku Tamu, Jadwal Kegiatan), akalin pake Embedded Google Form / Google Calendar di dalam Modal Dialog Shadcn UI.
3. **Data Source:** Referensi data UMKM murni di-load dari array objek lokal JSON.