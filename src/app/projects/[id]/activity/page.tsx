import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects';
import { GitCommit, Rocket, CheckSquare, Flag, Clock } from 'lucide-react';

interface ActivityPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectActivityPage({ params }: ActivityPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'deploy':
        return <Rocket className="h-4 w-4 text-emerald-600" />;
      case 'commit':
        return <GitCommit className="h-4 w-4 text-blue-600" />;
      case 'task':
        return <CheckSquare className="h-4 w-4 text-purple-600" />;
      default:
        return <Flag className="h-4 w-4 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Project Activity History</h2>
        <p className="text-xs text-gray-500">
          Chronological audit trail of milestone completions, deployments, and task updates for{' '}
          {project.name}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="relative pl-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 space-y-8">
          {project.activity.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4">
              <div className="absolute -left-6 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm">
                {getCategoryIcon(item.category)}
              </div>
              <div className="flex-1 rounded-lg border border-gray-100 bg-slate-50/50 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-bold text-gray-900">{item.user}</span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{item.timestamp}</span>
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-700 leading-normal">{item.action}</p>
                <div className="mt-2">
                  <span className="inline-flex rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold uppercase text-gray-700">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
