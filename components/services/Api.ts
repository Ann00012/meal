import { Meal} from "../types/Type";
import axios from 'axios';
interface APIResponse {
  meals: Meal[] | null;
}
export const getByIngredient =async (query:string) :Promise<Meal[]>=> { 
    const response = await axios.get<APIResponse>(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
    return response.data.meals ? response.data.meals.slice(0, 10) : [];
}