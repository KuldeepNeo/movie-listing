import type { Movie, PaginatedResponse } from '../types/movie';

const BASE_URL = 'https://jsonfakery.com/movies/paginated';

export interface GetMoviesOptions {
  page?: number;
}

export interface GetMoviesResult {
  movies: Movie[];
  currentPage: number;
  lastPage: number;
  total: number;
}

export const getMovies = async (options: GetMoviesOptions = {}): Promise<GetMoviesResult> => {
  const { page = 1 } = options;
  const url = `${BASE_URL}?page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
  }

  const raw: PaginatedResponse = await response.json();

  // Normalise the response — the API may return different shapes
  const movies: Movie[] =
    raw.data ?? raw.results ?? raw.movies ?? [];

  const currentPage = raw.current_page ?? raw.page ?? page;
  const lastPage = raw.last_page ?? raw.pages ?? 1;
  const total = raw.total ?? movies.length;

  return { movies, currentPage, lastPage, total };
};
