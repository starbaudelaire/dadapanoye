import Head from 'next/head';
import { useState } from 'react';
import {
  MapPin,
  ShoppingBag,
  Search,
  LayoutGrid,
  List,
  ArrowUpRight,
  Calendar,
  Tag,
  Store,
} from 'lucide-react';
import UmkmMap from '@/components/umkm/UmkmMap';
import UmkmDialog from '@/components/umkm/UmkmDialog';
import umkmData from '@/data/umkm.json';
import PageHeader from '@/components/PageHeader';
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card';
import { GlassBadge } from '@/components/ui/glass-badge';
import { Spinner } from '@/components/ui/spinner';

export default function KatalogUmkm({ umkmList = umkmData }) {
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Extract unique categories dynamically from the data
  const categories = [
    'Semua',
    ...Array.from(new Set(umkmList.map((item) => item.kategori).filter(Boolean))).sort()
  ];

  // Filter UMKM list by search query and category
  const filteredUmkm = umkmList.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const matchesSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.produk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNextUmkm = () => {
    if (!selected) return;
    const currentIndex = filteredUmkm.findIndex((item) => item.id === selected.id);
    if (currentIndex !== -1 && filteredUmkm.length > 1) {
      const nextIndex = (currentIndex + 1) % filteredUmkm.length;
      setSelected(filteredUmkm[nextIndex]);
    }
  };

  const handlePrevUmkm = () => {
    if (!selected) return;
    const currentIndex = filteredUmkm.findIndex((item) => item.id === selected.id);
    if (currentIndex !== -1 && filteredUmkm.length > 1) {
      const prevIndex = (currentIndex - 1 + filteredUmkm.length) % filteredUmkm.length;
      setSelected(filteredUmkm[prevIndex]);
    }
  };

  return (
    <>
      <Head>
        <title>Katalog UMKM | Portal Padukuhan Dadapan</title>
      </Head>

      <PageHeader
        title="Katalog UMKM &amp; Ekonomi Warga"
        subtitle="Direktori komprehensif produk olahan, kerajinan tangan, dan usaha lokal Padukuhan Dadapan"
        tag="DIREKTORI USAHA LOKAL"
      />

      <section className="py-12 sm:py-16 lg:py-24 bg-[#0f1219] relative min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
          {/* Peta Interaktif Sebaran UMKM */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  GEOSPASIAL USAHA
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
                  Sebaran Lokasi UMKM
                </h2>
              </div>
              <span className="text-xs text-[#94a3b8] hidden sm:flex items-center gap-1.5 bg-[#181f2e] border border-white/10 px-3 py-1.5 rounded-full">
                <MapPin className="h-3.5 w-3.5 text-blue-400" />
                {umkmList.length} Titik Usaha Terdata
              </span>
            </div>

            <div className="p-2 rounded-3xl bg-[#181f2e]/85 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
              <UmkmMap umkmList={umkmList} />
            </div>
          </div>

          {/* Video Dokumenter / Showcase UMKM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#181f2e]/85 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                DOKUMENTASI USAHA LOKAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
                Profil &amp; Potensi UMKM Dadapan
              </h2>
              <p className="text-sm text-[#94a3b8] leading-relaxed text-justify font-normal">
                Saksikan liputan eksklusif mengenai usaha mikro, kecil, dan menengah di Padukuhan Dadapan. Temukan kisah inspiratif perjuangan pelaku usaha lokal dalam menciptakan produk olahan makanan kreatif, kerajinan tangan khas, dan jasa berkualitas tinggi.
              </p>
            </div>
            <div className="lg:col-span-7 w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg relative group bg-[#0f1219]">
              <iframe
                src="https://www.youtube.com/embed/om-ZbJOxypk"
                title="Video Profil UMKM Padukuhan Dadapan"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Search, Filter Categories & View Switcher Bar — Reference Layout Pattern */}
          <div className="space-y-6 pt-4 border-t border-white/10" id="katalog">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left Title */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
                  Daftar Usaha Lokal
                </h2>
                <p className="text-sm text-[#94a3b8] mt-1 font-normal">
                  Menampilkan {filteredUmkm.length} dari {umkmList.length} UMKM terdaftar
                </p>
              </div>

              {/* Right Search Input & View Toggle */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 md:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94a3b8]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama atau produk..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#181f2e] border border-white/10 text-sm text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-blue-400/50 transition-colors"
                  />
                  {searchQuery && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Spinner size="sm" />
                    </div>
                  )}
                </div>

                {/* Grid / List Switcher */}
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
              {categories.map((cat) => {
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

          {/* UMKM Cards View — Grid vs List */}
          {filteredUmkm.length === 0 ? (
            <div className="py-16 text-center bg-[#181f2e]/60 rounded-3xl border border-white/10">
              <Store className="h-10 w-10 text-[#64748b] mx-auto mb-3" />
              <p className="text-[#f8fafc] font-semibold">Usaha tidak ditemukan</p>
              <p className="text-xs text-[#94a3b8] mt-1">Coba kata kunci pencarian atau kategori lain</p>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View (3 Columns — Reference Layout) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUmkm.map((umkm) => (
                <div
                  key={umkm.id}
                  onClick={() => setSelected(umkm)}
                  className="group cursor-pointer block h-full text-left"
                >
                  <GlassCard className="h-full bg-[#181f2e]/85 border border-white/10 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between p-0">
                    <GlassCardContent className="p-6 space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        {/* Thumbnail Image Container */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#242c3d]">
                          {(umkm.foto || umkm.thumbnail) && (umkm.foto || umkm.thumbnail) !== '/images/umkm/placeholder.jpg' ? (
                            <img
                              src={umkm.foto || umkm.thumbnail}
                              alt={umkm.nama}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1e2638] to-[#181f2e] text-[#64748b]">
                              <Store className="h-10 w-10 text-blue-400/60 mb-1" />
                              <span className="text-[11px] font-semibold text-[#94a3b8]">UMKM Dadapan</span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <GlassBadge variant="accent" className="bg-[#0f1219]/80 backdrop-blur-md">
                              {umkm.kategori || 'Usaha Lokal'}
                            </GlassBadge>
                          </div>
                        </div>

                        {/* Card Header & Description */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-[#94a3b8]">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-blue-400" />
                              Berdiri {umkm.tahunBerdiri || '—'}
                            </span>
                            <span className="text-blue-400 font-medium">{umkm.jenisUsaha}</span>
                          </div>

                          <h3 className="font-bold text-[#f8fafc] text-xl group-hover:text-blue-400 transition-colors leading-snug line-clamp-2 h-14">
                            {umkm.nama}
                          </h3>

                          <p className="text-[#94a3b8] text-sm leading-relaxed font-normal line-clamp-2 h-10 text-justify">
                            {umkm.deskripsi}
                          </p>
                        </div>
                      </div>

                      {/* Card Bottom Row — Reference Pattern */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4">
                        <span className="text-xs font-semibold text-[#64748b] truncate max-w-[160px]">
                          {umkm.produk}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#242c3d] border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 text-white flex items-center justify-center transition-all shrink-0">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </div>
              ))}
            </div>
          ) : (
            /* List View (Horizontal Card Layout) */
            <div className="space-y-4">
              {filteredUmkm.map((umkm) => (
                <div
                  key={umkm.id}
                  onClick={() => setSelected(umkm)}
                  className="group cursor-pointer block text-left"
                >
                  <GlassCard className="bg-[#181f2e]/85 border border-white/10 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-0.5 shadow-xl p-0">
                    <GlassCardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-14 h-14 rounded-xl bg-[#242c3d] flex items-center justify-center shrink-0 border border-white/10">
                          <Store className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <GlassBadge variant="accent" className="text-[10px] py-0">
                              {umkm.kategori}
                            </GlassBadge>
                            <span className="text-xs text-[#64748b]">Est. {umkm.tahunBerdiri}</span>
                          </div>
                          <h3 className="font-bold text-[#f8fafc] text-lg group-hover:text-blue-400 transition-colors">
                            {umkm.nama}
                          </h3>
                          <p className="text-xs text-[#94a3b8] line-clamp-1 font-normal">
                            {umkm.deskripsi}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
                        <span className="text-xs font-semibold text-blue-400">{umkm.produk}</span>
                        <div className="w-8 h-8 rounded-full bg-[#242c3d] border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 text-white flex items-center justify-center transition-all">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dialog Detail UMKM */}
      <UmkmDialog
        umkm={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onNext={filteredUmkm.length > 1 ? handleNextUmkm : undefined}
        onPrevious={filteredUmkm.length > 1 ? handlePrevUmkm : undefined}
      />
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      umkmList: umkmData,
    },
  };
}
