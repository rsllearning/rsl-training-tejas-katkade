import projectsData from '@/data/projects.json';
import { Project } from '@/types/project';

const typedProjects: Project[] = projectsData as Project[];

export interface ProjectFilterParams {
  search?: string;
  status?: string;
  category?: string;
  sort?: string;
}

/**
 * Fetch all projects with optional filtering and sorting.
 */
export async function getProjects(filters?: ProjectFilterParams): Promise<Project[]> {
  // Simulating standard fast async data retrieval
  let results = [...typedProjects];

  if (filters?.search) {
    const term = filters.search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.lead.name.toLowerCase().includes(term)
    );
  }

  if (filters?.status && filters.status !== 'all') {
    results = results.filter((p) => p.status === filters.status);
  }

  if (filters?.category && filters.category !== 'all') {
    results = results.filter((p) => p.category.toLowerCase() === filters.category?.toLowerCase());
  }

  if (filters?.sort) {
    if (filters.sort === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === 'progress') {
      results.sort((a, b) => b.progress - a.progress);
    } else if (filters.sort === 'targetDate') {
      results.sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime());
    }
  }

  return results;
}

/**
 * Fetch a single project by ID with support for simulated delay and error testing.
 */
export async function getProjectById(
  id: string,
  options?: { simulateDelay?: number; simulateError?: boolean }
): Promise<Project | null> {
  if (options?.simulateDelay && options.simulateDelay > 0) {
    await new Promise((resolve) => setTimeout(resolve, options.simulateDelay));
  }

  if (options?.simulateError || id === 'error-test') {
    throw new Error(`Failed to load project with ID "${id}". Connection to project datastore timed out.`);
  }

  const project = typedProjects.find((p) => p.id === id);
  return project || null;
}

/**
 * Calculate high-level project summary metrics.
 */
export async function getProjectMetrics() {
  const total = typedProjects.length;
  const active = typedProjects.filter((p) => p.status === 'active' || p.status === 'in_progress').length;
  const completed = typedProjects.filter((p) => p.status === 'completed').length;
  const planning = typedProjects.filter((p) => p.status === 'planning').length;
  const totalTasks = typedProjects.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = typedProjects.reduce(
    (acc, p) => acc + p.tasks.filter((t) => t.status === 'completed').length,
    0
  );
  const totalTeamMembers = new Set(typedProjects.flatMap((p) => p.team.map((t) => t.email))).size;
  const averageProgress = Math.round(
    typedProjects.reduce((acc, p) => acc + p.progress, 0) / (total || 1)
  );

  return {
    total,
    active,
    completed,
    planning,
    totalTasks,
    completedTasks,
    totalTeamMembers,
    averageProgress,
  };
}

/**
 * Server component slow data fetch for streaming demonstration (Suspense).
 */
export async function getRecentActivityFeed(delayMs: number = 1200) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  const allActivities = typedProjects.flatMap((p) =>
    p.activity.map((a) => ({
      ...a,
      projectName: p.name,
      projectId: p.id,
    }))
  );

  // Return top 6 recent items
  return allActivities.slice(0, 6);
}

/**
 * Server component slow data fetch for project performance statistics (Suspense).
 */
export async function getPerformanceDistribution(delayMs: number = 800) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  return typedProjects.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    progress: p.progress,
    status: p.status,
    tasksCount: p.tasks.length,
    completedTasksCount: p.tasks.filter((t) => t.status === 'completed').length,
  }));
}
