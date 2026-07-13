import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-brand-900 via-brand-800 to-brand-900 text-white mt-auto">
      {/* Decorative top edge */}
      <div className="h-1 bg-gradient-to-r from-brand-400 via-earth-400 to-brand-400" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Identitas */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-3 flex items-center gap-2">
              Padukuhan Dadapan
            </h3>
            <p className="text-brand-200 text-sm leading-relaxed">
              Kalurahan Timbulharjo, Kapanewon Sewon,<br />
              Kabupaten Bantul, Daerah Istimewa Yogyakarta.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-300 mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Profil Padukuhan', href: '/profil' },
                { label: 'Peta Wilayah', href: '/peta' },
                { label: 'Katalog UMKM', href: '/umkm' },
                { label: 'Galeri KKN', href: '/galeri' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-brand-200 hover:text-white transition-colors"
                  >
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                      →
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KKN Credit */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-300 mb-4">
              Program KKN
            </h4>
            <p className="text-brand-300/80 text-sm leading-relaxed">
              Dibangun oleh Tim KKN UPNYK<br />
              Kelompok 84.021<br />
              Program Digitalisasi Desa 2025.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-8 text-center text-brand-300 text-xs">
          © KKN BN 84.021 Periode II Tahun 2026 | UPN &quot;Veteran&quot; Yogyakarta.
        </div>
      </div>
    </footer>
  );
}
