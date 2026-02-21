"use client";
import css from "./Meal.client.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import MealList from "@/components/MealList/MealList";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { filterMeals } from "@/components/services/Api";
import Error from "@/app/error";
import Loader from "@/app/Loader";
interface MealClientProps {
  initialTag: string;
}
export default function MealClient({ initialTag }: MealClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["meal", initialTag],
    queryFn: () => filterMeals(initialTag),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [initialTag]);

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
    <div className={css.pageWrapper}>
      {isLoading && (
        <div className={css.loaderWrapper}>
          <Loader />
        </div>
      )}

      {isError && <Error error={error as Error} reset={() => refetch()} />}

      {totalPages > 1 && (
        <div className={css.paginationWrapper}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}

      <div className={css.fadeIn}>
        <MealList data={currentItems || []} />
      </div>
    </div>
  );
}
