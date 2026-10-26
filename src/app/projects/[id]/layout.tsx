import React from 'react';
import Link from 'next/link';
import { getProjectById } from '@/lib/projects';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ProjectNavTabs } from '@/components/ProjectNavTabs';
import { ChevronRight, Calendar, DollarSign, User } from 'lucide-react';

import ProjectNotFound from './not-found';

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return <ProjectNotFound />;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in_progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'planning':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Top Breadcrumb & Project Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-4 sm:px-6 lg:px-8 space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-400" />
            <Link href="/projects" className="hover:text-gray-900 transition">
              Projects
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-400" />
            <span className="font-medium text-gray-900 truncate max-w-xs">{project.name}</span>
          </nav>

          {/* Project Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                  {project.category}
                </span>
                <span
                  className={`rounded-md border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${getStatusBadge(
                    project.status
                  )}`}
                >
                  {project.status.replace('_', ' ')}
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                    project.priority === 'critical'
                      ? 'bg-red-50 text-red-700'
                      : project.priority === 'high'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {project.priority} priority
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {project.name}
              </h1>
              <p className="text-sm text-gray-600 max-w-3xl">{project.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <FavoriteButton projectId={project.id} showText size={20} />
            </div>
          </div>

          {/* Metadata quick bar */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-xs text-gray-500 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-gray-400" />
              <span>Lead:</span>
              <span className="font-semibold text-gray-900">{project.lead.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Target Delivery:</span>
              <span className="font-semibold text-gray-900">{project.targetDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span>Budget:</span>
              <span className="font-semibold text-gray-900">{project.budget}</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span>Overall Progress:</span>
              <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="font-bold text-gray-900">{project.progress}%</span>
            </div>
          </div>
        </div>

        {/* Tab navigation shared across all sub-pages */}
        <ProjectNavTabs projectId={project.id} />
      </div>

      {/* Nested page content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </div>
  );
}
