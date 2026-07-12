import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-brand-900">
      {/* Background placeholder — ganti src dengan foto desa asli */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/images/hero-desa.jpg')" }}
        aria-hidden="true"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/60 via-brand-900/40 to-brand-900/80" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto animate-fade-in">
        <p className="text-brand-300 text-sm font-medium uppercase tracking-widest mb-3">
          Portal Resmi
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-4">
          Padukuhan Dadapan
        </h1>
        <p className="text-brand-100 text-base md:text-lg leading-relaxed mb-8">
          Kalurahan Timbulharjo, Kecamatan Sewon, Kabupaten Bantul,<br className="hidden md:block" />
          Daerah Istimewa Yogyakarta.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/profil#sejarah"
            className="px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors"
          >
            Kenali Kami
          </Link>
          <Link
            href="/umkm"
            className="px-6 py-3 rounded-lg border border-white/40 hover:bg-white/10 text-white font-medium transition-colors"
          >
            Lihat Katalog UMKM
          </Link>
        </div>
      </div>
    </section>
  );
}
