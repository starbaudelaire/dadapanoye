import Link from 'next/link';
import { Heart, ArrowUpRight, Instagram } from 'lucide-react';
import { GlassBadge } from '@/components/ui/glass-badge';

export default function Footer() {
  return (
    <footer className="bg-[#0f1219] text-[#f8fafc] border-t border-white/10 mt-auto relative">
      {/* Decorative top accent line — Apple Gradient */}
      <div className="h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />

      {/* Main Footer Container */}
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          {/* Left Column: Brand Info */}
          <div className="space-y-3 max-w-sm">
            <Link href="/" className="inline-block group">
              <span className="font-extrabold text-xl text-logo-gradient">
                Padukuhan Dadapan
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed font-normal">
              Kalurahan Timbulharjo, Kapanewon Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55185.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <img src="/logo-upn.webp" alt="Logo UPN" className="h-6 w-auto object-contain brightness-110" />
              <img src="/logo-kkn.webp" alt="Logo KKN" className="h-6 w-auto object-contain brightness-110" />
              <GlassBadge variant="accent" className="ml-1">
                KKN UPNYK 84.021
              </GlassBadge>
            </div>
          </div>

          {/* Middle Column: Navigation Quick Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-[#94a3b8]">
            <Link href="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            <Link href="/profil" className="hover:text-white transition-colors">
              Profil &amp; Pamong
            </Link>
            <Link href="/peta" className="hover:text-white transition-colors">
              Peta Wilayah
            </Link>
            <Link href="/umkm" className="hover:text-white transition-colors">
              Katalog UMKM
            </Link>
            <Link href="/galeri" className="hover:text-white transition-colors">
              Galeri KKN
            </Link>
          </div>

          {/* Right Column: CTA Quick Action & Social Media Links */}
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <Link
              href="/umkm"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#181f2e] border border-white/10 hover:border-blue-400/40 text-[#f8fafc] hover:text-white transition-all shadow-md"
            >
              Portal UMKM Warga <ArrowUpRight className="h-4 w-4 text-blue-400" />
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/lelanadadapan"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 hover:bg-pink-500/10 text-[#94a3b8] hover:text-pink-400 transition-all duration-300 flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com/@dadapan.oye"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-[#94a3b8] hover:text-cyan-400 transition-all duration-300 flex items-center justify-center"
                aria-label="TikTok"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b] font-normal">
          <p>© {new Date().getFullYear()} Padukuhan Dadapan. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> oleh Tim KKN UPN "Veteran" Yogyakarta 84.021
          </p>
        </div>
      </div>
    </footer>
  );
}
