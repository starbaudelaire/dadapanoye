import Link from 'next/link';
import { Map, ShoppingBag, Images } from 'lucide-react';

const highlights = [
  {
    icon: <Map className="h-8 w-8 text-brand-600" />,
    title: 'Peta Wilayah',
    desc: 'Lihat peta administrasi dan peta kebencanaan Padukuhan Dadapan.',
    href: '/peta',
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-earth-500" />,
    title: 'Katalog UMKM',
    desc: 'Temukan produk dan usaha lokal unggulan warga Dadapan.',
    href: '/umkm',
  },
  {
    icon: <Images className="h-8 w-8 text-brand-600" />,
    title: 'Galeri KKN',
    desc: 'Dokumentasi kegiatan Tim KKN UPNYK Kelompok 84.021.',
    href: '/galeri',
  },
];

export default function HighlightCards() {
  return (
    <section className="bg-brand-50 py-14">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-900 text-center mb-2">
          Jelajahi Dadapan
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Mulai dari sini untuk mengenal lebih dekat padukuhan kami.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-semibold text-gray-800 group-hover:text-brand-700 text-lg mb-1 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
