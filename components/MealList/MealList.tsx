import { Meal } from "../types/Type";
import css from "./MealList.module.css";
import Image from "next/image";
interface MealListProps {
  data: Meal[];
}

export default function MealList({ data }: MealListProps) {
  return (
    <div className={css.wrapper}>
      {data?.length === 0 && <p>There are no meals</p>}
      
      <ul className={css.container}>
        {data?.map((item: Meal) => (
          <li key={item.idMeal} className={css.card}>
            <Image
              src={item.strMealThumb}
              alt={item.strMeal}
              width={200}
              height={200}
              className={css.img}
            />
            <p>{item.strMeal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
