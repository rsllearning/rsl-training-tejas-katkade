import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects';
import {
  CheckCircle2,
  ListTodo,
  Calendar,
  Users,
  Target,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ fail?: string }>;
}

export default async function ProjectOverviewPage({ params, searchParams }: ProjectPageProps) {
  const { id } = await params;
  const query = searchParams ? await searchParams : {};

  // For testing Requirement 7 (Error Handling)
  if (query.fail === 'true') {
    throw new Error('Database service unavailable. Failed to fetch latest milestone metrics.');
  }

  const project = await getProjectById(id);
  if (!project) {
    notFound();
  }

  const completedTasks = project.tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = project.tasks.filter((t) => t.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Completed Tasks</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{completedTasks}</p>
          <p className="mt-1 text-xs text-gray-500">out of {project.tasks.length} total</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>In Progress</span>
            <ListTodo className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{inProgressTasks}</p>
          <p className="mt-1 text-xs text-gray-500">active sprint items</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Team Members</span>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{project.team.length}</p>
          <p className="mt-1 text-xs text-gray-500">assigned engineers</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Target Deadline</span>
            <Calendar className="h-4 w-4 text-purple-600" />
          </div>
          <p className="mt-2 text-base font-bold text-gray-900">{project.targetDate}</p>
          <p className="mt-1 text-xs text-gray-500">started {project.startDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Executive Summary */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span>Initiative Objectives &amp; Scope</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {project.description} This initiative forms part of our corporate technical roadmap to
              upgrade reliability, automate core processes, and accelerate organizational throughput.
            </p>

            <div className="rounded-lg bg-slate-50 border border-slate-100 p-4 space-y-2">
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Key Deliverables
              </span>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>End-to-end implementation meeting architectural security standards</li>
                <li>Comprehensive documentation and developer runbooks in technical docs</li>
                <li>Zero-downtime cutover and performance verification</li>
              </ul>
            </div>
          </div>

          {/* Quick Tasks Preview */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900">Sprint Tasks Overview</h2>
              <Link
                href={`/projects/${project.id}/tasks`}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>View all tasks</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-4 divide-y divide-gray-100">
              {project.tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        task.status === 'completed'
                          ? 'bg-emerald-500'
                          : task.status === 'in_progress'
                          ? 'bg-amber-500'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span className="font-medium text-gray-800">{task.title}</span>
                  </div>
                  <span className="text-gray-400 capitalize">{task.status.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Initiative Lead */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">
              Project Leadership
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-sm">
                {project.lead.avatar}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{project.lead.name}</h3>
                <p className="text-xs text-gray-500">{project.lead.role}</p>
                <p className="text-[11px] text-blue-600 mt-0.5">{project.lead.email}</p>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">
              Resources &amp; Documentation
            </h2>
            <Link
              href={`/projects/${project.id}/docs`}
              className="flex items-center justify-between rounded-lg p-2 text-xs text-gray-700 hover:bg-gray-50 transition"
            >
              <span>Project Documentation</span>
              <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
            </Link>
            <Link
              href={`/projects/${project.id}/docs/setup`}
              className="flex items-center justify-between rounded-lg p-2 text-xs text-gray-700 hover:bg-gray-50 transition"
            >
              <span>Environment Setup Guide</span>
              <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
            </Link>
            <Link
              href={`/projects/${project.id}/activity`}
              className="flex items-center justify-between rounded-lg p-2 text-xs text-gray-700 hover:bg-gray-50 transition"
            >
              <span>Activity History</span>
              <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
            </Link>
          </div>

          {/* Error handling test link */}
          <div className="rounded-xl border border-dashed border-gray-200 p-4 bg-gray-50/60">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              <span>Simulate Connection Issue</span>
            </div>
            <p className="text-[11px] text-gray-500 mb-2">
              Trigger a simulated fetch failure to verify the retry mechanism.
            </p>
            <Link
              href={`/projects/${project.id}?fail=true`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
            >
              <span>Simulate error state</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
