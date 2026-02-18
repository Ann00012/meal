"use client";
import SearchBox from "@/components/SearchBox/SearchBox";
import { getByIngredient } from "@/components/services/Api";
import MealList from "@/components/MealList/MealList";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "./Loader";
import css from "./page.module.css";
import { useDebounce } from "use-debounce";

export default function Home() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const savedQuery = window.localStorage.getItem("saved-query");
    if (savedQuery) {
      try {
        setQuery(JSON.parse(savedQuery));
      } catch (e) {
        console.error("Error in localStorage", e);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("saved-query", JSON.stringify(query));
  }, [query]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["meals", debouncedQuery],
    queryFn: () => getByIngredient(debouncedQuery || "a"),
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data
    ? data.slice(startIndex, startIndex + itemsPerPage)
    : [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <main>
      <SearchBox value={query} onSearch={(val) => setQuery(val)} />
      {isLoading && (
        <div className={css.loaderWrapper}>
          <Loader />
        </div>
      )}
      {isError && <p>Error: {error.message}</p>}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChange={handlePageChange}
        />
      )}
      <MealList data={currentItems || []} />
    </main>
  );
}
