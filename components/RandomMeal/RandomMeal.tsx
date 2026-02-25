import css from "./RandomMeal.module.css";
import { TransformedMeal } from "../types/Type";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import Image from "next/image";

interface RandomMealProps {
  onClick: () => void;
  click: number;
  data: TransformedMeal | undefined;
}

export default function RandomMeal({ onClick, click, data }: RandomMealProps) {
  const handleImageClick = () => {
    if (!data?.image) return;

    const instance = basicLightbox.create(
      `
    <div class='${css.modal}'>
      <img src="${data.image}" alt="${data.title}">
    </div>
  `,
      {
        onShow: () => {
          document.body.style.overflow = "hidden";
        },
        onClose: () => {
          document.body.style.overflow = "visible";
        },
      },
    );

    instance.show();
  };

  return (
    <div className={css.container}>
      <h3 className={css.title}>Try a random meal</h3>
      <p className={css.description}>
        Have you ever thought about what to cook, but nothing comes to mind? Try
        a random meal!
      </p>

      <button onClick={onClick} aria-label="random meal" className={css.btn}>
        {click > 0 ? "Try another one" : "Try"}
      </button>

      {click > 0 && data && (
        <div className={css.mealCard}>
          <h3 className={css.mealTitle}>{data.title}</h3>

          {data.image && (
            <Image
              src={data.image}
              alt={data.title}
              className={css.image}
              width={300}
              height={300}
              onClick={handleImageClick}
              style={{ cursor: "zoom-in" }}
            />
          )}

          <div className={css.atributes}>
            <span className={css.badge}>{data.area}</span>
            <span className={css.badge}>{data.category}</span>
          </div>

          <div className={css.content}>
            <h4>Ingredients:</h4>
            <ul className={css.ingredientsList}>
              {data.ingredients?.map((item) => (
                <li key={item.id} className={css.ingredientItem}>
                  <strong>{item.name}</strong>: {item.measure}
                </li>
              ))}
            </ul>

            <h4>Instructions:</h4>
            <p className={css.instructions}>{data.instructions}</p>
          </div>

          <div className={css.links}>
            {data.source && (
              <a
                href={data.source}
                target="_blank"
                rel="noopener noreferrer"
                className={css.link}
              >
                Recipe Source
              </a>
            )}
            {data.video && (
              <a
                href={data.video}
                target="_blank"
                rel="noopener noreferrer"
                className={css.videoLink}
              >
                Watch Video
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
