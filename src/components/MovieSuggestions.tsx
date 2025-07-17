import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import useMovieSuggestions from "@/hooks/useMovieSuggestions";
import type { Movie } from "@/types/movie";
import { cn } from "@/lib/utils";

interface MovieSuggestionsProps {
  movieId: number;
  className?: string;
}

const MovieSuggestions = ({ movieId, className }: MovieSuggestionsProps) => {
  const { data, isLoading, error } = useMovieSuggestions(movieId);

  if (error) {
    return null; // Fail silently for suggestions
  }

  const suggestions = data?.data?.movies || [];

  if (!isLoading && suggestions.length === 0) {
    return null;
  }

  return (
    <Card className={cn("border-none shadow-none", className)}>
      <CardHeader>
        <CardTitle>You might also like</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            : suggestions
                .slice(0, 4)
                .map((movie: Movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieSuggestions;
