import {
  GlassCard,
  GlassCardContent,
} from '@/components/ui/glass-card';
import { GlassBadge } from '@/components/ui/glass-badge';
import { Users, Heart, Sprout, HeartHandshake, ArrowUpRight } from 'lucide-react';

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0 text-xs">
      <span className="font-semibold text-[#64748b] uppercase tracking-wide">
        {label}
      </span>
      <span className="text-[#f8fafc] font-medium">{value}</span>
    </div>
  );
}

export default function LembagaSection({ lembaga = {} }) {
  const pkk = lembaga.pkk || { ketua: '-', anggota: [] };
  const karang_taruna = lembaga.karang_taruna || { ketua: '-', anggota: [] };
  const posyandu = lembaga.posyandu || { ketua: '-', jadwal: '-' };
  const kwt = lembaga.kwt || { ketua: '-', anggota: [] };

  const daftarLembaga = [
    {
      id: 'pkk',
      nama: 'PKK Padukuhan Dadapan',
      kategori: 'Pemberdayaan Perempuan',
      icon: <Users className="h-5 w-5 text-blue-400" />,
      deskripsi: 'Wadah pembinaan kesejahteraan keluarga dan kegiatan kemasyarakatan wanita.',
      ketua: pkk.ketua,
      detail: pkk.anggota && pkk.anggota.length > 0 ? pkk.anggota.join(', ') : 'Pengurus Terdaftar',
      detailLabel: 'Pengurus Utama',
    },
    {
      id: 'karang_taruna',
      nama: 'Karang Taruna Dadapan',
      kategori: 'Kepemudaan',
      icon: <HeartHandshake className="h-5 w-5 text-blue-400" />,
      deskripsi: 'Organisasi kepemudaan yang aktif dalam kegiatan sosial, olahraga, dan kreativitas warga.',
      ketua: karang_taruna.ketua,
      detail: karang_taruna.anggota && karang_taruna.anggota.length > 0 ? karang_taruna.anggota.join(', ') : 'Pemuda Terdaftar',
      detailLabel: 'Pengurus Utama',
    },
    {
      id: 'posyandu',
      nama: 'Posyandu Dadapan',
      kategori: 'Kesehatan Masyarakat',
      icon: <Heart className="h-5 w-5 text-blue-400" />,
      deskripsi: 'Layanan kesehatan berkala untuk balita, ibu hamil, dan lansia Padukuhan Dadapan.',
      ketua: posyandu.ketua,
      detail: posyandu.jadwal || 'Rutin Bulanan',
      detailLabel: 'Jadwal Rutin',
    },
    {
      id: 'kwt',
      nama: 'Kelompok Wanita Tani (KWT)',
      kategori: 'Ketahanan Pangan',
      icon: <Sprout className="h-5 w-5 text-blue-400" />,
      deskripsi: 'Kelompok tani wanita untuk pemanfaatan pekarangan dan pemberdayaan pangan lokal.',
      ketua: kwt.ketua,
      detail: kwt.anggota && kwt.anggota.length > 0 ? kwt.anggota.join(', ') : 'Anggota Terdaftar',
      detailLabel: 'Pengurus Utama',
    },
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

      {/* 2-Column Cards Grid — Reference Layout Pattern */}
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
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10 mt-2">
                <InfoRow label="Ketua" value={item.ketua} />
                {item.detail && <InfoRow label={item.detailLabel} value={item.detail} />}
              </div>
            </GlassCardContent>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
