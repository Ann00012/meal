"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./NotFound.module.css";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={css.wrapper}>
      <div className={css.card}>
        <h1 className={css.title}>404</h1>
        <p className={css.subtitle}>Page Not Found</p>
        <p className={css.text}>
          Sorry, the page you&#39;re looking for doesn&#39;t exist.
        </p>
        <p className={css.hint}>
          You will be redirected to the main page automatically.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
