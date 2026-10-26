import React from 'react';

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Header Skeleton */}
      <div className="border-b border-gray-200 pb-5 space-y-2">
        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-96 bg-gray-100 rounded animate-pulse" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="h-10 flex-1 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-10 w-full md:w-44 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-10 w-full md:w-44 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-10 w-full md:w-40 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse space-y-5"
          >
            <div>
              <div className="flex justify-between items-center">
                <div className="h-5 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-5 bg-gray-100 rounded-full" />
              </div>
              <div className="mt-4 h-6 w-3/4 bg-gray-200 rounded" />
              <div className="mt-2 h-4 w-full bg-gray-100 rounded" />
              <div className="mt-1 h-4 w-2/3 bg-gray-100 rounded" />
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                  <div className="h-3 w-8 bg-gray-200 rounded" />
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 w-24 bg-gray-100 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
