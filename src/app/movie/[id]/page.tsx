"use client";

import React, { use } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import MovieDetails from "@/components/MovieDetails";
import MovieSuggestions from "@/components/MovieSuggestions";
import ParentalGuides from "@/components/ParentalGuides";
import MovieDetailsSkeleton from "@/components/MovieDetailsSkeleton";
import useMovieDetails from "@/hooks/useMovieDetails";
import { ArrowLeft } from "lucide-react";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default function MoviePage({ params }: MoviePageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const movieId = parseInt(resolvedParams.id);

  if (isNaN(movieId)) {
    notFound();
  }

  const { data, isLoading, error } = useMovieDetails(movieId, {
    withImages: true,
  });

  const handleBackClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  if (error) {
    return (
      <Container>
        <div className="py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The movie you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Movies
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  const movie = data?.data?.movie;

  return (
    <Container>
      <div className="py-8">
        <Button
          variant="ghost"
          onClick={handleBackClick}
          className="mb-6 hover:bg-accent cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {isLoading || !movie ? (
          <MovieDetailsSkeleton />
        ) : (
          <MovieDetails movie={movie} />
        )}

        <div className="mt-8">
          <ParentalGuides movieId={movieId} />
        </div>

        <div className="mt-8">
          <MovieSuggestions movieId={movieId} />
        </div>
      </div>
    </Container>
  );
}
