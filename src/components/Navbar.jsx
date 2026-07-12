import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
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

  const isActive = (href) => router.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-serif font-bold text-brand-700 text-lg">
          <span className="text-2xl">🌿</span>
          <span>Dadapan</span>
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
                    'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    'text-gray-600 hover:text-brand-700 hover:bg-brand-50'
                  )}
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 rounded-md border border-gray-200 bg-white shadow-lg animate-fade-in">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 first:rounded-t-md last:rounded-b-md"
                      >
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
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'text-brand-700 bg-brand-50 font-semibold'
                    : 'text-gray-600 hover:text-brand-700 hover:bg-brand-50'
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {link.label}
                </p>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-600 hover:text-brand-700 hover:bg-brand-50 rounded-md"
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
                  'block px-3 py-2 rounded-md text-sm font-medium',
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
