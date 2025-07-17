import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services/movies";
import { movieKeys } from "@/lib/queryClient";
import type { MovieFilters } from "@/types/movie";

export const useMovies = (filters: MovieFilters = {}) => {
  return useQuery({
    queryKey: movieKeys.list(filters),
    queryFn: () => fetchMovies(filters),
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });
};

export default useMovies;
