import Link from 'next/link';
import { getRecentActivityFeed } from '@/lib/projects';
import { GitCommit, Rocket, CheckSquare, Flag, ArrowUpRight } from 'lucide-react';

export async function RecentActivityStream() {
  const activities = await getRecentActivityFeed(1200);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'deploy':
        return <Rocket className="h-4 w-4 text-emerald-600" />;
      case 'commit':
        return <GitCommit className="h-4 w-4 text-blue-600" />;
      case 'task':
        return <CheckSquare className="h-4 w-4 text-purple-600" />;
      default:
        return <Flag className="h-4 w-4 text-amber-600" />;
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-900">Recent Project Activity</h2>
          <p className="text-xs text-gray-500">Live operational events across workstreams</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      <div className="mt-4 divide-y divide-gray-100">
        {activities.map((item) => (
          <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-gray-50 p-2 border border-gray-100">
              {getCategoryIcon(item.category)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-gray-900 truncate">
                  {item.user}
                </span>
                <span className="text-[11px] text-gray-400 whitespace-nowrap">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5 leading-normal">
                {item.action}
              </p>
              <div className="mt-1 flex items-center gap-1">
                <Link
                  href={`/projects/${item.projectId}`}
                  className="text-[11px] font-medium text-blue-600 hover:text-blue-800 inline-flex items-center gap-0.5"
                >
                  <span>{item.projectName}</span>
                  <ArrowUpRight className="h-2.5 w-2.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentActivitySkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="space-y-1.5">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-3 w-56 bg-gray-100 rounded" />
        </div>
        <div className="h-4 w-12 bg-gray-200 rounded-full" />
      </div>

      <div className="mt-4 divide-y divide-gray-100">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="py-3.5 flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-28 bg-gray-200 rounded" />
                <div className="h-2.5 w-16 bg-gray-100 rounded" />
              </div>
              <div className="h-3 w-full bg-gray-100 rounded" />
              <div className="h-2.5 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
