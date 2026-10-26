import Link from 'next/link';
import { getPerformanceDistribution } from '@/lib/projects';
import { ArrowRight } from 'lucide-react';

export async function ProjectStatsStream() {
  const projects = await getPerformanceDistribution(800);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-900">Project Velocity &amp; Completion</h2>
          <p className="text-xs text-gray-500">Live progress tracking across open portfolios</p>
        </div>
        <Link
          href="/projects"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <span>All Projects</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-4 space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <Link
                href={`/projects/${project.id}`}
                className="font-medium text-gray-800 hover:text-blue-600 truncate max-w-[220px]"
              >
                {project.name}
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">
                  {project.completedTasksCount}/{project.tasksCount} tasks
                </span>
                <span className="font-semibold text-gray-900 w-10 text-right">
                  {project.progress}%
                </span>
              </div>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  project.progress === 100
                    ? 'bg-emerald-500'
                    : project.progress >= 70
                    ? 'bg-blue-600'
                    : project.progress >= 40
                    ? 'bg-amber-500'
                    : 'bg-indigo-500'
                }`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectStatsSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="space-y-1.5">
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="h-3 w-40 bg-gray-100 rounded" />
        </div>
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>

      <div className="mt-4 space-y-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-3 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
