"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        Home
      </Link>

      <nav className={css.navGroup}>
        <Link
          href="/filter"
          className={`${css.link} ${pathname === "/filter" ? css.active : ""}`}
        >
          Filter
        </Link>
        <Link
          href="/Meal"
          className={`${css.link} ${pathname === "/Meal" ? css.active : ""}`}
        >
          Meal
        </Link>
        <Link
          href="/Random"
          className={`${css.link} ${pathname === "/Random" ? css.active : ""}`}
        >
          Random
        </Link>
      </nav>
    </header>
  );
}
