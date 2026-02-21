"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false); 

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header className={css.header}>
      <Link href="/" className={css.logo} onClick={closeMenu}>
        Home
      </Link>
      
      <button 
        className={`${css.burger} ${isOpen ? css.lineOpen : ""}`} 
        onClick={toggleMenu}
      >
        <span className={css.line}></span>
        <span className={css.line}></span>
        <span className={css.line}></span>
      </button>

      <nav className={`${css.nav} ${isOpen ? css.navActive : ""}`}>
        <Link
          href="/filter"
          className={`${css.link} ${pathname === "/filter" ? css.active : ""}`}
          onClick={closeMenu}
        >
          Filter
        </Link>
        <Link
          href="/Meal"
          className={`${css.link} ${pathname === "/Meal" ? css.active : ""}`}
          onClick={closeMenu}
        >
          Meal
        </Link>
        <Link
          href="/Random"
          className={`${css.link} ${pathname === "/Random" ? css.active : ""}`}
          onClick={closeMenu}
        >
          Random
        </Link>
      </nav>
    </header>
  );
}