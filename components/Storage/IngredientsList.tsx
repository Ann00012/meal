import { useState } from "react";
import css from "./IngredientList.module.css";

interface Props {
  ingredients: string[]; 
  onAddSelected: (selected: string[]) => void;
  onAddAll: () => void;
}

export default function IngredientList({ ingredients, onAddSelected, onAddAll }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleIngredient = (name: string) => {
    setSelected(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  return (
    <div className={css.container}>
      <h3>Select ingredients to buy:</h3>
      <ul className={css.list}>
        {ingredients.map((ing, index) => (
          <li key={index} className={css.item}>
            <label>
              <input 
                type="checkbox" 
                checked={selected.includes(ing)} 
                onChange={() => toggleIngredient(ing)}
              />
              {ing}
            </label>
          </li>
        ))}
      </ul>
      <div className={css.actions}>
        <button onClick={() => onAddSelected(selected)} disabled={selected.length === 0}>
          Add Selected
        </button>
        <button onClick={onAddAll} className={css.secondary}>
          Add All
        </button>
      </div>
    </div>
  );
}