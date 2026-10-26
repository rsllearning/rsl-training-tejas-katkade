import React from 'react';
import { DashboardSidebar } from '@/components/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col md:flex-row bg-slate-50 min-h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
