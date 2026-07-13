import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Profil Padukuhan',
    href: '/profil',
    children: [
      { label: 'Sejarah & Visi Misi', href: '/profil#sejarah' },
      { label: 'Pemerintahan', href: '/profil#pamong' },
      { label: 'Lembaga Desa', href: '/profil#lembaga' },
    ],
  },
  { label: 'Peta Wilayah', href: '/peta' },
  { label: 'Katalog UMKM', href: '/umkm' },
  { label: 'Galeri KKN', href: '/galeri' },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => router.pathname === href;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 transition-all duration-300',
        scrolled ? 'shadow-lg' : 'shadow-sm'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-serif font-bold text-brand-800 text-lg">
          <span>Padukuhan Dadapan</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={cn(
                    'relative flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    'text-gray-600 hover:text-brand-700',
                    'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500 after:scale-x-0 after:transition-transform after:duration-300 after:origin-center',
                    dropdownOpen && 'text-brand-700 after:scale-x-100'
                  )}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-300',
                      dropdownOpen && 'rotate-180'
                    )}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-gray-100 bg-white shadow-xl animate-scale-in overflow-hidden">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="group relative block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                      >
                        <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-brand-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500 after:scale-x-0 after:transition-transform after:duration-300 after:origin-center',
                  isActive(link.href)
                    ? 'text-brand-700 font-semibold after:scale-x-100'
                    : 'text-gray-600 hover:text-brand-700 hover:after:scale-x-100'
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl px-4 py-3 space-y-1 animate-slide-up">
          {/* Decorative top gradient */}
          <div className="h-0.5 bg-gradient-to-r from-brand-400 via-earth-400 to-brand-400 -mt-3 mb-3 rounded-full" />

          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {link.label}
                </p>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-3 text-sm text-gray-600 hover:text-brand-700 hover:bg-brand-50 rounded-md transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-3 py-3 rounded-md text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'text-brand-700 bg-brand-50 font-semibold'
                    : 'text-gray-600 hover:text-brand-700 hover:bg-brand-50'
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}
