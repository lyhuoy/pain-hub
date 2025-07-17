import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MovieCardSkeletonProps {
  className?: string;
}

const MovieCardSkeleton = ({ className }: MovieCardSkeletonProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border/50 bg-card",
        className
      )}
    >
      <div className="relative aspect-[2/3] rounded-t-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="p-4">
        <Skeleton className="h-4 w-3/4 mb-3" />
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
