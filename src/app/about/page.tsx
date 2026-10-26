import { CheckCircle2, Layers, Users, BookOpen, Compass, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Organization Directory
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About Project Explorer
        </h1>
        <p className="mt-3 text-base text-gray-600 max-w-3xl leading-relaxed">
          Project Explorer is the internal project management and operational portal designed to provide
          transparent visibility into company initiatives, cross-functional resource allocation,
          and technical project documentation.
        </p>
      </div>

      {/* Purpose & Mission */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
            <Compass className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Core Objectives</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Eliminate project silos and fragmented spreadsheets by consolidating organizational roadmap
            deliverables into an interactive, real-time workspace accessible to all teams.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-4">
            <Layers className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Unified Architecture</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            Provide multi-tiered visibility: high-level executive status summaries, deep-dive task breakdowns,
            team workload distributions, and complete technical runbooks.
          </p>
        </div>
      </div>

      {/* Key Capabilities */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Key System Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Dynamic Project Routing</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every initiative maintains a dedicated workspace with sub-sections for Overview, Team, Tasks,
              and Activity logs.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Deep Documentation</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Integrated technical resources, cluster setup guides, database configurations, and architecture
              specifications per initiative.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Team Collaboration</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Identify initiative leads, member responsibilities, and task allocations across engineering,
              design, and security disciplines.
            </p>
          </div>
        </div>
      </div>

      {/* System Specifications */}
      <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
          <ShieldCheck className="h-5 w-5 text-blue-600" />
          <span>Operational Guidelines</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          Project records are synchronized with our centralized project directory. For questions regarding
          initiative ownership, milestone adjustments, or access provisioning, reach out to the Project
          Management Office (PMO) through the internal IT helpdesk.
        </p>
      </div>
    </div>
  );
}
