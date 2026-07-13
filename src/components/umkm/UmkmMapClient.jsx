'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapControls,
} from '@/components/ui/map';
import UmkmDialog from './UmkmDialog';

// Center peta di area Padukuhan Dadapan
const DADAPAN_CENTER = [110.3880, -7.7275];
const DEFAULT_ZOOM = 15;

export default function UmkmMapClient({ umkmList }) {
  const [selected, setSelected] = useState(null);

  // Filter hanya yang punya koordinat valid
  const validUmkm = umkmList.filter(
    (u) => u.lat && u.lng && !isNaN(u.lat) && !isNaN(u.lng)
  );

  return (
    <>
      <div className="w-full rounded-2xl overflow-hidden border border-gray-200/80 shadow-md" style={{ height: '420px' }}>
        <Map
          center={DADAPAN_CENTER}
          zoom={DEFAULT_ZOOM}
          theme="light"
        >
          <MapControls position="bottom-right" showZoom={true} />

          {validUmkm.map((umkm) => (
            <MapMarker
              key={umkm.id}
              longitude={umkm.lng}
              latitude={umkm.lat}
              onClick={() => setSelected(umkm)}
            >
              <MarkerContent>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="relative">
                    {/* Ping animasi */}
                    <div className="absolute inset-0 rounded-full bg-brand-400/30 animate-ping" style={{ animationDuration: '2s' }} />
                    {/* Pin utama */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 border-2 border-white shadow-lg flex items-center justify-center hover:from-earth-400 hover:to-earth-600 hover:scale-125 transition-all duration-200">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </MarkerContent>
              <MarkerTooltip>{umkm.nama}</MarkerTooltip>
            </MapMarker>
          ))}
        </Map>
      </div>

      <UmkmDialog
        umkm={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
