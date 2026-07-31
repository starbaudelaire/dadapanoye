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
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PetaViewer from '@/components/peta/PetaViewer';
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
    src: '/images/peta/peta-administrasi.webp',
    alt: 'Peta Administrasi Padukuhan Dadapan',
    interpretasi: [
      { label: 'Padukuhan', nilai: 'Dadapan' },
      { label: 'Jumlah RT', nilai: '9' },
      { label: 'Kalurahan', nilai: 'Timbulharjo' },
      { label: 'Kapanewon', nilai: 'Sewon' },
      { label: 'Kabupaten', nilai: 'Bantul' },
    ],
    deskripsi:
      'Peta administrasi menggambarkan batas wilayah resmi Padukuhan Dadapan beserta pembagian wilayah RT 01 hingga RT 09 setempat.',
  },
  {
    id: 'bencana',
    judul: 'Peta Risiko Kebencanaan',
    subJudul: 'Mitigasi Bencana Gempa & Jalur Evakuasi',
    kategori: 'Mitigasi Bencana',
    badgeText: 'Mitigasi Dini',
    src: '/images/peta/bahaya-gempa.webp',
    alt: 'Peta Risiko Bencana Gempa Padukuhan Dadapan',
    interpretasi: [
      { label: 'Tingkat Risiko', nilai: 'Potensi Gempa Bumi' },
      { label: 'Zona Bahaya', nilai: 'Pemukiman Padat' },
    ],
    deskripsi:
      'Peta kebencanaan menunjukkan tingkat risiko gempa bumi di wilayah Padukuhan Dadapan.',
  },
];

export default function PetaWilayah() {
  const [fullscreenImage, setFullscreenImage] = useState(null);

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
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
                Peta Padukuhan
              </h2>
              <p className="text-sm text-[#94a3b8] mt-1 font-normal">
                Terdapat peta batas wilayah administrasi dan bencana Padukuhan Dadapan
              </p>
            </div>
          </div>

          {/* Static Map Display Split Cards Grid */}
          <div className="space-y-16">
            {petaData.map((peta, idx) => (
              <GlassCard
                key={peta.id}
                className="bg-[#181f2e]/85 border border-white/10 shadow-2xl p-0 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
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
                          DESKRIPSI
                        </span>
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
                        Selengkapnya <ArrowUpRight className="h-4 w-4" />
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

            <div className="relative w-full h-[70vh] bg-white rounded-2xl overflow-auto flex items-center justify-center p-2">
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
