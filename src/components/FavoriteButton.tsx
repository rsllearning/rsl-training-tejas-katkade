'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

interface FavoriteButtonProps {
  projectId: string;
  className?: string;
  size?: number;
  showText?: boolean;
}

export function FavoriteButton({
  projectId,
  className = '',
  size = 18,
  showText = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(projectId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(projectId);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        favorited
          ? 'text-amber-500 hover:text-amber-600 bg-amber-50/80 hover:bg-amber-100'
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
      } ${className}`}
    >
      <Star
        size={size}
        className={favorited ? 'fill-amber-400 stroke-amber-500' : 'stroke-current'}
      />
      {showText && (
        <span className="text-xs font-medium">
          {favorited ? 'Favorited' : 'Favorite'}
        </span>
      )}
    </button>
  );
}
