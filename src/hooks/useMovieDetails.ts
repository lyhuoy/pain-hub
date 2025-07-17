import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "@/services/movies";
import { movieKeys } from "@/lib/queryClient";

interface UseMovieDetailsOptions {
  withImages?: boolean;
  withCast?: boolean;
}

export const useMovieDetails = (
  movieId: number,
  options: UseMovieDetailsOptions = {}
) => {
  return useQuery({
    queryKey: [...movieKeys.detail(movieId), options],
    queryFn: () => fetchMovieDetails(movieId, options),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
  });
};

export default useMovieDetails;
