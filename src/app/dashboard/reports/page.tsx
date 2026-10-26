import { getProjects } from '@/lib/projects';
import { FileCheck2, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function ReportsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
          <FileCheck2 className="h-6 w-6 text-blue-600" />
          <span>Executive Health Reports</span>
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Executive project status assessments, milestone audits, and compliance scorecards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>On-Track Portfolios</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-900">4</p>
          <p className="text-xs text-emerald-700 mt-1">Milestones executing within target timeline</p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <Clock className="h-4 w-4" />
            <span>Watchlist Reviews</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-900">1</p>
          <p className="text-xs text-amber-700 mt-1">Pending external vendor API synchronization</p>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
            <FileCheck2 className="h-4 w-4" />
            <span>Delivered &amp; Audited</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-blue-900">1</p>
          <p className="text-xs text-blue-700 mt-1">SOC 2 compliant and fully handed over</p>
        </div>
      </div>

      {/* Reports Listing */}
      <div className="space-y-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase text-blue-600">{p.category}</span>
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">Budget: {p.budget}</span>
              </div>
              <h2 className="text-base font-bold text-gray-900">
                <Link href={`/projects/${p.id}`} className="hover:text-blue-600">
                  {p.name}
                </Link>
              </h2>
              <p className="text-xs text-gray-600 line-clamp-1">{p.description}</p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="text-xs font-semibold text-gray-900">{p.progress}% Complete</span>
                <p className="text-[11px] text-gray-500">Target: {p.targetDate}</p>
              </div>
              <Link
                href={`/projects/${p.id}`}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Inspect Portfolio
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
