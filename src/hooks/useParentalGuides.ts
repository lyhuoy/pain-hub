import { useQuery } from "@tanstack/react-query";
import { fetchParentalGuides } from "@/services/movies";
import { movieKeys } from "@/lib/queryClient";

export const useParentalGuides = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.parentalGuides(movieId),
    queryFn: () => fetchParentalGuides(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30, // 30 minutes - parental guides rarely change
  });
};

export default useParentalGuides;
