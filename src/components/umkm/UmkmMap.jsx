import dynamic from 'next/dynamic';

// maplibre-gl hanya bisa jalan di browser (bukan SSR)
const UmkmMapClient = dynamic(() => import('./UmkmMapClient'), { ssr: false });

export default function UmkmMap({ umkmList, onSelect }) {
  return <UmkmMapClient umkmList={umkmList} onSelect={onSelect} />;
}
