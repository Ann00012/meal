export interface Meal {
  idMeal: string; 
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  strSource: string;
  [key: string]: string | null | undefined; 
}


export interface TransformedMeal {
  id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  image: string;
  video: string;
  source: string;
  ingredients: {
    id: number;
    name: string;
    measure: string;
  }[];
}

export const transformMeal = (meal: Meal): TransformedMeal => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (name && typeof name === 'string' && name.trim()) {
      ingredients.push({
        id: i,
        name: name,
        measure: (measure && typeof measure === 'string') ? measure.trim() : ""
      });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    image: meal.strMealThumb,
    video: meal.strYoutube,
    source: meal.strSource,
    ingredients
  };
};