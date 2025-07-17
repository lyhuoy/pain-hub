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

export default function HomePageContent() {
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

  const [filters, setFilters] = useState<MovieFilters>(defaultFilters);
  const { data, isLoading, error } = useMovies(filters);

  const movies = data?.data?.movies || [];
  const totalPages = data?.data?.movie_count
    ? Math.ceil(data.data.movie_count / (filters.limit || 20))
    : 0;

  // Update filters when URL changes
  useEffect(() => {
    setFilters(getFiltersFromURL());
  }, [getFiltersFromURL]);

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters: MovieFilters) => {
      const params = new URLSearchParams();

      // Only add params that differ from defaults or are defined
      if (newFilters.page && newFilters.page !== defaultFilters.page) {
        params.set("page", newFilters.page.toString());
      }
      if (newFilters.limit && newFilters.limit !== defaultFilters.limit) {
        params.set("limit", newFilters.limit.toString());
      }
      if (newFilters.sort_by && newFilters.sort_by !== defaultFilters.sort_by) {
        params.set("sort_by", newFilters.sort_by);
      }
      if (
        newFilters.order_by &&
        newFilters.order_by !== defaultFilters.order_by
      ) {
        params.set("order_by", newFilters.order_by);
      }
      if (newFilters.query_term) {
        params.set("search", newFilters.query_term);
      }
      if (newFilters.genre) {
        params.set("genre", newFilters.genre);
      }
      if (newFilters.quality) {
        params.set("quality", newFilters.quality);
      }
      if (newFilters.minimum_rating) {
        params.set("min_rating", newFilters.minimum_rating.toString());
      }

      const queryString = params.toString();
      const url = queryString ? `/?${queryString}` : "/";

      router.push(url, { scroll: false });
    },
    [router]
  );

  const handleFiltersChange = (newFilters: MovieFilters) => {
    // Reset to page 1 when filters change (except when only page changes)
    const resetPage = Object.keys(newFilters).some(
      (key) =>
        key !== "page" &&
        newFilters[key as keyof MovieFilters] !==
          filters[key as keyof MovieFilters]
    );

    const updatedFilters = resetPage ? { ...newFilters, page: 1 } : newFilters;

    setFilters(updatedFilters);
    updateURL(updatedFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Pain Hub</h1>
          <QuoteDisplay className="mt-6" />
        </div>

        <FilterPanel
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isLoading={isLoading}
        />

        {error && (
          <div className="text-center py-12">
            <GlitchText
              text="Failed to load movies"
              className="text-xl text-destructive"
            />
            <p className="text-muted-foreground mt-2">
              Please try again later or adjust your filters.
            </p>
          </div>
        )}

        {!error && (
          <>
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: filters.limit || 20 }, (_, i) => (
                  <MovieCardSkeleton key={i} />
                ))}
              </div>
            )}

            {!isLoading && movies.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    className="transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                  />
                ))}
              </div>
            )}

            {!isLoading && movies.length === 0 && (
              <div className="text-center py-12">
                <GlitchText
                  text="No movies found"
                  className="text-xl text-muted-foreground"
                />
                <p className="text-muted-foreground mt-2">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}

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
