import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MealClient from "./Meal.client";
import { filterMeals } from "@/components/services/Api";


type Props = {
  params: Promise<{ slug?: string[] }>;
};

const MealByCategory = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const currentTag = slug && slug.length > 0 ? slug[0] : "Beef";
  await queryClient.prefetchQuery({
    queryKey: ["meal", currentTag],
    queryFn: () => filterMeals(currentTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MealClient initialTag={currentTag} />
    </HydrationBoundary>
  );
};

export default MealByCategory;
