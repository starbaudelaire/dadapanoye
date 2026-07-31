import {
  GlassCard,
  GlassCardContent,
} from '@/components/ui/glass-card';
import { GlassBadge } from '@/components/ui/glass-badge';
import { Users, Heart, Trash2, HeartHandshake } from 'lucide-react';

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0 text-xs">
      <span className="font-semibold text-[#64748b] uppercase tracking-wide">
        {label}
      </span>
      <span className="text-[#f8fafc] font-medium text-right ml-4">{value}</span>
    </div>
  );
}

export default function LembagaSection({ lembaga = {} }) {
  const pilah_sampah = lembaga.pilah_sampah || { ketua: '-' };
  const karang_taruna = lembaga.karang_taruna || { ketua: '-' };
  const posyandu = lembaga.posyandu || {};
  const paguyuban_rt = lembaga.paguyuban_rt || {};

  const daftarLembaga = [
    {
      id: 'pilah_sampah',
      nama: 'Kelompok Pilah Sampah',
      kategori: 'Pengelolaan Lingkungan',
      icon: <Trash2 className="h-5 w-5 text-blue-400" />,
      deskripsi: 'Program kesadaran lingkungan kemasyarakatan yang berfokus pada pemilahan sampah organik dan anorganik secara mandiri.',
      rows: [
        { label: 'Ketua', value: pilah_sampah.ketua || '-' },
        { label: 'Fokus Kegiatan', value: 'Pemilahan & Composting' }
      ]
    },
    {
      id: 'karang_taruna',
      nama: 'Karang Taruna Dadapan',
      kategori: 'Kepemudaan',
      icon: <HeartHandshake className="h-5 w-5 text-blue-400" />,
      deskripsi: 'Organisasi kepemudaan yang aktif dalam kegiatan sosial, olahraga, kreativitas warga, dan pengabdian masyarakat.',
      rows: [
        { label: 'Peran', value: 'Pengembangan Potensi Pemuda' }
      ]
    },
    {
      id: 'posyandu',
      nama: 'Posyandu Dadapan',
      kategori: 'Kesehatan Masyarakat',
      icon: <Heart className="h-5 w-5 text-blue-400" />,
      deskripsi: 'Layanan kesehatan terpadu berkala khusus untuk pembinaan kesehatan balita (bayi) dan lansia di wilayah Dadapan.',
      rows: [
        { label: 'Pembina', value: posyandu.pembina || 'Bu Dukuh' },
        { label: 'Posyandu Bayi', value: posyandu.posyandu_bayi || '-' },
        { label: 'Posyandu Lansia', value: posyandu.posyandu_lansia || '-' },
        { label: 'Sekretaris', value: posyandu.sekretaris || '-' },
        { label: 'Jadwal Rutin', value: posyandu.jadwal || 'Minggu Sebelum Rapat RT' }
      ]
    },
    {
      id: 'paguyuban_rt',
      nama: 'Paguyuban RT Padukuhan',
      kategori: 'Tata Kelola Wilayah',
      icon: <Users className="h-5 w-5 text-blue-400" />,
      deskripsi: 'Wadah koordinasi, silaturahmi, dan pembahasan program kerja rutin antar pengurus Rukun Tetangga (RT) se-Dadapan.',
      rows: [
        { label: 'Ketua', value: paguyuban_rt.ketua || '-' },
        { label: 'Sekretaris', value: paguyuban_rt.sekretaris || '-' },
        { label: 'Bendahara', value: paguyuban_rt.bendahara || '-' },
        { label: 'Kegiatan Rutin', value: paguyuban_rt.kegiatan || 'Rapat RT se-Padukuhan' },
        { label: 'Jadwal Rapat', value: 'Malam Selasa Pon' }
      ]
    }
  ];

  return (
    <div className="space-y-10">
      {/* Section Sub-Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          MITRA KEMASYARAKATAN
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
          Lembaga &amp; Organisasi Desa
        </h2>
        <p className="text-[#94a3b8] text-sm sm:text-base font-normal">
          Organisasi dan lembaga sosial penggerak kegiatan di Padukuhan Dadapan
        </p>
      </div>

      {/* 2-Column Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {daftarLembaga.map((item) => (
          <GlassCard key={item.id} className="w-full flex flex-col justify-between bg-[#181f2e]/85 border border-white/10 p-0 shadow-xl hover:border-blue-400/40 transition-all duration-300">
            <GlassCardContent className="p-6 sm:p-8 space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30 flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  <GlassBadge variant="accent">{item.kategori}</GlassBadge>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc]">
                    {item.nama}
                  </h3>
                  <p className="text-[#94a3b8] text-xs sm:text-sm font-normal leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>

                {item.id === 'karang_taruna' && (
                  <div className="mt-4 p-4 rounded-xl bg-[#242c3d]/60 border border-white/10 space-y-2">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                      Pembagian Wilayah Karang Taruna:
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-[11px] sm:text-xs text-[#94a3b8]">
                      <div className="space-y-0.5">
                        <strong className="text-[#f8fafc] block">Dadapan Lor</strong>
                        <span>RT 02, RT 03</span>
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-[#f8fafc] block">Bangi Kulon</strong>
                        <span>RT 01, RT 07</span>
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-[#f8fafc] block">Bangi Wetan</strong>
                        <span>RT 04, RT 09</span>
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-[#f8fafc] block">Tembi Tempel</strong>
                        <span>RT 05</span>
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-[#f8fafc] block">Tembi Ngentak</strong>
                        <span>RT 06</span>
                      </div>
                      <div className="space-y-0.5">
                        <strong className="text-[#f8fafc] block">Miri &amp; Dukuhan</strong>
                        <span>RT 08</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1 pt-4 border-t border-white/10 mt-2">
                {item.rows.map((row) => (
                  <InfoRow key={row.label} label={row.label} value={row.value} />
                ))}
              </div>
            </GlassCardContent>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
