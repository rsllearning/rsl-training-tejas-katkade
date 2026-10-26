'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  count: 0,
});

const STORAGE_KEY = 'project_explorer_favorites';

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const serializedFavorites = useSyncExternalStore(
    (onStoreChange) => {
      listeners.push(onStoreChange);
      window.addEventListener('storage', onStoreChange);
      return () => {
        listeners = listeners.filter((l) => l !== onStoreChange);
        window.removeEventListener('storage', onStoreChange);
      };
    },
    () => {
      try {
        const item = localStorage.getItem(STORAGE_KEY);
        return item || '["1"]';
      } catch {
        return '["1"]';
      }
    },
    () => '["1"]'
  );

  const parsedFavorites: string[] = JSON.parse(serializedFavorites);

  const toggleFavorite = (id: string) => {
    try {
      const exists = parsedFavorites.includes(id);
      const updated = exists
        ? parsedFavorites.filter((item) => item !== id)
        : [...parsedFavorites, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      emitChange();
    } catch {
      // ignore storage access errors
    }
  };

  const isFavorite = (id: string) => parsedFavorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites: parsedFavorites,
        toggleFavorite,
        isFavorite,
        count: parsedFavorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
