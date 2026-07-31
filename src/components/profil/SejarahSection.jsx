import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card';
import { GlassBadge } from '@/components/ui/glass-badge';
import { BookOpen, Target, Award } from 'lucide-react';

export default function SejarahSection({ sejarah, visi, misi = [] }) {
  return (
    <div className="space-y-12">
      {/* 2-Column Split Cards — Reference Layout Pattern */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Sejarah Padukuhan (7 Cols) */}
        <div className="lg:col-span-7">
          <GlassCard className="h-full bg-[#181f2e]/85 border border-white/10 p-0 shadow-2xl">
            <GlassCardContent className="p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                        PROFIL &amp; GAMBARAN UMUM
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc]">
                        Deskripsi Umum
                      </h2>
                    </div>
                  </div>
                  <GlassBadge variant="accent">Profil Wilayah</GlassBadge>
                </div>

                <div className="prose prose-invert max-w-none text-[#94a3b8] text-sm sm:text-base leading-relaxed font-normal space-y-4">
                  {sejarah && sejarah.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#64748b]">
                <Award className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Padukuhan Dadapan • Kalurahan Timbulharjo, Sewon, Bantul</span>
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>

        {/* Right Column: Visi & Misi Padukuhan (5 Cols) */}
        <div className="lg:col-span-5">
          <GlassCard className="h-full bg-[#181f2e]/85 border border-white/10 p-0 shadow-2xl">
            <GlassCardContent className="p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                        ARAH KEMAJUAN
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc]">
                        Visi &amp; Misi
                      </h2>
                    </div>
                  </div>
                  <GlassBadge variant="accent">Rencana Strategis</GlassBadge>
                </div>

                <Accordion className="space-y-3">
                  <AccordionItem
                    value="visi"
                    className="rounded-2xl overflow-hidden border border-white/10 bg-[#242c3d]/60 px-5"
                  >
                    <AccordionTrigger className="font-semibold text-[#f8fafc] hover:no-underline hover:text-blue-400 py-4 text-sm">
                      Visi Pembangunan Padukuhan
                    </AccordionTrigger>
                    <AccordionContent className="text-[#94a3b8] text-xs sm:text-sm leading-relaxed pb-5 font-normal">
                      {visi}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="misi"
                    className="rounded-2xl overflow-hidden border border-white/10 bg-[#242c3d]/60 px-5"
                  >
                    <AccordionTrigger className="font-semibold text-[#f8fafc] hover:no-underline hover:text-blue-400 py-4 text-sm">
                      Misi &amp; Program Kerja Utama
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <ul className="space-y-3">
                        {misi.map((item, i) => (
                          <li key={i} className="flex gap-3 text-[#94a3b8] text-xs sm:text-sm leading-relaxed font-normal">
                            <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 text-blue-400 text-[11px] flex items-center justify-center font-bold">
                              {i + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="tradisi"
                    className="rounded-2xl overflow-hidden border border-white/10 bg-[#242c3d]/60 px-5"
                  >
                    <AccordionTrigger className="font-semibold text-[#f8fafc] hover:no-underline hover:text-blue-400 py-4 text-sm">
                      Tradisi &amp; Budaya Lokal
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-[#94a3b8] text-xs sm:text-sm leading-relaxed font-normal space-y-3">
                      <p>
                        Masyarakat Padukuhan Dadapan senantiasa merawat tradisi leluhur sebagai bagian dari identitas kultural dan ungkapan rasa syukur. Beberapa tradisi yang masih aktif dilaksanakan antara lain:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong className="text-[#f8fafc]">Satu Suro:</strong> Peringatan tahun baru Jawa yang diisi dengan kegiatan doa bersama dan refleksi spiritual untuk keselamatan seluruh warga padukuhan.
                        </li>
                        <li>
                          <strong className="text-[#f8fafc]">Wiwitan:</strong> Ritual syukur tradisional yang dilaksanakan menjelang musim panen padi. Acara ini biasanya dimeriahkan dengan makan bersama di area persawahan dan sering kali mengundang Bupati serta jajaran pejabat daerah sebagai bentuk pelestarian kebudayaan agraris.
                        </li>
                      </ul>
                      <p className="pt-2 border-t border-white/5 text-[11px] text-[#64748b]">
                        *Catatan Administrasi: Pembagian wilayah di Kalurahan Timbulharjo terbagi ke dalam sistem pembagian wilayah adat/administrasi yang disebut Kring.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-[#64748b] text-center">
                Pemerintahan &amp; Kemasyarakatan Dadapan
              </div>
            </GlassCardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
