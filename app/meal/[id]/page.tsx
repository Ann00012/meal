import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getById } from "@/components/services/Api";
import MealDetailsClient from "./MealDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

 const  MealDetails= async ({ params }: Props)=> { 
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['meal', id],
        queryFn: () => getById(id)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
      <MealDetailsClient />
    </HydrationBoundary>
    )
}

export default MealDetails;
