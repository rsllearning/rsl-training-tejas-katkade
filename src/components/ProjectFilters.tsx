'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, RotateCcw, Star } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

interface ProjectFiltersProps {
  initialSearch?: string;
  initialStatus?: string;
  initialCategory?: string;
  initialSort?: string;
}

export function ProjectFilters({
  initialSearch = '',
  initialStatus = 'all',
  initialCategory = 'all',
  initialSort = 'name',
}: ProjectFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { count } = useFavorites();

  const isFavoriteFilter = searchParams.get('filter') === 'favorites';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const toggleFavoriteFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isFavoriteFilter) {
      params.delete('filter');
    } else {
      params.set('filter', 'favorites');
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleReset = () => {
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasActiveFilters =
    Boolean(searchParams.get('search')) ||
    (Boolean(searchParams.get('status')) && searchParams.get('status') !== 'all') ||
    (Boolean(searchParams.get('category')) && searchParams.get('category') !== 'all') ||
    Boolean(searchParams.get('sort')) ||
    isFavoriteFilter;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            defaultValue={initialSearch}
            onChange={(e) => updateParam('search', e.target.value)}
            placeholder="Search projects by name, lead, or description..."
            className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Status Dropdown */}
        <div className="w-full md:w-44">
          <select
            value={initialStatus}
            onChange={(e) => updateParam('status', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="planning">Planning</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="w-full md:w-44">
          <select
            value={initialCategory}
            onChange={(e) => updateParam('category', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Disciplines</option>
            <option value="Engineering">Engineering</option>
            <option value="Mobile">Mobile</option>
            <option value="Design">Design</option>
            <option value="AI / ML">AI / ML</option>
            <option value="Security">Security</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-40">
          <select
            value={initialSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
            <option value="targetDate">Sort by Target Date</option>
          </select>
        </div>
      </div>

      {/* Secondary filter row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleFavoriteFilter}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition cursor-pointer ${
              isFavoriteFilter
                ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Star
              className={`h-3.5 w-3.5 ${
                isFavoriteFilter ? 'text-amber-600 fill-amber-500' : 'text-gray-400'
              }`}
            />
            <span>Favorites only ({count})</span>
          </button>

          {isPending && (
            <span className="text-gray-400 text-xs italic">Updating...</span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 transition cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
