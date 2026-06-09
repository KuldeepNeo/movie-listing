export interface Movie {
  id: number | string;
  title: string;
  overview?: string;
  description?: string;
  poster_path?: string;
  poster?: string;
  image?: string;
  backdrop_path?: string;
  backdrop?: string;
  genre_ids?: number[];
  genres?: string[] | { id: number; name: string }[];
  genre?: string | string[];
  release_date?: string;
  year?: number | string;
  vote_average?: number;
  rating?: number;
  vote_count?: number;
  cast?: string[] | { name: string; character?: string }[];
  director?: string;
  runtime?: number;
  language?: string;
  original_language?: string;
  popularity?: number;
  [key: string]: unknown;
}

export interface PaginatedResponse {
  data: Movie[];
  current_page?: number;
  last_page?: number;
  total?: number;
  per_page?: number;
  next_page_url?: string | null;
  prev_page_url?: string | null;
  // alternate shapes
  movies?: Movie[];
  page?: number;
  pages?: number;
  results?: Movie[];
}
