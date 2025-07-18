import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { MovieCardProps } from "@/types/movie";
import { cn } from "@/lib/utils";
import { isNew } from "@/lib/date-utils";

const MovieCard = memo(({ movie, className }: MovieCardProps) => {
  const getHighestQuality = () => {
    if (!movie.torrents || movie.torrents.length === 0) return null;

    const qualityOrder = ["3D", "2160p", "1080p", "720p", "480p"];

    for (const quality of qualityOrder) {
      const torrent = movie.torrents.find((t) => t.quality === quality);
      if (torrent) return torrent.quality;
    }

    return movie.torrents[0].quality;
  };

  const highestQuality = getHighestQuality();

  const movieIsNew = isNew(movie.date_uploaded_unix);
  const hasNewTorrent = movie.torrents?.some((torrent) =>
    isNew(torrent.date_uploaded_unix)
  );
  const showNewBadge = movieIsNew || hasNewTorrent;

  return (
    <div
      className={cn(
        "group overflow-hidden transition-all duration-300 rounded-lg border border-border/50 bg-card",
        className
      )}
    >
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[3/4] sm:aspect-[2/3] overflow-hidden rounded-t-lg">
          {movie.medium_cover_image ? (
            <Image
              src={movie.medium_cover_image}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyatONEcClUkkOhU8JU5QBMlBz/AJDKZGkVWUoJfPYNAEwC6BaQvjF3qV3R/9k="
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-xs text-center">
                No Image
              </span>
            </div>
          )}

          {highestQuality && (
            <Badge
              variant="secondary"
              className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-slate-900 text-white hover:bg-slate-800 shadow-sm border-0 text-xs"
            >
              {highestQuality}
            </Badge>
          )}

          {showNewBadge && (
            <Badge
              variant="default"
              className="absolute top-2 sm:top-3 left-2 sm:left-3 ml-14 sm:ml-16 bg-red-600 text-white hover:bg-red-700 shadow-sm border-0 animate-pulse text-xs"
            >
              NEW
            </Badge>
          )}

          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-1 bg-slate-900 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs shadow-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{movie.rating}</span>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3 text-card-foreground group-hover:text-primary transition-colors">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 sm:mb-3">
            <span className="font-medium">{movie.year}</span>
            <span>{movie.runtime} min</span>
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-0.5 sm:gap-1">
              {movie.genres.slice(0, 2).map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="text-xs bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700 px-1.5 sm:px-2 py-0.5"
                >
                  {genre}
                </Badge>
              ))}
              {movie.genres.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700 px-1.5 sm:px-2 py-0.5"
                >
                  +{movie.genres.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
});

MovieCard.displayName = "MovieCard";

export default MovieCard;
