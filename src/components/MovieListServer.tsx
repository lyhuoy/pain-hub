import { Suspense } from "react";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import type { MovieFilters, Movie } from "@/types/movie";

async function fetchMoviesServer(filters: MovieFilters = {}) {
  try {
    const params = new URLSearchParams();
    
    if (filters.limit) params.append("limit", filters.limit.toString());
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.quality && filters.quality !== "all") params.append("quality", filters.quality);
    if (filters.minimum_rating) params.append("minimum_rating", filters.minimum_rating.toString());
    if (filters.query_term) params.append("query_term", filters.query_term);
    if (filters.genre) params.append("genre", filters.genre);
    if (filters.sort_by) params.append("sort_by", filters.sort_by);
    if (filters.order_by) params.append("order_by", filters.order_by);
    if (filters.with_rt_ratings) params.append("with_rt_ratings", "true");

    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000'
      : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/movies?${params.toString()}`, {
      cache: 'default',
      next: { 
        revalidate: 300, // Revalidate every 5 minutes
        tags: ['movies'] 
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Server-side movie fetch error:', error);
    return null;
  }
}

interface MovieListServerProps {
  filters: MovieFilters;
}

async function MovieListServer({ filters }: MovieListServerProps) {
  const data = await fetchMoviesServer(filters);
  
  if (!data || !data.data?.movies) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Unable to load movies. Please try again later.
        </p>
      </div>
    );
  }

  const movies = data.data.movies;

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mt-2">
          No movies found. Try adjusting your search criteria or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
      {movies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} className="" />
      ))}
    </div>
  );
}

function MovieListSkeleton({ limit = 20 }: { limit?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
      {Array.from({ length: limit }, (_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function MovieListServerWrapper({ filters }: MovieListServerProps) {
  return (
    <Suspense fallback={<MovieListSkeleton limit={filters.limit} />}>
      <MovieListServer filters={filters} />
    </Suspense>
  );
}
