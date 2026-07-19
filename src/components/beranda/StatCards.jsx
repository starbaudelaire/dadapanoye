import { Users, Home, MapPin, Sprout } from 'lucide-react';
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card';

export default function StatCards({ statistik }) {
  const stats = [
    {
      icon: <Users className="h-5 w-5 text-blue-400" />,
      label: 'Jumlah Warga',
      value: statistik.total_jiwa.toLocaleString('id-ID'),
      keterangan: 'Jiwa Terdata',
    },
    {
      icon: <Home className="h-5 w-5 text-blue-400" />,
      label: 'Kepala Keluarga',
      value: statistik.total_kk.toLocaleString('id-ID'),
      keterangan: 'KK Terdaftar',
    },
    {
      icon: <MapPin className="h-5 w-5 text-blue-400" />,
      label: 'Luas Wilayah',
      value: statistik.luas_wilayah,
      keterangan: 'Wilayah Padukuhan',
    },
    {
      icon: <Sprout className="h-5 w-5 text-blue-400" />,
      label: 'Sektor Utama',
      value: statistik.sektor_utama,
      keterangan: 'Potensi Lokal',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0f1219] border-b border-white/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            DEMOGRAFI &amp; WILAYAH
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f8fafc] tracking-normal">
            Gambaran Umum Padukuhan
          </h2>
          <p className="text-[#94a3b8] text-base font-normal leading-relaxed">
            Ringkasan data kependudukan dan statistik wilayah Padukuhan Dadapan.
          </p>
        </div>

        {/* 4-Column Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <GlassCard
              key={stat.label}
              className="hover:-translate-y-1 transition-all duration-300 bg-[#181f2e]/85 border border-white/10 p-0"
            >
              <GlassCardContent className="flex flex-col items-center text-center p-6 space-y-3">
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-3.5 rounded-xl border border-blue-400/30 shadow-md">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] font-sans tracking-normal">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-[#f8fafc] mt-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-[#64748b] mt-0.5 font-normal">
                    {stat.keterangan}
                  </p>
                </div>
              </GlassCardContent>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
