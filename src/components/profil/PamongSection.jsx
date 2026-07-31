import { ShieldCheck, MapPin, UserCheck } from 'lucide-react';
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
} from '@/components/ui/glass-card';
import { GlassAvatar, GlassAvatarImage, GlassAvatarFallback } from '@/components/ui/glass-avatar';
import { GlassBadge } from '@/components/ui/glass-badge';

export default function PamongSection({ pamong, rtList }) {
  const dukuh = pamong.find((p) => p.jabatan === 'Dukuh') || {
    nama: 'Pak Dukuh',
    jabatan: 'Dukuh',
  };

  return (
    <div className="py-6">
      <div className="container mx-auto px-0 space-y-12">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2 block">
            STRUKTUR &amp; TATA KELOLA WILAYAH
          </span>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#f8fafc] tracking-normal mb-2">
            Kepengurusan Padukuhan Dadapan
          </h2>
          
          <div className="w-12 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Interactive Org Chart Tree Container */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          {/* TOP NODE: Dukuh (Kepala Wilayah) */}
          <div className="relative z-10 w-full max-w-sm">
            <GlassCard className="w-full bg-[#181f2e] border border-blue-400/40 shadow-2xl hover:border-blue-400 transition-all">
              <GlassCardHeader className="items-center text-center p-6 pb-4">
                <div className="relative mb-3 mx-auto w-fit">
                  <GlassAvatar className="h-22 w-22 border-2 border-blue-400/60 shadow-lg bg-blue-500/10 flex items-center justify-center">
                    <ShieldCheck className="h-10 w-10 text-blue-400" />
                  </GlassAvatar>
                </div>
                <GlassCardTitle className="mt-1 text-xl font-bold text-[#f8fafc] tracking-normal">
                  {dukuh.nama}
                </GlassCardTitle>
                <GlassCardDescription className="text-xs text-blue-400 font-semibold uppercase tracking-wider mt-0.5">
                  {dukuh.jabatan} Padukuhan Dadapan
                </GlassCardDescription>
              </GlassCardHeader>
              <GlassCardContent className="text-center p-6 pt-0 pb-6">
                <div className="flex justify-center">
                  <GlassBadge variant="accent">Pimpinan Wilayah</GlassBadge>
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>

          {/* Tree Line Connector (Vertical Line) */}
          <div className="w-full flex flex-col items-center">
            <div className="w-1 h-16 bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-500 rounded-full shadow-md" />
            <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest my-2 px-4 py-1.5 rounded-full bg-[#181f2e] border border-white/10">
              Rukun Tetangga (RT) Padukuhan
            </span>
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full shadow-md" />
          </div>

          {/* BOTTOM NODES: Grid of 9 RTs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
            {rtList.map((rt) => (
              <GlassCard
                key={rt.nomor}
                className="bg-[#181f2e]/85 border border-white/10 hover:border-blue-400/40 transition-all duration-300 shadow-xl p-0"
              >
                <GlassCardHeader className="p-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">
                        Ketua {rt.nomor}
                      </span>
                      <h3 className="font-bold text-[#f8fafc] text-sm sm:text-base tracking-normal">
                        {rt.nama}
                      </h3>
                    </div>
                  </div>
                </GlassCardHeader>
                <GlassCardContent className="px-5 pb-5 pt-0">
                  <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] font-normal">
                    <MapPin className="h-3.5 w-3.5 text-blue-400" />
                    <span>Wilayah Rukun Tetangga {rt.nomor.split(' ')[1]}</span>
                  </div>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
