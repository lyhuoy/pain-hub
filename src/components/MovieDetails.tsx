import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Calendar, Download, ExternalLink, FileText } from "lucide-react";
import type { Movie } from "@/types/movie";
import { cn } from "@/lib/utils";
import { isNew } from "@/lib/date-utils";

interface MovieDetailsProps {
  movie: Movie;
  className?: string;
}

const MovieDetails = ({ movie, className }: MovieDetailsProps) => {
  const handleDownload = (torrentUrl: string, quality: string) => {
    const link = document.createElement("a");
    link.href = torrentUrl;
    link.download = `${movie.title} ${movie.year} ${quality}.torrent`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="bg-card rounded-lg">
        <div className="relative grid md:grid-cols-[300px_1fr] gap-6 p-6">
          <div className="relative aspect-[2/3] w-full max-w-[300px] mx-auto md:mx-0">
            {movie.large_cover_image ? (
              <Image
                src={movie.large_cover_image}
                alt={movie.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            ) : (
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-center">
                  No Image
                  <br />
                  Available
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{movie.rating}/10</span>
                </div>
                {movie.mpa_rating && (
                  <Badge variant="outline">{movie.mpa_rating}</Badge>
                )}
              </div>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            )}

            {movie.description_full && (
              <p className="text-muted-foreground leading-relaxed">
                {movie.description_full}
              </p>
            )}

            {movie.summary && (
              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                <h4 className="font-semibold text-foreground mb-2">Summary</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.summary}
                </p>
              </div>
            )}

            {movie.torrents && movie.torrents.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Options
                </h3>
                <div className="grid gap-3">
                  {movie.torrents.map((torrent, index) => (
                    <div
                      key={index}
                      className="bg-secondary rounded-lg p-4 transition-colors   "
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                            >
                              {torrent.quality}
                            </Badge>
                            {torrent.type && (
                              <Badge
                                variant="outline"
                                className="bg-purple-50 text-purple-700 border-purple-200"
                              >
                                {torrent.type}
                              </Badge>
                            )}
                            {isNew(torrent.date_uploaded_unix) && (
                              <Badge
                                variant="default"
                                className="bg-red-500 text-white hover:bg-red-600 animate-pulse"
                              >
                                NEW
                              </Badge>
                            )}
                            {torrent.is_repack === "1" && (
                              <Badge
                                variant="outline"
                                className="bg-orange-50 text-orange-700 border-orange-200"
                              >
                                REPACK
                              </Badge>
                            )}
                          </div>
                          <span className="font-medium text-foreground">
                            {torrent.size}
                          </span>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-muted-foreground">
                                {torrent.seeds} seeds
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-muted-foreground">
                                {torrent.peers} peers
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() =>
                            handleDownload(torrent.url, torrent.quality)
                          }
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cursor-pointer"
                          size="sm"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {movie.imdb_code && (
                <>
                  <Button variant="outline" asChild className="shadow-none border-none">
                    <a
                      href={`https://www.imdb.com/title/${movie.imdb_code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      IMDb
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="shadow-none border-none">
                    <a
                      href={`https://yifysubtitles.ch/movie-imdb/${movie.imdb_code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Subtitles
                    </a>
                  </Button>
                </>
              )}
              {movie.yt_trailer_code && (
                <Button variant="outline" asChild className="shadow-none border-none">
                  <a
                    href={`https://www.youtube.com/watch?v=${movie.yt_trailer_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Trailer
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
