import { Meal } from "../types/Type";
import { TransformedMeal } from "../types/Type";
import axios from 'axios';
import { transformMeal } from "../types/Type";
interface APIResponse {
  meals: Meal[] | null;
}
export const getByIngredient =async (query:string) :Promise<Meal[]>=> { 
   const response = await axios.get<APIResponse>(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
  return response.data.meals||[];
}

export const getRandomMeal = async (): Promise<TransformedMeal> => {
  const response = await axios.get<APIResponse>(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  
  const meal = response.data.meals?.[0];
  if (!meal) {
    throw new Error("Meal not found");
  }

  return transformMeal(meal);
};

export const getById = async (id:string): Promise<TransformedMeal> => { 
  const response = await axios.get<APIResponse>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   const meal = response.data.meals?.[0];
  if (!meal) {
    throw new Error("Meal not found");
  }

  return transformMeal(meal);
}