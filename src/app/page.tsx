"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterPanel from "@/components/FilterPanel";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import Pagination from "@/components/Pagination";
import useMovies from "@/hooks/useMovies";
import type { MovieFilters } from "@/types/movie";
import { Container } from "@/components/Container";
import MatrixText from "@/components/kokonutui/matrix-text";
import GlitchText from "@/components/kokonutui/glitch-text";
import TypewriterTitle from "@/components/kokonutui/type-writer";
import QuoteDisplay from "@/components/QuoteDisplay";

const defaultFilters: MovieFilters = {
  page: 1,
  limit: 20,
  sort_by: "year",
  order_by: "desc",
};

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL params
  const getFiltersFromURL = useCallback((): MovieFilters => {
    const params = new URLSearchParams(searchParams.toString());

    return {
      page: params.get("page")
        ? parseInt(params.get("page")!)
        : defaultFilters.page,
      limit: params.get("limit")
        ? parseInt(params.get("limit")!)
        : defaultFilters.limit,
      sort_by:
        (params.get("sort_by") as MovieFilters["sort_by"]) ||
        defaultFilters.sort_by,
      order_by:
        (params.get("order_by") as MovieFilters["order_by"]) ||
        defaultFilters.order_by,
      query_term: params.get("search") || undefined,
      genre: params.get("genre") || undefined,
      quality: (params.get("quality") as MovieFilters["quality"]) || undefined,
      minimum_rating: params.get("min_rating")
        ? parseInt(params.get("min_rating")!)
        : undefined,
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<MovieFilters>(getFiltersFromURL);

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters: MovieFilters) => {
      const params = new URLSearchParams();

      // Add non-default values to URL
      if (newFilters.page && newFilters.page !== 1) {
        params.set("page", newFilters.page.toString());
      }
      if (newFilters.limit && newFilters.limit !== 20) {
        params.set("limit", newFilters.limit.toString());
      }
      if (newFilters.sort_by && newFilters.sort_by !== "date_added") {
        params.set("sort_by", newFilters.sort_by);
      }
      if (newFilters.order_by && newFilters.order_by !== "desc") {
        params.set("order_by", newFilters.order_by);
      }
      if (newFilters.query_term) {
        params.set("search", newFilters.query_term);
      }
      if (newFilters.genre) {
        params.set("genre", newFilters.genre);
      }
      if (newFilters.quality && newFilters.quality !== "all") {
        params.set("quality", newFilters.quality);
      }
      if (newFilters.minimum_rating) {
        params.set("min_rating", newFilters.minimum_rating.toString());
      }

      const newURL = params.toString() ? `/?${params.toString()}` : "/";
      router.push(newURL, { scroll: false });
    },
    [router]
  );

  // Update filters from URL when URL changes
  useEffect(() => {
    const urlFilters = getFiltersFromURL();
    setFilters(urlFilters);
  }, [getFiltersFromURL]);

  const { data, isLoading, error } = useMovies(filters);

  const movies = data?.data?.movies || [];
  const totalPages = data?.data?.movie_count
    ? Math.ceil(data.data.movie_count / (filters.limit || 20))
    : 0;

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    updateURL(newFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFiltersChange = useCallback(
    (newFilters: MovieFilters) => {
      setFilters(newFilters);
      updateURL(newFilters);
    },
    [updateURL]
  );

  const onGoHome = () => {
    setFilters(defaultFilters);
    updateURL(defaultFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Pain Hub</h1>
        </div>

        {/* Quote Display */}
        <QuoteDisplay className="mb-8" />

        {/* Filters */}
        <FilterPanel
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isLoading={isLoading}
        />

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Failed to load movies. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-primary hover:underline hover:bg-white transition-colors px-3 py-1 rounded"
            >
              Refresh Page
            </button>
          </div>
        )}

        {/* Movies Grid */}
        {!error && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {isLoading
                ? Array.from({ length: filters.limit || 20 }).map(
                    (_, index) => <MovieCardSkeleton key={index} />
                  )
                : movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
            </div>

            {/* Empty State */}
            {!isLoading && movies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No movies found matching your criteria.
                </p>
                <button
                  onClick={() => handleFiltersChange(defaultFilters)}
                  className="text-primary hover:underline hover:bg-white transition-colors px-3 py-1 rounded"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={filters.page || 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
                className="mt-8"
              />
            )}
          </>
        )}
      </div>
    </Container>
  );
}
