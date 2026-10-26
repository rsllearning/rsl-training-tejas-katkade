import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 min-h-[60vh]">
      <div className="rounded-xl border border-gray-200 bg-white p-8 sm:p-12 text-center max-w-lg shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Compass className="h-8 w-8" />
        </div>

        <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-blue-600">
          Error 404
        </span>
        <h1 className="mt-1 text-2xl font-extrabold text-gray-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved to a new destination.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            <span>Browse Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
