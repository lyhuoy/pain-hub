import { Container } from "@/components/Container";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export default function HomePageLoading() {
  return (
    <Container className="py-8">
      <div className="space-y-8">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <div className="h-12 bg-muted rounded-lg w-96 mx-auto animate-pulse" />
            <div className="h-6 bg-muted rounded w-80 mx-auto animate-pulse" />
          </div>
          <div className="h-16 bg-muted rounded-lg w-full max-w-2xl mx-auto animate-pulse" />
        </div>

        <div className="h-20 bg-muted rounded-lg w-full animate-pulse" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 20 }, (_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </Container>
  );
}
