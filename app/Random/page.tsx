'use client'

import css from './Random.module.css';
import { getRandomMeal } from '@/components/services/Api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import RandomMeal from '@/components/RandomMeal/RandomMeal';
import Loader from '../Loader';
export default function Random() { 
    const [click, setClick] = useState(0);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['meals', click],
        queryFn: () => getRandomMeal(),
        enabled: click > 0,
        refetchOnWindowFocus: false
    }
        
    )
    const handleRandomClick = () => {
        setClick(prev => prev + 1);
    };
    return (
        < RandomMeal onClick={handleRandomClick} data={data} click={ click}  /> 
    )
}