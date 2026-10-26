import { notFound } from 'next/navigation';
import { getProjectById } from '@/lib/projects';
import { Mail, UserCheck } from 'lucide-react';

interface TeamPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectTeamPage({ params }: TeamPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Assigned Team Members</h2>
          <p className="text-xs text-gray-500">
            Engineers, designers, and specialists assigned to {project.name}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          <UserCheck className="h-3.5 w-3.5" />
          <span>{project.team.length} Active Members</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.team.map((member) => (
          <div
            key={member.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-gray-300 transition"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white shadow-sm">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{member.name}</h3>
                  <p className="text-xs font-medium text-gray-500">{member.role}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-600">
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                <a
                  href={`mailto:${member.email}`}
                  className="text-blue-600 hover:text-blue-800 truncate"
                >
                  {member.email}
                </a>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Assigned Tasks:</span>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-bold text-gray-800">
                {member.tasksCount} active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
