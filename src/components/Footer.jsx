import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Identitas */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-2">🌿 Padukuhan Dadapan</h3>
            <p className="text-brand-200 text-sm leading-relaxed">
              Kalurahan Timbulharjo, Kecamatan Sewon,<br />
              Kabupaten Bantul, D.I. Yogyakarta.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-300 mb-3">
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
                    className="text-brand-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KKN Credit */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-300 mb-3">
              Program KKN
            </h4>
            <p className="text-brand-200 text-sm leading-relaxed">
              Dibangun oleh Tim KKN UPNYK<br />
              Kelompok 84.021<br />
              Program Digitalisasi Desa 2025.
            </p>
          </div>
        </div>

        <div className="border-t border-brand-700 mt-8 pt-6 text-center text-brand-300 text-xs">
          © 2025 Padukuhan Dadapan. Dibuat dengan ❤️ untuk warga.
        </div>
      </div>
    </footer>
  );
}
