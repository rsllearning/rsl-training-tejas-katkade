import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-semibold text-gray-800">Project Explorer</span>
          <span>&copy; 2026 Enterprise Operations Portal</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-gray-500">
          <Link href="/about" className="hover:text-gray-900 transition">
            About System
          </Link>
          <Link href="/projects" className="hover:text-gray-900 transition">
            Projects Catalog
          </Link>
          <Link href="/settings" className="hover:text-gray-900 transition">
            Preferences
          </Link>
        </div>
      </div>
    </footer>
  );
}
