"use client";

import { useState, useEffect, useRef } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef} 
        className={css.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="filter-menu"
      >
        Menu
      </button>

      <ul
        ref={menuRef}
        className={`${css.menuList} ${isOpen ? css.open : ""}`}
      >
        <button className={css.closeBtn} onClick={() => setIsOpen(false)}>
          ✕
        </button>
        {TAGS.map((item) => {
          const isActive = pathname === `/filter/${item}`;
          return (
            <li key={item} className={css.menuItem}>
              <Link
                href={`/filter/${item}`}
                onClick={() => setIsOpen(false)}
                className={`${css.menuLink} ${isActive ? css.active : ""}`}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SideBar;
