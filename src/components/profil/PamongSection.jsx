import { useState } from 'react';
import { ChevronDown, ChevronUp, UserCheck, ShieldCheck, MapPin } from 'lucide-react';
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
} from '@/components/ui/glass-card';
import { GlassAvatar, GlassAvatarImage, GlassAvatarFallback } from '@/components/ui/glass-avatar';
import { GlassBadge } from '@/components/ui/glass-badge';

export default function PamongSection({ pamong, kukuban }) {
  const [expandedKukuban, setExpandedKukuban] = useState(null);

  const dukuh = pamong.find((p) => p.jabatan === 'Dukuh') || {
    nama: 'Pak Dukuh',
    jabatan: 'Dukuh',
  };

  const toggleKukuban = (nama) => {
    setExpandedKukuban(expandedKukuban === nama ? null : nama);
  };

  return (
    <div className="py-6">
      <div className="container mx-auto px-0 space-y-16">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2 block">
            STRUKTUR HORISONTAL &amp; VERTIKAL
          </span>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#f8fafc] tracking-normal mb-2">
            Bagan Organisasi Pamong
          </h2>
          <p className="text-[#94a3b8] text-sm font-normal">
            Struktur kepemimpinan dan tata kelola wilayah administrasi Padukuhan Dadapan
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full mx-auto mt-4" />
        </div>

        {/* Interactive Org Chart Tree Container */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          {/* TOP NODE: Dukuh (Kepala Wilayah) */}
          <div className="relative z-10 w-full max-w-sm">
            <GlassCard className="w-full bg-[#181f2e] border border-blue-400/40 shadow-2xl hover:border-blue-400 transition-all">
              <GlassCardHeader className="items-center text-center p-6 pb-4">
                <div className="relative mb-3">
                  <GlassAvatar className="h-22 w-22 border-2 border-blue-400/60 shadow-lg">
                    <GlassAvatarImage src={dukuh.foto || '/avatar.png'} alt={dukuh.nama} />
                    <GlassAvatarFallback>{dukuh.nama ? dukuh.nama.charAt(0) : 'D'}</GlassAvatarFallback>
                  </GlassAvatar>
                  <span className="absolute -bottom-1 -right-1 p-1 bg-blue-500 text-white rounded-full shadow-md">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                </div>
                <GlassCardTitle className="mt-1 text-xl font-bold text-[#f8fafc] tracking-normal">
                  {dukuh.nama}
                </GlassCardTitle>
                <GlassCardDescription className="text-xs text-blue-400 font-semibold uppercase tracking-wider mt-0.5">
                  {dukuh.jabatan} Padukuhan Dadapan
                </GlassCardDescription>
              </GlassCardHeader>
              <GlassCardContent className="text-center p-6 pt-0 pb-6">
                <div className="flex justify-center gap-2">
                  <GlassBadge variant="accent">Pimpinan Wilayah</GlassBadge>
                  <GlassBadge variant="secondary">Masa Bakti Active</GlassBadge>
                </div>
              </GlassCardContent>
            </GlassCard>
          </div>

          {/* Tree Line Connector 1 (Vertical Line) */}
          <div className="w-1 h-12 bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-500 rounded-full my-1 shadow-md" />

          {/* MID NODE: Staff / Perangkat Dukuh */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
            <div className="bg-[#181f2e]/90 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Sekretaris Dukuh</p>
                <p className="text-sm font-bold text-[#f8fafc]">Kepengurusan Wilayah</p>
              </div>
            </div>

            <div className="bg-[#181f2e]/90 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Bendahara Dukuh</p>
                <p className="text-sm font-bold text-[#f8fafc]">Keuangan &amp; Asset</p>
              </div>
            </div>
          </div>

          {/* Tree Line Connector 2 (Header Section) */}
          <div className="w-full flex flex-col items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full shadow-md" />
            <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest my-2 px-3 py-1 rounded-full bg-[#181f2e] border border-white/10">
              4 Wilayah Kukuban RT
            </span>
            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full shadow-md" />
          </div>

          {/* BOTTOM NODES: 4 Kukuban Grid (Expandable Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
            {kukuban.map((kb) => {
              const isExpanded = expandedKukuban === kb.nama;
              return (
                <div key={kb.nama} className="group">
                  <GlassCard
                    onClick={() => toggleKukuban(kb.nama)}
                    className={`w-full cursor-pointer transition-all duration-300 ${
                      isExpanded
                        ? 'border-blue-400/50 bg-[#181f2e] shadow-2xl'
                        : 'border-white/10 bg-[#181f2e]/85 hover:border-white/20'
                    }`}
                  >
                    <GlassCardHeader className="p-6 pb-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <GlassBadge variant="accent">Kukuban {kb.nama}</GlassBadge>
                        <GlassBadge variant="default">Ketua: {kb.ketua}</GlassBadge>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <GlassCardTitle className="text-lg font-bold text-[#f8fafc] group-hover:text-blue-400 transition-colors">
                          Wilayah {kb.nama}
                        </GlassCardTitle>
                        <div className="w-7 h-7 rounded-full bg-[#242c3d] border border-white/10 flex items-center justify-center text-blue-400">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      <GlassCardDescription className="text-[#94a3b8] text-xs">
                        Klik untuk melihat daftar {kb.rt.length} RT terdaftar
                      </GlassCardDescription>
                    </GlassCardHeader>

                    <GlassCardContent className="p-6 pt-0 pb-6">
                      {/* Always show badge list */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {kb.rt.map((rt) => (
                          <span
                            key={rt}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-[#242c3d] text-[#f8fafc] border border-white/10"
                          >
                            <MapPin className="h-3 w-3 text-blue-400" />
                            {rt}
                          </span>
                        ))}
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
