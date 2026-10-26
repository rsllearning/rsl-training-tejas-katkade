'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertOctagon, RotateCcw, ArrowLeft } from 'lucide-react';

interface ProjectErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProjectError({ error, reset }: ProjectErrorProps) {
  useEffect(() => {
    // Log error internally if needed
    console.error('Project loading error:', error);
  }, [error]);

  return (
    <div className="rounded-xl border border-red-200 bg-white p-8 shadow-sm text-center max-w-xl mx-auto my-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertOctagon className="h-7 w-7" />
      </div>

      <h2 className="mt-4 text-xl font-bold text-gray-900">
        Unable to Load Project Information
      </h2>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {error.message ||
          'A temporary connection issue prevented the application from loading the project data. Please try again.'}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Retry Loading Project</span>
        </button>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Projects Directory</span>
        </Link>
      </div>
    </div>
  );
}
