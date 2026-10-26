'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  FileCheck2,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

export function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/dashboard/reports', label: 'Executive Reports', icon: FileCheck2 },
  ];

  const quickProjects = [
    { id: '1', name: 'Cloud Infrastructure' },
    { id: '2', name: 'Mobile Banking App' },
    { id: '3', name: 'Design System' },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 bg-white">
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Navigation
          </span>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Project Shortcuts */}
        <div className="border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Active Projects
            </span>
            <Link
              href="/projects"
              className="text-[11px] text-blue-600 hover:text-blue-800 font-medium"
            >
              All
            </Link>
          </div>
          <div className="space-y-1">
            {quickProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900 group"
              >
                <span className="truncate">{p.name}</span>
                <ArrowUpRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 transition" />
              </Link>
            ))}
          </div>
        </div>

        {/* Status Callout */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-blue-900">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span>Sprint Cadence</span>
          </div>
          <p className="mt-1 text-blue-700 leading-normal">
            Q4 sprint velocity is trending at 94% delivery across active milestones.
          </p>
        </div>
      </div>
    </aside>
  );
}
