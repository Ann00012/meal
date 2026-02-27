import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Meal } from '../types/Type';

interface FavoritesState {
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      toggleFavorite: (meal) => {
        const { favorites } = get();
        const isAlreadyFavorite = favorites.some((m) => m.idMeal === meal.idMeal);

        if (isAlreadyFavorite) {
          set({ favorites: favorites.filter((m) => m.idMeal !== meal.idMeal) });
        } else {
          set({ favorites: [...favorites, meal] });
        }
      },

      isFavorite: (id) => {
        return get().favorites.some((m) => m.idMeal === id);
      },
    }),
    {
      name: 'meal-favorites', 
    }
  )
);