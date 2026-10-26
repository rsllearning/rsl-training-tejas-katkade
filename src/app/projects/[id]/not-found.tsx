import Link from 'next/link';
import { FolderX, ArrowLeft } from 'lucide-react';

export default function ProjectNotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="rounded-xl border border-gray-200 bg-white p-8 sm:p-12 text-center max-w-lg shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <FolderX className="h-8 w-8" />
        </div>

        <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-blue-600">
          Error 404
        </span>
        <h1 className="mt-1 text-2xl font-extrabold text-gray-900 tracking-tight">
          Project Not Found
        </h1>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          The project ID you requested does not exist in the organizational directory, or you may
          not have permission to view it.
        </p>

        <div className="mt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Browse All Available Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
