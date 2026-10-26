'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FolderKanban,
  LayoutDashboard,
  Briefcase,
  Info,
  Settings,
  Star,
  Menu,
  X,
} from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

export function Navbar() {
  const pathname = usePathname();
  const { count } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: FolderKanban },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/projects', label: 'Projects', icon: Briefcase },
    { href: '/about', label: 'About', icon: Info },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-gray-900 transition hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <FolderKanban className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold leading-tight tracking-tight text-gray-900">
                Project Explorer
              </span>
              <span className="text-[11px] font-medium leading-none text-gray-500">
                Workspace Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side items */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/projects?filter=favorites"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
            <span>Favorites</span>
            <span className="ml-0.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800">
              {count}
            </span>
          </Link>

          <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">
              TK
            </div>
            <div className="hidden lg:block text-left text-xs leading-none">
              <p className="font-medium text-gray-900">Tejas Katkade</p>
              <p className="mt-0.5 text-[11px] text-gray-500">Software Engineer</p>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium ${
                  active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/projects?filter=favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700"
            >
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
              <span>Favorites ({count})</span>
            </Link>
            <span className="text-xs text-gray-500">Tejas Katkade</span>
          </div>
        </div>
      )}
    </header>
  );
}
