"use client";
import { useFavoritesStore } from "../store/useFavorites";
import { Meal } from "../types/Type";
import css from "./MealList.module.css";
import Image from "next/image";
import Link from "next/link";

interface MealListProps {
  data: Meal[];
  isFirstLoad?: boolean;
}

export default function MealList({ data, isFirstLoad }: MealListProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  return (
    <div className={css.wrapper}>
      {data?.length === 0 &&
        (isFirstLoad ? (
          <p className={css.notFindItems}>
            Welcome! Search for your favorite ingredient.
          </p>
        ) : (
          <p className={css.notFindItems}>
            There are no meals for this search.
          </p>
        ))}

      <ul className={css.container}>
        {data?.map((item: Meal) => {
          const favorite = isFavorite(item.idMeal);
          return (
            <li
              key={item.idMeal}
              className={css.card}
              style={{ position: "relative" }}
            >
              <Link href={`/meal/${item.idMeal}`} className={css.link}>
                <Image
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  width={200}
                  height={200}
                  className={css.img}
                />
                <p>{item.strMeal}</p>
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(item);
                }}
                className={css.favoriteBtn}
              >
                {favorite ? "❤️" : "🤍"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
