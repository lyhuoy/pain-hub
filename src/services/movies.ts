import api from "@/lib/axios";
import type {
  MovieFilters,
  MovieListResponse,
  MovieDetailsResponse,
  MovieSuggestionsResponse,
  ParentalGuidesResponse,
} from "@/types/movie";

export const fetchMovies = async (
  filters: MovieFilters = {}
): Promise<MovieListResponse> => {
  const params = new URLSearchParams();

  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.quality && filters.quality !== "all")
    params.append("quality", filters.quality);
  if (filters.minimum_rating)
    params.append("minimum_rating", filters.minimum_rating.toString());
  if (filters.query_term) params.append("query_term", filters.query_term);
  if (filters.genre) params.append("genre", filters.genre);
  if (filters.sort_by) params.append("sort_by", filters.sort_by);
  if (filters.order_by) params.append("order_by", filters.order_by);
  if (filters.with_rt_ratings) params.append("with_rt_ratings", "true");

  const response = await api.get<MovieListResponse>(
    `/list_movies.json?${params.toString()}`
  );
  return response.data;
};

export const fetchMovieDetails = async (
  movieId: number,
  options: {
    withImages?: boolean;
    withCast?: boolean;
  } = {}
): Promise<MovieDetailsResponse> => {
  const params = new URLSearchParams();
  params.append("movie_id", movieId.toString());

  if (options.withImages) params.append("with_images", "true");
  if (options.withCast) params.append("with_cast", "true");

  const response = await api.get<MovieDetailsResponse>(
    `/movie_details.json?${params.toString()}`
  );
  return response.data;
};

export const fetchMovieSuggestions = async (
  movieId: number
): Promise<MovieSuggestionsResponse> => {
  const params = new URLSearchParams();
  params.append("movie_id", movieId.toString());

  const response = await api.get<MovieSuggestionsResponse>(
    `/movie_suggestions.json?${params.toString()}`
  );
  return response.data;
};

export const fetchParentalGuides = async (
  movieId: number
): Promise<ParentalGuidesResponse> => {
  const params = new URLSearchParams();
  params.append("movie_id", movieId.toString());

  const response = await api.get<ParentalGuidesResponse>(
    `/movie_parental_guides.json?${params.toString()}`
  );
  return response.data;
};

export const generateMagnetLink = (hash: string, title: string): string => {
  const encodedTitle = encodeURIComponent(title);
  const trackers = [
    "udp://open.demonii.com:1337/announce",
    "udp://tracker.openbittorrent.com:80",
    "udp://tracker.coppersurfer.tk:6969",
    "udp://glotorrents.pw:6969/announce",
    "udp://tracker.opentrackr.org:1337/announce",
    "udp://torrent.gresille.org:80/announce",
    "udp://p4p.arenabg.com:1337",
    "udp://tracker.leechers-paradise.org:6969",
  ];

  const trackerParams = trackers
    .map((tracker) => `tr=${encodeURIComponent(tracker)}`)
    .join("&");

  return `magnet:?xt=urn:btih:${hash}&dn=${encodedTitle}&${trackerParams}`;
};
