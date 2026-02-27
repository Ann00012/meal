"use client";
import css from './Favorite.module.css';
import { useFavoritesStore } from "../../components/store/useFavorites";
import MealList from "@/components/MealList/MealList";


export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <main className={css.wrapper}>
      <header className={css.header}>
        <h1 className={css.title}>❤️ My Favorite Meals</h1>
        <p className={css.subtitle}>
          All the meals you’ve saved for later inspiration and cooking.
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className={css.emptyState}>
          <div className={css.emptyIcon}>🍽️</div>
          <h2 className={css.emptyTitle}>No favorites yet</h2>
          <p className={css.emptyText}>
            You haven’t added any meals to your favorites yet.
            <br />
            Start exploring and save the meals you love!
          </p>
        </div>
      ) : (
        <MealList data={favorites} />
      )}
    </main>
  );
}