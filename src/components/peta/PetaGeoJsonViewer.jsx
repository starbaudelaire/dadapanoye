import dynamic from 'next/dynamic';
import { Spinner } from '@/components/ui/spinner';

const PetaGeoJsonClient = dynamic(() => import('./PetaGeoJsonClient'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f1219] flex items-center justify-center" style={{ height: 'clamp(360px, 60vw, 520px)' }}>
      <div className="flex items-center gap-2.5 text-xs font-semibold text-[#94a3b8]">
        <Spinner size="sm" />
        Memuat Renderer Peta Interaktif GeoJSON...
      </div>
    </div>
  ),
});

export default function PetaGeoJsonViewer() {
  return <PetaGeoJsonClient />;
}
