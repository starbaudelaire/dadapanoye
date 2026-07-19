import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Maximize2,
  Search,
  LayoutGrid,
  List,
  Images,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import galeriData from '@/data/galeri.json';
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card';
import { GlassBadge } from '@/components/ui/glass-badge';
import { Spinner } from '@/components/ui/spinner';

const CATEGORIES = ['Semua', 'Sosial', 'Pendidikan', 'Kesehatan', 'Ekonomi', 'Lingkungan'];

export default function Galeri({ galeri = galeriData }) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Filter gallery items by search and category
  const filteredGaleri = galeri.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const matchesSearch =
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activePhoto = activeLightboxIndex !== null ? filteredGaleri[activeLightboxIndex] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredGaleri.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveLightboxIndex((prev) => (prev < filteredGaleri.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <Head>
        <title>Galeri Pengabdian KKN | Portal Padukuhan Dadapan</title>
      </Head>

      <PageHeader
        title="Galeri Pengabdian KKN"
        subtitle="Dokumentasi visual rangkaian kegiatan dan program kerja pengabdian masyarakat KKN UPNYK 84.021"
        tag="DOKUMENTASI KEGIATAN"
      />

      <section className="py-12 sm:py-16 lg:py-24 bg-[#0f1219] relative min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          {/* Header & Controls Bar — Reference Layout Pattern */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
                  Foto &amp; Dokumentasi
                </h2>
                <p className="text-sm text-[#94a3b8] mt-1 font-normal">
                  Menampilkan {filteredGaleri.length} dari {galeri.length} foto kegiatan KKN
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 md:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94a3b8]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari dokumentasi..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#181f2e] border border-white/10 text-sm text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-blue-400/50 transition-colors"
                  />
                  {searchQuery && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Spinner size="sm" />
                    </div>
                  )}
                </div>

                {/* View Switcher */}
                <div className="flex items-center p-1 rounded-xl bg-[#181f2e] border border-white/10">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                    aria-label="List View"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/40'
                        : 'bg-[#181f2e]/85 text-[#94a3b8] hover:text-white border border-white/10 hover:bg-[#242c3d]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo Display Grid / List */}
          {filteredGaleri.length === 0 ? (
            <div className="py-16 text-center bg-[#181f2e]/60 rounded-3xl border border-white/10">
              <Images className="h-10 w-10 text-[#64748b] mx-auto mb-3" />
              <p className="text-[#f8fafc] font-semibold">Foto tidak ditemukan</p>
              <p className="text-xs text-[#94a3b8] mt-1">Coba kata kunci pencarian atau kategori lain</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGaleri.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxIndex(index)}
                  className="group cursor-pointer"
                >
                  <GlassCard className="h-full overflow-hidden bg-[#181f2e]/85 border border-white/10 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between p-0">
                    <GlassCardContent className="p-6 space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        {/* Image Container */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#242c3d]">
                          <Image
                            src={item.foto}
                            alt={item.judul}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                          <div className="absolute top-3 left-3">
                            <GlassBadge variant="accent" className="bg-[#0f1219]/80 backdrop-blur-md">
                              {item.kategori}
                            </GlassBadge>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg">
                              <Maximize2 className="h-5 w-5" />
                            </div>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-2">
                          <h3 className="font-bold text-[#f8fafc] text-xl group-hover:text-blue-400 transition-colors leading-snug">
                            {item.judul}
                          </h3>
                          <p className="text-xs text-[#94a3b8] line-clamp-2 leading-relaxed font-normal">
                            {item.keterangan}
                          </p>
                        </div>
                      </div>

                      {/* Date Footer */}
                      <div className="flex items-center gap-1.5 text-xs text-[#64748b] pt-3 border-t border-white/10 mt-2">
                        <Calendar className="h-3.5 w-3.5 text-blue-400" />
                        <span>{item.tanggal}</span>
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGaleri.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxIndex(index)}
                  className="group cursor-pointer"
                >
                  <GlassCard className="bg-[#181f2e]/85 border border-white/10 hover:border-blue-400/40 transition-all duration-300 shadow-xl p-0">
                    <GlassCardContent className="p-4 sm:p-5 flex items-center gap-4">
                      <div className="relative w-24 sm:w-32 aspect-[16/10] rounded-xl overflow-hidden bg-[#242c3d] shrink-0">
                        <Image
                          src={item.foto}
                          alt={item.judul}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <GlassBadge variant="accent" className="text-[10px] py-0">
                            {item.kategori}
                          </GlassBadge>
                          <span className="text-xs text-[#64748b] flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-blue-400" />
                            {item.tanggal}
                          </span>
                        </div>
                        <h3 className="font-bold text-[#f8fafc] text-base group-hover:text-blue-400 transition-colors">
                          {item.judul}
                        </h3>
                        <p className="text-xs text-[#94a3b8] line-clamp-1 font-normal">
                          {item.keterangan}
                        </p>
                      </div>
                      <Maximize2 className="h-5 w-5 text-blue-400 hidden sm:block opacity-60 group-hover:opacity-100" />
                    </GlassCardContent>
                  </GlassCard>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-[#0f1219]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
            <span className="pointer-events-auto text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#181f2e] border border-white/10 text-[#f8fafc]">
              {activeLightboxIndex + 1} dari {filteredGaleri.length}
            </span>
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="pointer-events-auto p-2.5 rounded-full bg-[#181f2e] hover:bg-[#242c3d] border border-white/10 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 z-50 p-3 rounded-full bg-[#181f2e]/80 hover:bg-[#242c3d] border border-white/10 text-white transition-all hover:scale-110"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 z-50 p-3 rounded-full bg-[#181f2e]/80 hover:bg-[#242c3d] border border-white/10 text-white transition-all hover:scale-110"
            aria-label="Next Photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[90vh] bg-[#181f2e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <div className="relative md:w-2/3 min-h-[300px] md:min-h-[480px] bg-[#0f1219] flex items-center justify-center">
              <Image
                src={activePhoto.foto}
                alt={activePhoto.judul}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="md:w-1/3 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 space-y-6">
              <div className="space-y-4">
                <GlassBadge variant="accent">{activePhoto.kategori}</GlassBadge>
                <h2 className="font-bold text-xl text-[#f8fafc] leading-snug">
                  {activePhoto.judul}
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span>{activePhoto.tanggal}</span>
                </div>
                <p className="text-sm text-[#94a3b8] leading-relaxed font-normal pt-2 border-t border-white/10">
                  {activePhoto.keterangan}
                </p>
              </div>

              <div className="text-xs text-[#64748b] border-t border-white/10 pt-4">
                Tim KKN UPN "Veteran" Yogyakarta 84.021 • Padukuhan Dadapan
              </div>
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
      galeri: galeriData,
    },
  };
}
