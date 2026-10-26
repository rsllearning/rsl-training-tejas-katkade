import React from 'react';

export default function ProjectDetailLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-4 bg-gray-200 rounded" />
            </div>
            <div className="h-7 w-16 bg-gray-200 rounded" />
            <div className="h-2.5 w-24 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <div className="h-5 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-5/6 bg-gray-100 rounded" />
            <div className="h-24 bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="h-3 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-4/5 bg-gray-100 rounded" />
              <div className="h-3 w-3/5 bg-gray-100 rounded" />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex justify-between">
              <div className="h-5 w-36 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-100 rounded" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                  <div className="h-4 w-60 bg-gray-100 rounded" />
                  <div className="h-4 w-16 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-3">
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="flex items-center gap-3 pt-2">
              <div className="h-11 w-11 rounded-full bg-gray-200" />
              <div className="space-y-1.5">
                <div className="h-4 w-28 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-100 rounded" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="space-y-2 pt-1">
              <div className="h-8 bg-gray-100 rounded-lg" />
              <div className="h-8 bg-gray-100 rounded-lg" />
              <div className="h-8 bg-gray-100 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
