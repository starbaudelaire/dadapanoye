import Link from 'next/link';
import { Map, ShoppingBag, Images, ArrowRight } from 'lucide-react';

const highlights = [
  {
    icon: <Map className="h-6 w-6 text-brand-600" />,
    iconBg: 'from-brand-50 to-brand-100',
    title: 'Peta Wilayah',
    desc: 'Lihat peta administrasi dan peta kebencanaan Padukuhan Dadapan.',
    href: '/peta',
  },
  {
    icon: <ShoppingBag className="h-6 w-6 text-earth-500" />,
    iconBg: 'from-earth-50 to-earth-100',
    title: 'Katalog UMKM',
    desc: 'Temukan produk dan usaha lokal unggulan warga Dadapan.',
    href: '/umkm',
  },
  {
    icon: <Images className="h-6 w-6 text-brand-600" />,
    iconBg: 'from-brand-50 to-brand-100',
    title: 'Galeri KKN',
    desc: 'Dokumentasi kegiatan Tim KKN UPNYK Kelompok 84.021.',
    href: '/galeri',
  },
];

export default function HighlightCards() {
  return (
    <section className="bg-brand-50/50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-medium mb-3">
            🌿 Jelajahi Lebih Jauh
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-900 mb-2">
            Jelajahi Dadapan
          </h2>
          <p className="text-gray-500 text-sm">
            Mulai dari sini untuk mengenal lebih dekat padukuhan kami.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative bg-white rounded-2xl p-6 md:p-8 border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-brand-400 after:to-brand-600 after:scale-x-0 after:group-hover:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>

              {/* Title with arrow */}
              <h3 className="font-semibold text-gray-800 group-hover:text-brand-700 text-lg mb-2 transition-colors">
                {item.title}
                <ArrowRight className="inline h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all ml-1" />
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
