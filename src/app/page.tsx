import Link from 'next/link';
import { ArrowRight, FolderKanban, CheckCircle2, Clock, Users, Sparkles, FileText } from 'lucide-react';
import { getProjects, getProjectMetrics } from '@/lib/projects';
import { FavoriteButton } from '@/components/FavoriteButton';

export default async function HomePage() {
  const metrics = await getProjectMetrics();
  const allProjects = await getProjects();
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <div className="flex-1 pb-16">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-4 border border-blue-100">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Project Management Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Collaborative Project Tracking &amp; Delivery
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Explore ongoing organization initiatives, monitor cross-functional team progress,
              manage project tasks, and inspect technical specifications from a single unified portal.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
              >
                <span>Browse Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                <span>View Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="py-8 bg-slate-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Total Projects</span>
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <FolderKanban className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.total}</p>
              <p className="mt-1 text-xs text-gray-500">Across 5 departments</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Active Workstreams</span>
                <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.active}</p>
              <p className="mt-1 text-xs text-gray-500">Under active sprint execution</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Delivered Initiatives</span>
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.completed}</p>
              <p className="mt-1 text-xs text-gray-500">Successfully completed</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Team Contributors</span>
                <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">{metrics.totalTeamMembers}</p>
              <p className="mt-1 text-xs text-gray-500">Engineers, leads &amp; designers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Featured Projects</h2>
              <p className="text-sm text-gray-500">Priority organizational programs currently underway</p>
            </div>
            <Link
              href="/projects"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View all ({metrics.total})</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                      {project.category}
                    </span>
                    <FavoriteButton projectId={project.id} />
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                    <Link href={`/projects/${project.id}`}>{project.name}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 space-y-4">
                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                      <span>Delivery Progress</span>
                      <span className="font-semibold text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold text-gray-700">
                        {project.lead.avatar}
                      </div>
                      <span className="truncate max-w-[120px]">{project.lead.name}</span>
                    </div>
                    <Link
                      href={`/projects/${project.id}`}
                      className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Portal Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/dashboard"
              className="p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition group"
            >
              <div className="h-9 w-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <FolderKanban className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Operations Hub</h3>
              <p className="text-xs text-gray-500 mt-1">Live streaming activity, workload and metric widgets.</p>
            </Link>

            <Link
              href="/projects"
              className="p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition group"
            >
              <div className="h-9 w-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600">Projects Catalog</h3>
              <p className="text-xs text-gray-500 mt-1">Search, filter, and inspect detailed project workstreams.</p>
            </Link>

            <Link
              href="/projects/1/docs"
              className="p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition group"
            >
              <div className="h-9 w-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600">Documentation</h3>
              <p className="text-xs text-gray-500 mt-1">Nested runbooks, setup steps, and architecture guides.</p>
            </Link>

            <Link
              href="/settings"
              className="p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition group"
            >
              <div className="h-9 w-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-amber-600">Portal Settings</h3>
              <p className="text-xs text-gray-500 mt-1">Personal preferences, notification settings, and saved views.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
