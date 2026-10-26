import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects';
import { ProjectTaskList } from '@/components/ProjectTaskList';

interface TasksPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectTasksPage({ params }: TasksPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Sprint Tasks &amp; Milestones</h2>
        <p className="text-xs text-gray-500">
          Interactive task board for tracking deliverables in {project.name}
        </p>
      </div>

      <ProjectTaskList initialTasks={project.tasks} projectName={project.name} />
    </div>
  );
}
