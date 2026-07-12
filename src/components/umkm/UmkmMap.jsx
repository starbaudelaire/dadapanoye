import { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import UmkmDialog from './UmkmDialog';

export default function UmkmMap({ umkmList }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100" style={{ paddingBottom: '60%' }}>
        {/* Base map image — ganti dengan foto/screenshoot peta desa asli */}
        <Image
          src="/images/peta/peta-umkm-base.jpg"
          alt="Peta UMKM Padukuhan Dadapan"
          fill
          className="object-cover"
          unoptimized
        />

        {/* Pins */}
        {umkmList.map((umkm) => (
          <button
            key={umkm.id}
            onClick={() => setSelected(umkm)}
            style={{ top: `${umkm.top}%`, left: `${umkm.left}%` }}
            className="absolute -translate-x-1/2 -translate-y-full group"
            aria-label={`Lihat detail ${umkm.nama}`}
          >
            {/* Pin icon */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-brand-600 border-2 border-white shadow-lg flex items-center justify-center group-hover:bg-earth-500 group-hover:scale-110 transition-all">
                <MapPin className="h-4 w-4 text-white fill-white" />
              </div>
              {/* Tooltip nama */}
              <div className="mt-1 px-2 py-0.5 bg-white/90 rounded text-xs font-medium text-gray-800 shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {umkm.nama}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Dialog */}
      <UmkmDialog
        umkm={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
