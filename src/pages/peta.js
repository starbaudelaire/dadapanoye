import Head from 'next/head';
import { useState } from 'react';
import {
  MapPin,
  ShieldAlert,
  Layers,
  Maximize2,
  X,
  FileText,
  Compass,
  ArrowUpRight,
  Download,
  Globe2,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PetaViewer from '@/components/peta/PetaViewer';
import PetaGeoJsonViewer from '@/components/peta/PetaGeoJsonViewer';
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card';
import { GlassBadge } from '@/components/ui/glass-badge';
import { GlassButton } from '@/components/ui/glass-button';

const petaData = [
  {
    id: 'administrasi',
    judul: 'Peta Administrasi Padukuhan',
    subJudul: 'Batas Wilayah & Pembagian Tata Ruang RT',
    kategori: 'Administrasi Wilayah',
    badgeText: 'Peta Resmi',
    src: '/images/peta/peta-administrasi.jpg',
    alt: 'Peta Administrasi Padukuhan Dadapan',
    interpretasi: [
      { label: 'Luas Wilayah', nilai: 'Padukuhan Dadapan' },
      { label: 'Pembagian Kukuban', nilai: 'Dadapan Lor & Dadapan Kidul' },
      { label: 'Batas Wilayah', nilai: 'Kalurahan Timbulharjo' },
      { label: 'Kapanewon', nilai: 'Sewon' },
      { label: 'Kabupaten', nilai: 'Bantul, D.I. Yogyakarta' },
    ],
    deskripsi:
      'Peta administrasi menggambarkan batas wilayah resmi Padukuhan Dadapan beserta pembagian wilayah RT dan Kukuban. Wilayah ini terbagi menjadi dua Kukuban utama: Dadapan Lor dan Dadapan Kidul yang membawahi seluruh RT setempat.',
  },
  {
    id: 'bencana',
    judul: 'Peta Risiko Kebencanaan',
    subJudul: 'Mitigasi Bencana Gempa & Jalur Evakuasi',
    kategori: 'Mitigasi Bencana',
    badgeText: 'Mitigasi Dini',
    src: '/images/peta/peta-bencana.jpg',
    alt: 'Peta Risiko Bencana Gempa Padukuhan Dadapan',
    interpretasi: [
      { label: 'Tingkat Risiko', nilai: 'Potensi Gempa Bumi' },
      { label: 'Zona Bahaya', nilai: 'Pemukiman Padat' },
      { label: 'Jalur Evakuasi', nilai: 'Jalan Utama Padukuhan' },
      { label: 'Titik Kumpul', nilai: 'Lapangan & Balai Desa' },
    ],
    deskripsi:
      'Peta kebencanaan menunjukkan tingkat risiko gempa bumi di wilayah Padukuhan Dadapan. Warga diimbau mengetahui lokasi jalur evakuasi dan titik kumpul terdekat sebagai langkah mitigasi dan kesiapsiagaan dini bencana.',
  },
];

export default function PetaWilayah() {
  const [activeTab, setActiveTab] = useState('semua');
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const displayedPeta = activeTab === 'semua' || activeTab === 'geojson'
    ? petaData
    : petaData.filter((p) => p.id === activeTab);

  return (
    <>
      <Head>
        <title>Peta Wilayah &amp; Kebencanaan | Portal Padukuhan Dadapan</title>
      </Head>

      <PageHeader
        title="Peta Wilayah &amp; Geospasial"
        subtitle="Pemetaan administrasi tata ruang padukuhan dan zonasi mitigasi kebencanaan Padukuhan Dadapan"
        tag="SISTEM INFORMASI SPASIAL"
      />

      <section className="py-12 sm:py-16 lg:py-24 bg-[#0f1219] relative min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Header Controls & Filter Tabs — Reference Layout Pattern */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
                Peta Tematik Padukuhan
              </h2>
              <p className="text-sm text-[#94a3b8] mt-1 font-normal">
                Pilih jenis peta tematik untuk melihat data batas wilayah dan mitigasi
              </p>
            </div>

            {/* Pill Tabs Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setActiveTab('semua')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === 'semua'
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40'
                    : 'bg-[#181f2e]/85 text-[#94a3b8] hover:text-white border border-white/10 hover:bg-[#242c3d]'
                }`}
              >
                Semua Peta
              </button>
              <button
                onClick={() => setActiveTab('geojson')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                  activeTab === 'geojson'
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/40'
                    : 'bg-[#181f2e]/85 text-emerald-400 hover:text-white border border-emerald-500/30 hover:bg-[#242c3d]'
                }`}
              >
                <Globe2 className="h-3.5 w-3.5" /> GeoJSON Interaktif (Preview)
              </button>
              <button
                onClick={() => setActiveTab('administrasi')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === 'administrasi'
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40'
                    : 'bg-[#181f2e]/85 text-[#94a3b8] hover:text-white border border-white/10 hover:bg-[#242c3d]'
                }`}
              >
                Peta Administrasi
              </button>
              <button
                onClick={() => setActiveTab('bencana')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === 'bencana'
                    ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40'
                    : 'bg-[#181f2e]/85 text-[#94a3b8] hover:text-white border border-white/10 hover:bg-[#242c3d]'
                }`}
              >
                Peta Kebencanaan
              </button>
            </div>
          </div>

          {/* Interactive GeoJSON Feature Section */}
          {(activeTab === 'semua' || activeTab === 'geojson') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GlassBadge variant="emerald" className="gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Uji Coba Vektor Spasial
                  </GlassBadge>
                  <span className="text-xs text-emerald-400 font-semibold">
                    GeoJSON Layer (Dummy Data)
                  </span>
                </div>
              </div>

              <GlassCard className="bg-[#181f2e]/90 border border-emerald-500/30 shadow-2xl p-0 overflow-hidden">
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc] flex items-center gap-2">
                      <Globe2 className="h-6 w-6 text-emerald-400" />
                      Preview Peta Interaktif GeoJSON Wilayah Timbulharjo / Dadapan
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                      Eksperimen pemetaan berbasis data vektor GeoJSON (Polygon). Anda dapat mengklik atau menyorot (hover) area wilayah Padukuhan untuk melihat atribut demografi dan zonasi kebencanaan secara terintegrasi.
                    </p>
                  </div>

                  {/* Dynamic GeoJSON Map */}
                  <PetaGeoJsonViewer />
                </div>
              </GlassCard>

              {/* Consultation Box for Geodesy/Geography Friends */}
              <GlassCard className="bg-[#141b29] border border-blue-500/30 p-6 sm:p-8 space-y-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-6 w-6 text-blue-400 shrink-0 mt-1" />
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-[#f8fafc]">
                      Diskusi Kartografis: Apakah Preview Ini Sudah Bisa Dibilang &quot;Peta Administrasi&quot;?
                    </h4>
                    <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                      Jika Anda ingin menanyakan hasil preview ini kepada teman-teman dari jurusan Keilmuan Kebumian (Geodesi / Geografi / GIS), berikut adalah <strong>catatan &amp; parameter evaluasi teknis</strong> yang dapat disampaikan:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-[#0f1219]/80 border border-white/10 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          <span>Sudah Memenuhi Aspek Vektor &amp; GIS:</span>
                        </div>
                        <ul className="text-xs text-[#94a3b8] space-y-1.5 list-disc list-inside">
                          <li>Struktur data sudah valid **GeoJSON `FeatureCollection`**.</li>
                          <li>Telah memiliki geometri **Polygon (spatial location)** dengan sistem koordinat standar WGS 84 (`EPSG:4326`).</li>
                          <li>Telah menyatu dengan data atribut tabular (Nama Padukuhan &amp; Jumlah Penduduk).</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0f1219]/80 border border-amber-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          <span>Catatan Penyempurnaan Ke Peta Asli:</span>
                        </div>
                        <ul className="text-xs text-[#94a3b8] space-y-1.5 list-disc list-inside">
                          <li>**Jenis Peta**: Saat ini bertipe *Peta Tematik / Choropleth* (gabungan demografi &amp; risiko gempa), bukan murni *Peta Administrasi Murni*.</li>
                          <li>**Geometri Boundary**: Poligon dummy berbentuk kotak grid lurus. Peta asli memerlukan digitasi persisi batas fisik desa/padukuhan (sungai/jalan/patok).</li>
                          <li>**Standar Standarisasi Cartographic BIG**: Memerlukan hirarki garis batas (Kabupaten/Kecamatan/Padukuhan/RT) &amp; orientasi tata letak resmi.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Static Map Display Split Cards Grid */}
          <div className="space-y-16">
            {displayedPeta.map((peta, idx) => (
              <GlassCard
                key={peta.id}
                className="bg-[#181f2e]/85 border border-white/10 shadow-2xl p-0 overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch`}>
                  {/* Left Column: Interactive Map Viewer (7 Cols) */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0f1219]/60">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GlassBadge variant="accent">{peta.badgeText}</GlassBadge>
                          <span className="text-xs text-[#94a3b8] font-medium">{peta.kategori}</span>
                        </div>
                        <button
                          onClick={() => setFullscreenImage(peta)}
                          className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                          <Maximize2 className="h-3.5 w-3.5" />
                          Layar Penuh
                        </button>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc]">
                          {peta.judul}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#94a3b8] font-normal">
                          {peta.subJudul}
                        </p>
                      </div>

                      <div className="p-2 rounded-2xl bg-[#0f1219] border border-white/10 shadow-inner overflow-hidden">
                        <PetaViewer src={peta.src} alt={peta.alt} />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Spatial Interpretation Data (5 Cols) */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-5">
                      <div className="space-y-1 pb-3 border-b border-white/10">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                          DESKRIPSI &amp; LEGENDARIS
                        </span>
                        <h4 className="text-lg font-bold text-[#f8fafc]">
                          Ringkasan Data Spasial
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed font-normal">
                        {peta.deskripsi}
                      </p>

                      <div className="space-y-2.5 pt-2">
                        {peta.interpretasi.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#242c3d]/60 border border-white/10 text-xs"
                          >
                            <span className="text-[#94a3b8] font-medium">{item.label}</span>
                            <span className="font-bold text-[#f8fafc]">{item.nilai}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <GlassButton
                        variant="primary"
                        size="sm"
                        onClick={() => setFullscreenImage(peta)}
                        className="w-full justify-center text-xs font-bold gap-2"
                      >
                        Buka Peta Resolusi Tinggi <ArrowUpRight className="h-4 w-4" />
                      </GlassButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>


      {/* Fullscreen High-Res Image Lightbox Modal */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-[#0f1219]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 z-50 p-3 rounded-full bg-[#181f2e] border border-white/10 text-white hover:bg-[#242c3d] transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full max-h-[90vh] bg-[#181f2e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-4 flex flex-col space-y-4"
          >
            <div className="flex items-center justify-between px-2">
              <div>
                <h3 className="font-bold text-lg text-[#f8fafc]">{fullscreenImage.judul}</h3>
                <p className="text-xs text-[#94a3b8]">{fullscreenImage.subJudul}</p>
              </div>
              <a
                href={fullscreenImage.src}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors shadow-md"
              >
                <Download className="h-3.5 w-3.5" />
                Unduh Gambar
              </a>
            </div>

            <div className="relative w-full h-[70vh] bg-[#0f1219] rounded-2xl overflow-auto flex items-center justify-center p-2">
              <img
                src={fullscreenImage.src}
                alt={fullscreenImage.judul}
                className="w-full h-auto max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      data: petaData,
    },
  };
}
