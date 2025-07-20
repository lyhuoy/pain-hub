export interface Movie {
  id: number;
  url: string;
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  summary: string;
  description_full: string;
  synopsis: string;
  yt_trailer_code: string;
  language: string;
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  state: string;
  torrents: Torrent[];
  date_uploaded: string;
  date_uploaded_unix: number;
  cast?: Cast[];
}

export interface Torrent {
  url: string;
  hash: string;
  quality: string;
  type: string;
  is_repack: string;
  video_codec: string;
  bit_depth: string;
  audio_channels: string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
  date_uploaded_unix: number;
}

export interface Cast {
  name: string;
  character_name: string;
  url_small_image: string;
  imdb_code: string;
}

export interface MovieListResponse {
  status: string;
  status_message: string;
  data: {
    movie_count: number;
    limit: number;
    page_number: number;
    movies: Movie[];
  };
  "@meta": {
    server_time: number;
    server_timezone: string;
    api_version: number;
    execution_time: string;
  };
}

export interface MovieDetailsResponse {
  status: string;
  status_message: string;
  data: {
    movie: Movie;
  };
  "@meta": {
    server_time: number;
    server_timezone: string;
    api_version: number;
    execution_time: string;
  };
}

export interface MovieSuggestionsResponse {
  status: string;
  status_message: string;
  data: {
    movie_count: number;
    movies: Movie[];
  };
  "@meta": {
    server_time: number;
    server_timezone: string;
    api_version: number;
    execution_time: string;
  };
}

export interface ParentalGuide {
  type: string;
  parental_guide_text: string;
}

export interface ParentalGuidesResponse {
  status: string;
  status_message: string;
  data: {
    parental_guide_count: number;
    parental_guides: ParentalGuide[];
  };
  "@meta": {
    server_time: number;
    server_timezone: string;
    api_version: number;
    execution_time: string;
  };
}

// Filter Types
export interface MovieFilters {
  limit?: number;
  page?: number;
  quality?: "all" | "720p" | "1080p" | "2160p" | "3D";
  minimum_rating?: number;
  query_term?: string;
  genre?: string;
  sort_by?:
    | "title"
    | "year"
    | "rating"
    | "peers"
    | "seeds"
    | "download_count"
    | "like_count"
    | "date_added";
  order_by?: "asc" | "desc";
  with_rt_ratings?: boolean;
}

// UI Types
export interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export interface FilterPanelProps {
  filters: MovieFilters;
  onFiltersChange: (filters: MovieFilters) => void;
  isLoading?: boolean;
}

// Constants
export const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
] as const;

export const QUALITIES = ["all", "720p", "1080p", "2160p", "3D"] as const;

export const SORT_OPTIONS = [
  { value: "year", label: "Year" },
  { value: "date_added", label: "Date Added" },
  { value: "title", label: "Title" },
  { value: "rating", label: "Rating" },
  { value: "peers", label: "Peers" },
  { value: "seeds", label: "Seeds" },
  { value: "download_count", label: "Downloads" },
  { value: "like_count", label: "Likes" },
] as const;
