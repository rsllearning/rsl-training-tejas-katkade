'use client';

import React, { useState } from 'react';
import { ProjectTask } from '@/types/project';
import { CheckCircle2, Circle, Clock, CheckSquare, Filter } from 'lucide-react';

interface ProjectTaskListProps {
  initialTasks: ProjectTask[];
  projectName: string;
}

export function ProjectTaskList({ initialTasks, projectName }: ProjectTaskListProps) {
  const [tasks, setTasks] = useState<ProjectTask[]>(initialTasks);
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in_progress' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const nextStatus = task.status === 'completed' ? 'in_progress' : 'completed';
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'high':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'medium':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Progress Bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <div className="flex items-center gap-2 text-gray-800">
            <CheckSquare className="h-4 w-4 text-blue-600" />
            <span>Interactive Sprint Completion · {projectName}</span>
          </div>
          <span className="text-gray-900">
            {completedCount} of {tasks.length} tasks completed ({progressPercent}%)
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-gray-500">
          Click the check icon next to any task to toggle its completion status interactively.
        </p>
      </div>

      {/* Task Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-gray-700 mr-1 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-gray-400" />
            <span>Status:</span>
          </span>
          {(['all', 'todo', 'in_progress', 'completed'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`rounded-md px-2.5 py-1 font-medium capitalize cursor-pointer transition ${
                statusFilter === s
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Task Rows */}
      <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100 shadow-sm overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">
            No tasks match the selected filters.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'completed';
            return (
              <div
                key={task.id}
                onClick={() => toggleTaskStatus(task.id)}
                className={`flex items-start sm:items-center justify-between gap-4 p-4 hover:bg-slate-50 transition cursor-pointer ${
                  isDone ? 'bg-slate-50/50' : ''
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <button
                    type="button"
                    aria-label={isDone ? 'Mark task as incomplete' : 'Mark task as complete'}
                    className="mt-0.5 sm:mt-0 shrink-0 text-gray-400 hover:text-blue-600 transition"
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300 hover:text-gray-400" />
                    )}
                  </button>
                  <div>
                    <h3
                      className={`text-sm font-semibold transition ${
                        isDone ? 'line-through text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span>Assignee: {task.assignee}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span>Due {task.dueDate}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase ${getPriorityStyle(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                  <span
                    className={`hidden sm:inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize ${
                      isDone
                        ? 'bg-emerald-50 text-emerald-700'
                        : task.status === 'in_progress'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
