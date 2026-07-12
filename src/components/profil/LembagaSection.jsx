import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm font-medium text-gray-500 w-28 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-800">{value}</span>
    </div>
  );
}

export default function LembagaSection({ lembaga }) {
  return (
    <section id="lembaga" className="py-14 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-serif text-3xl font-bold text-brand-900 mb-2 text-center">
          Lembaga Desa
        </h2>
        <div className="w-12 h-1 bg-brand-500 rounded mx-auto mb-10" />

        <Tabs defaultValue="pkk">
          <TabsList className="w-full mb-6 h-auto">
            <TabsTrigger value="pkk" className="flex-1">PKK</TabsTrigger>
            <TabsTrigger value="karang_taruna" className="flex-1">Karang Taruna</TabsTrigger>
            <TabsTrigger value="posyandu" className="flex-1">Posyandu</TabsTrigger>
            <TabsTrigger value="kwt" className="flex-1">KWT</TabsTrigger>
          </TabsList>

          <TabsContent value="pkk">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">PKK Padukuhan Dadapan</h3>
              <InfoRow label="Ketua" value={lembaga.pkk.ketua} />
              {lembaga.pkk.anggota.length > 0 && (
                <InfoRow label="Anggota" value={lembaga.pkk.anggota.join(', ')} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="karang_taruna">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Karang Taruna Dadapan</h3>
              <InfoRow label="Ketua" value={lembaga.karang_taruna.ketua} />
              {lembaga.karang_taruna.anggota.length > 0 && (
                <InfoRow label="Anggota" value={lembaga.karang_taruna.anggota.join(', ')} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="posyandu">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Posyandu Dadapan</h3>
              <InfoRow label="Ketua" value={lembaga.posyandu.ketua} />
              <InfoRow label="Jadwal" value={lembaga.posyandu.jadwal} />
            </div>
          </TabsContent>

          <TabsContent value="kwt">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Kelompok Wanita Tani (KWT)</h3>
              <InfoRow label="Ketua" value={lembaga.kwt.ketua} />
              {lembaga.kwt.anggota.length > 0 && (
                <InfoRow label="Anggota" value={lembaga.kwt.anggota.join(', ')} />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
