import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { GlassButton } from '@/components/ui/glass-button';
import { GlassBadge } from '@/components/ui/glass-badge';

export default function HeroSection() {
  return (
    <section id="home" className="bg-[#0f1219] py-16 sm:py-24 lg:py-32 border-b border-white/10 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{ backgroundImage: "url('/images/hero-desa.jpg')" }}
        aria-hidden="true"
      />

      <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Hero Header */}
        <div className="flex max-w-4xl flex-col items-center gap-6 self-center">
          <GlassBadge variant="accent" className="px-4 py-1.5 text-xs sm:text-sm shadow-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse mr-2" />
            KKN UPNYK 84.021
          </GlassBadge>

          <h1 className="text-4xl font-extrabold leading-[1.15] text-[#f8fafc] sm:text-6xl lg:text-7xl tracking-normal text-balance">
            Padukuhan <span className="text-title-gradient">Dadapan</span>
          </h1>

          <p className="text-[#94a3b8] mx-auto max-w-2xl text-lg sm:text-xl font-normal leading-relaxed">
            Pusat informasi publik, pemetaan wilayah, katalog usaha warga, serta dokumentasi kegiatan masyarakat Padukuhan Dadapan
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 max-sm:w-full">
            <GlassButton variant="primary" size="lg" asChild className="px-8 text-base shadow-xl">
              <Link href="/profil#sejarah">
                Jelajahi Profil <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </GlassButton>
            <GlassButton variant="outline" size="lg" asChild className="px-8 text-base">
              <Link href="/umkm">
                Katalog UMKM
              </Link>
            </GlassButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-70 hover:opacity-100 transition-opacity">
        <ChevronDown className="h-6 w-6 text-blue-400 animate-bounce-gentle" />
      </div>
    </section>
  );
}
