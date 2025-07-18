import { Skeleton } from "@/components/ui/skeleton";

const MovieDetailsSkeleton = () => (
  <div className="space-y-6">
    <div className="bg-card rounded-lg border border-border">
      <div className="relative grid md:grid-cols-[300px_1fr] gap-6 p-6">
        <Skeleton className="aspect-[2/3] w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieDetailsSkeleton;
