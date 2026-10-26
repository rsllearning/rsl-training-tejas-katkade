'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CheckSquare, Activity, BookOpen } from 'lucide-react';

interface ProjectNavTabsProps {
  projectId: string;
}

export function ProjectNavTabs({ projectId }: ProjectNavTabsProps) {
  const pathname = usePathname();

  const baseUrl = `/projects/${projectId}`;
  const tabs = [
    { href: baseUrl, label: 'Overview', icon: LayoutDashboard, exact: true },
    { href: `${baseUrl}/team`, label: 'Team', icon: Users, exact: false },
    { href: `${baseUrl}/tasks`, label: 'Tasks', icon: CheckSquare, exact: false },
    { href: `${baseUrl}/activity`, label: 'Activity', icon: Activity, exact: false },
    { href: `${baseUrl}/docs`, label: 'Docs', icon: BookOpen, exact: false },
  ];

  const isTabActive = (tabHref: string, exact: boolean) => {
    if (exact) {
      return pathname === tabHref;
    }
    return pathname.startsWith(tabHref);
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto px-4 sm:px-6 lg:px-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isTabActive(tab.href, tab.exact);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`inline-flex items-center gap-2 border-b-2 py-3.5 px-3 text-sm font-medium whitespace-nowrap transition-colors ${
                active
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
