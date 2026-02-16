'use client'
import SearchBox from "@/components/SearchBox/SearchBox";
import { getByIngredient } from "@/components/services/Api";
import MealList from "@/components/MealList/MealList";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const { data, isLoading, isError,error } = useQuery({
        queryKey: ['meals', query],
        queryFn: () => getByIngredient(query)
    });
    return (
        <main>
            <SearchBox value={query} onSearch={(val) => setQuery(val)} />
            {isLoading && <p>Loading....</p>}
            {isError && <p>Error: {error.message }</p>}
            <MealList data={data || []} />
        </main>
    )
}