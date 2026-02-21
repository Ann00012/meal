"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./SiderBar.module.css";

const TAGS = [
  "Beef",
  "Breakfast",
  "Chicken",
  "Dessert",
  "Goat",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <ul className={css.menuList}>
      {TAGS.map((item) => {
        const isActive = pathname === `/filter/${item}`;

        return (
          <li key={item} className={css.menuItem}>
            <Link
              href={`/filter/${item}`}
              className={`${css.menuLink} ${isActive ? css.active : ""}`}
            >
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SideBar;
