'use client';

import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Sliders, CheckCircle2, User, Star, Trash2 } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

export default function SettingsPage() {
  const { count } = useFavorites();
  const [defaultView, setDefaultView] = useState<'grid' | 'list'>('grid');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [activityDigest, setActivityDigest] = useState('daily');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const clearFavorites = () => {
    if (confirm('Clear all your favorited projects?')) {
      try {
        localStorage.removeItem('project_explorer_favorites');
        window.location.reload();
      } catch {
        // handle safely
      }
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2.5">
          <SettingsIcon className="h-7 w-7 text-blue-600" />
          <span>Portal Settings</span>
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your personal workspace preferences, view options, and notification alerts.
        </p>
      </div>

      {savedFeedback && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm font-medium text-emerald-800 animate-fadeIn">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <span>Preferences updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* User Profile Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-sm">
              TK
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Tejas Katkade</h2>
              <p className="text-sm text-gray-500">tejas.katkade@rajasoftwarelabs.com</p>
              <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                <User className="h-3 w-3" />
                <span>Software Engineer · Engineering Hub</span>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Display Preferences */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
            <Sliders className="h-5 w-5 text-blue-600" />
            <h2 className="font-bold text-gray-900">Display &amp; Catalog Layout</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Default Project View Layout
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => setDefaultView('grid')}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition cursor-pointer text-center ${
                    defaultView === 'grid'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Grid Cards
                </button>
                <button
                  type="button"
                  onClick={() => setDefaultView('list')}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition cursor-pointer text-center ${
                    defaultView === 'list'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Compact List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Management */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
            <Star className="h-5 w-5 text-amber-500 fill-amber-400" />
            <h2 className="font-bold text-gray-900">Favorited Projects</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                You currently have {count} bookmarked {count === 1 ? 'project' : 'projects'}.
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Favorited projects are saved locally on your device for quick access.
              </p>
            </div>
            {count > 0 && (
              <button
                type="button"
                onClick={clearFavorites}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Reset Favorites</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-4">
            <Bell className="h-5 w-5 text-indigo-600" />
            <h2 className="font-bold text-gray-900">Activity Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-900">Email Updates</span>
                <p className="text-xs text-gray-500">Receive summary reports on milestone changes</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>

            <div className="border-t border-gray-100 pt-3">
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Digest Frequency
              </label>
              <select
                value={activityDigest}
                onChange={(e) => setActivityDigest(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="daily">Daily Summary</option>
                <option value="weekly">Weekly Rollup</option>
                <option value="realtime">Real-time alerts</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
