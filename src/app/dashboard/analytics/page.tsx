import { getProjects } from '@/lib/projects';
import { BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default async function AnalyticsPage() {
  const projects = await getProjects();

  const categories = ['Engineering', 'Mobile', 'Design', 'AI / ML', 'Security'] as const;
  const categoryStats = categories.map((cat) => {
    const matching = projects.filter((p) => p.category === cat);
    return {
      category: cat,
      count: matching.length,
      avgProgress: matching.length
        ? Math.round(matching.reduce((acc, p) => acc + p.progress, 0) / matching.length)
        : 0,
    };
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <span>Workstream Analytics</span>
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Cross-track portfolio distribution, discipline velocity, and delivery analytics.
        </p>
      </div>

      {/* Category breakdown */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-1">Department Distribution</h2>
        <p className="text-xs text-gray-500 mb-6">Initiative counts and average milestone completion</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map((item) => (
            <div key={item.category} className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{item.category}</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                  {item.count} {item.count === 1 ? 'project' : 'projects'}
                </span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Track Velocity</span>
                  <span className="font-semibold">{item.avgProgress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${item.avgProgress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority vs Completion Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Initiative Performance Matrix</h2>
          <p className="text-xs text-gray-500">Overview of priority alignment and sprint delivery</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Initiative Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Progress</th>
                <th className="px-6 py-3">Target Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-6 py-3.5 font-semibold text-gray-900">
                    <Link href={`/projects/${p.id}`} className="hover:text-blue-600">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-6 py-3.5">{p.category}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        p.priority === 'critical'
                          ? 'bg-red-50 text-red-700'
                          : p.priority === 'high'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {p.priority}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 capitalize">{p.status.replace('_', ' ')}</td>
                  <td className="px-6 py-3.5 font-semibold">{p.progress}%</td>
                  <td className="px-6 py-3.5 text-gray-500">{p.targetDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
