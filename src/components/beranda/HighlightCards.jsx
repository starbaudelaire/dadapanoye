import Link from 'next/link';
import { Map, ShoppingBag, Images, ArrowUpRight } from 'lucide-react';
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card';
import { GlassBadge } from '@/components/ui/glass-badge';

const highlights = [
  {
    icon: <Map className="h-5 w-5 text-blue-400" />,
    title: 'Peta Wilayah & Kebencanaan',
    desc: 'Pemetaan tata ruang administrasi, batas wilayah RT/Kukuban, serta titik kumpul evakuasi bencana.',
    href: '/peta',
    badge: 'Interaktif & GIS',
    subLabel: 'Spasial Wilayah',
  },
  {
    icon: <ShoppingBag className="h-5 w-5 text-blue-400" />,
    title: 'Katalog UMKM Lokal',
    desc: 'Direktori komprehensif usaha warga, produk olahan, kerajinan tangan, dan kontak langsung pembuat.',
    href: '/umkm',
    badge: 'Ekonomi Warga',
    subLabel: 'Direktori Produk',
  },
  {
    icon: <Images className="h-5 w-5 text-blue-400" />,
    title: 'Galeri Kegiatan KKN',
    desc: 'Dokumentasi visual rangkaian program pengabdian masyarakat Tim KKN UPNYK 84.021.',
    href: '/galeri',
    badge: 'Dokumentasi',
    subLabel: 'Pengabdian 2026',
  },
];

export default function HighlightCards() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#0f1219] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header — Reference Layout */}
        <div className="space-y-3 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            JELAJAHI PORTAL
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f8fafc] tracking-normal">
            Layanan &amp; Fitur Utama Padukuhan
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg font-normal leading-relaxed">
            Akses cepat menuju peta administrasi spasial, katalog usaha warga, dan galeri dokumentasi kegiatan.
          </p>
        </div>

        {/* 3-Column Card Grid — Reference Layout Pattern */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <Link key={item.title} href={item.href} className="group block cursor-pointer">
              <GlassCard className="h-full bg-[#181f2e]/85 border border-white/10 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between p-0">
                <GlassCardContent className="p-6 space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    {/* Top Row: Icon Box & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                        {item.icon}
                      </div>
                      <GlassBadge variant="accent">
                        {item.badge}
                      </GlassBadge>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-[#f8fafc] text-xl group-hover:text-blue-400 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[#94a3b8] text-sm leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Row — Reference Pattern */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4">
                    <span className="text-xs font-semibold text-[#64748b]">{item.subLabel}</span>
                    <div className="w-8 h-8 rounded-full bg-[#242c3d] border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 text-white flex items-center justify-center transition-all">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
