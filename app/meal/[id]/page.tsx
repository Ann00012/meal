import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { getById } from "@/components/services/Api";
import MealDetailsClient from "./MealDetails.client";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meal = await getById(id);
  return {
    title: `Meal: ${meal.title}`,
    description: meal.category,
    openGraph: {
      title: `Meal: ${meal.title}`,
      description: meal.category,
      url: `https://meal/${id}`,
      siteName: "Meal",
      images: [
        {
          url: "/meal.jpg",
          width: 1200,
          height: 630,
          alt: meal.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Meal: ${meal.title}`,
      description: meal.category,
      images:['/meal.jpg']
    },
  };
}

const MealDetails = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) {
    notFound();
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["meal", id],
    queryFn: () => getById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MealDetailsClient />
    </HydrationBoundary>
  );
};

export default MealDetails;
