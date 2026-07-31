import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/peta', label: 'Peta Wilayah' },
  { href: '/umkm', label: 'Katalog UMKM' },
  { href: '/galeri', label: 'Galeri KKN' },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    // Apply theme on mount
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Page Route Navigation Spinner Listener
  useEffect(() => {
    const handleStart = () => setIsNavigating(true);
    const handleComplete = () => {
      setIsNavigating(false);
      setMobileOpen(false);
      setDropdownOpen(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 w-full transition-all duration-300',
        scrolled
          ? 'bg-[#0f1219]/80 backdrop-blur-3xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]'
          : 'bg-[#0f1219]/40 backdrop-blur-2xl border-b border-white/5'
      )}
    >
      {/* Top Global Route Loading Bar */}
      {isNavigating && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 animate-pulse z-50" />
      )}

      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo — Clean Minimal Text Logo */}
        <Link href="/" className="flex flex-col group">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base sm:text-lg text-logo-gradient leading-none">
              Padukuhan Dadapan
            </span>
            {isNavigating && <Spinner size="sm" className="ml-1" />}
          </div>
          <span className="text-[10px] text-[#94a3b8] font-medium mt-1">
            Timbulharjo, Sewon, Bantul
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;

            if (link.children) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border',
                      isActive || router.pathname.startsWith('/profil')
                        ? 'text-blue-300 bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 border-blue-400/30 shadow-md backdrop-blur-md'
                        : 'text-[#f8fafc] border-transparent hover:text-white hover:bg-[#242c3d]/60 hover:border-white/10'
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', dropdownOpen && 'rotate-180')} />
                  </button>

                  {/* Dropdown Menu — Apple Frosted Glass */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-[#181f2e]/90 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-2 animate-fade-in space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#94a3b8] hover:text-white hover:bg-[#242c3d]/80 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border',
                  isActive
                    ? 'text-blue-300 bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 border-blue-400/30 shadow-md backdrop-blur-md'
                    : 'text-[#f8fafc] border-transparent hover:text-white hover:bg-[#242c3d]/60 hover:border-white/10'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          
          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-white/10 hover:border-white/20 text-[#f8fafc] hover:text-white bg-[#242c3d]/40 hover:bg-[#242c3d]/80 transition-all cursor-pointer flex items-center justify-center shrink-0 ml-3"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />
            ) : (
              <div className="h-4 w-4 animate-pulse rounded-full bg-white/20" />
            )}
          </button>
        </nav>

        {/* Mobile Controls (Hamburger & Theme Switch) */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Theme Toggle Button (Mobile) */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-[#242c3d]/85 backdrop-blur-xl border border-white/10 text-white hover:bg-[#2d374d] transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />
            ) : (
              <div className="h-4 w-4 animate-pulse rounded-full bg-white/20" />
            )}
          </button>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 rounded-xl bg-[#242c3d]/80 backdrop-blur-xl border border-white/10 text-white hover:bg-[#2d374d] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown — Apple Frosted Glass */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0f1219]/90 backdrop-blur-3xl px-4 py-5 space-y-2.5 animate-slide-up shadow-2xl">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="space-y-1">
                <span className="block px-3 py-1 text-xs font-bold uppercase text-blue-400 tracking-wider">
                  {link.label}
                </span>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-[#f8fafc] hover:bg-[#242c3d]/80"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors border',
                  router.pathname === link.href
                    ? 'text-blue-300 bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 border-blue-400/30 shadow-md'
                    : 'text-[#f8fafc] border-transparent hover:bg-[#242c3d]/80'
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
