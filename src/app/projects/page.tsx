import { getProjects } from '@/lib/projects';
import { ProjectFilters } from '@/components/ProjectFilters';
import { ProjectsView } from '@/components/ProjectsView';
import { Briefcase } from 'lucide-react';

interface ProjectsPageProps {
  searchParams?: Promise<{
    search?: string;
    status?: string;
    category?: string;
    sort?: string;
    filter?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const query = searchParams ? await searchParams : {};
  const search = typeof query.search === 'string' ? query.search : '';
  const status = typeof query.status === 'string' ? query.status : 'all';
  const category = typeof query.category === 'string' ? query.category : 'all';
  const sort = typeof query.sort === 'string' ? query.sort : 'name';

  // Fetch filtered projects directly on the server based on search params
  const projects = await getProjects({
    search,
    status,
    category,
    sort,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
          <Briefcase className="h-4 w-4" />
          <span>Workspaces</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Projects Directory
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Search, filter, and drill into organizational initiatives, teams, and technical resources.
        </p>
      </div>

      {/* Search and Filters Control */}
      <ProjectFilters
        initialSearch={search}
        initialStatus={status}
        initialCategory={category}
        initialSort={sort}
      />

      {/* Projects List View */}
      <ProjectsView initialProjects={projects} />
    </div>
  );
}
