import { useQuery } from "@tanstack/react-query";
import { fetchMovieSuggestions } from "@/services/movies";
import { movieKeys } from "@/lib/queryClient";

export const useMovieSuggestions = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.suggestions(movieId),
    queryFn: () => fetchMovieSuggestions(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 15,
  });
};

export default useMovieSuggestions;
