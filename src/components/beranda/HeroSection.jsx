import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-900">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/images/hero-desa.jpg')" }}
        aria-hidden="true"
      />

      {/* Primary gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/70 via-brand-900/40 to-brand-900/90" />

      {/* Secondary directional overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/30 via-transparent to-brand-900/30" />

      {/* Decorative floating blobs */}
      <div
        className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-brand-400/10 blur-3xl animate-float"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-32 -right-24 w-96 h-96 rounded-full bg-brand-400/10 blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-brand-400/10 blur-3xl animate-float"
        style={{ animationDelay: '4s' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
        <p
          className="text-brand-300 text-sm font-medium uppercase tracking-widest mb-4 animate-fade-in"
        >
          Portal Resmi
        </p>

        <h1
          className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-5 animate-slide-up bg-gradient-to-r from-white via-brand-200 to-white bg-clip-text text-transparent"
        >
          Padukuhan Dadapan
        </h1>

        <p
          className="text-brand-100/90 text-base md:text-lg leading-relaxed mb-10 animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          Kalurahan Timbulharjo, Kapanewon Sewon, Kabupaten Bantul,
          <br className="hidden md:block" />
          Daerah Istimewa Yogyakarta.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <Link
            href="/profil#sejarah"
            className="px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-all hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5"
          >
            Kenali Kami
          </Link>
          <Link
            href="/umkm"
            className="px-8 py-3.5 rounded-xl border-2 border-white/30 hover:bg-white/10 hover:border-white/50 text-white font-semibold transition-all hover:-translate-y-0.5"
          >
            Lihat Katalog UMKM
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
        <ChevronDown className="h-6 w-6 text-white/60" />
      </div>
    </section>
  );
}
