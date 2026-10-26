import React, { Suspense } from 'react';
import { getProjectMetrics } from '@/lib/projects';
import {
  RecentActivityStream,
  RecentActivitySkeleton,
} from '@/components/streaming/RecentActivityStream';
import {
  ProjectStatsStream,
  ProjectStatsSkeleton,
} from '@/components/streaming/ProjectStatsStream';
import {
  FolderKanban,
  CheckCircle2,
  TrendingUp,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  // Fast immediate metrics fetch
  const metrics = await getProjectMetrics();

  return (
    <div className="space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Operations Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Real-time project health, delivery velocity, and operational event feed.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <span>Explore All Projects</span>
          </Link>
        </div>
      </div>

      {/* Immediate Metrics (Renders instantly) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Active Initiatives</span>
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <FolderKanban className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.active}</p>
          <p className="mt-1 text-[11px] text-gray-500">Out of {metrics.total} total programs</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Completed Work</span>
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {metrics.completedTasks}
            <span className="text-sm font-normal text-gray-500">/{metrics.totalTasks}</span>
          </p>
          <p className="mt-1 text-[11px] text-gray-500">Sprint tasks closed</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Average Completion</span>
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.averageProgress}%</p>
          <p className="mt-1 text-[11px] text-gray-500">Weighted delivery rate</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Engineering Staff</span>
            <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.totalTeamMembers}</p>
          <p className="mt-1 text-[11px] text-gray-500">Assigned across tracks</p>
        </div>
      </div>

      {/* Streaming Components Area (Wrapped in Suspense boundaries) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Suspense fallback={<ProjectStatsSkeleton />}>
            <ProjectStatsStream />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<RecentActivitySkeleton />}>
            <RecentActivityStream />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
