'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Project } from '@/types/project';
import { FavoriteButton } from '@/components/FavoriteButton';
import { useFavorites } from '@/context/FavoritesContext';
import { Calendar, Users, ListTodo, ArrowRight, FolderSearch } from 'lucide-react';

interface ProjectsViewProps {
  initialProjects: Project[];
}

export function ProjectsView({ initialProjects }: ProjectsViewProps) {
  const searchParams = useSearchParams();
  const { isFavorite } = useFavorites();
  const filter = searchParams.get('filter');

  let displayedProjects = initialProjects;
  if (filter === 'favorites') {
    displayedProjects = displayedProjects.filter((p) => isFavorite(p.id));
  }

  if (displayedProjects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <FolderSearch className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-3 text-base font-bold text-gray-900">No projects found</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
          {filter === 'favorites'
            ? "You haven't bookmarked any projects as favorites yet."
            : 'No projects match your current search and filter criteria.'}
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: Project['status']) => {
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

  const getPriorityBadge = (priority: Project['priority']) => {
    switch (priority) {
      case 'critical':
        return 'text-red-700 bg-red-50';
      case 'high':
        return 'text-amber-700 bg-amber-50';
      case 'medium':
        return 'text-blue-700 bg-blue-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedProjects.map((project) => (
        <div
          key={project.id}
          className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 hover:shadow-md transition"
        >
          <div>
            {/* Header badges */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={`rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${getStatusBadge(
                    project.status
                  )}`}
                >
                  {project.status.replace('_', ' ')}
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-medium ${getPriorityBadge(
                    project.priority
                  )}`}
                >
                  {project.priority}
                </span>
              </div>
              <FavoriteButton projectId={project.id} />
            </div>

            {/* Title & description */}
            <h3 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug">
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
            </h3>
            <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                <span className="font-medium">Completion</span>
                <span className="font-bold text-gray-900">{project.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    project.progress === 100
                      ? 'bg-emerald-500'
                      : project.progress >= 70
                      ? 'bg-blue-600'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-gray-400" />
                  <span>{project.team.length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ListTodo className="h-3.5 w-3.5 text-gray-400" />
                  <span>{project.tasks.length}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span>{project.targetDate}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-gray-50 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">
                  {project.lead.avatar}
                </div>
                <span className="text-gray-700 truncate max-w-[110px]">{project.lead.name}</span>
              </div>

              <Link
                href={`/projects/${project.id}`}
                className="font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition"
              >
                <span>View Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
