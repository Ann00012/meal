"use client";
import css from "./MealDetails.client.module.css";
import * as basicLightbox from "basiclightbox";
import 'basiclightbox/dist/basicLightbox.min.css';
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { getById } from "@/components/services/Api";
import Image from "next/image";
import Loader from "../../Loader";

export default function MealDetailsClient() {
  const handleImageClick = () => {
    if (!data?.image) return;

    const instance = basicLightbox.create(
      `
      <div class="${css.modal}">
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

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["meal", id],
    queryFn: () => getById(id),
    refetchOnMount: false,
  });

  const handleGoBack = () => {
    const isSure = confirm("Are you sure?");
    if (isSure) {
      router.back();
    }
  };

  if (isLoading) return <Loader />;

  if (error || !data) return <p>Some error..</p>;
  return (
    <div className={css.wrapper}>
      <button onClick={handleGoBack} className={css.backBtn}>
        Back
      </button>

      <h1 className={css.title}>{data.title}</h1>

      <Image
        src={data.image}
        alt={data.title}
        className={css.image}
        onClick={handleImageClick}
        style={{ cursor: "zoom-in" }}
        width={300}
        height={300}
      />

      <div className={css.meta}>
        <span className={css.badge}>{data.category}</span>
        <span className={css.badge}>{data.area}</span>
      </div>

      <div className={css.section}>
        <h3 className={css.sectionTitle}>Ingredients</h3>
        <ul className={css.ingredients}>
          {data.ingredients.map((item) => (
            <li key={item.id} className={css.ingredient}>
              <strong>{item.name}</strong> — {item.measure}
            </li>
          ))}
        </ul>
      </div>

      <div className={css.section}>
        <h3 className={css.sectionTitle}>Instructions</h3>
        <p className={css.instructions}>{data.instructions}</p>
      </div>

      <div className={css.links}>
        {data.source && (
          <a
            href={data.source}
            target="_blank"
            rel="noopener noreferrer"
            className={`${css.link} ${css.source}`}
          >
            Recipe source
          </a>
        )}

        {data.video && (
          <a
            href={data.video}
            target="_blank"
            rel="noopener noreferrer"
            className={`${css.link} ${css.video}`}
          >
            Watch video
          </a>
        )}
      </div>
    </div>
  );
}
