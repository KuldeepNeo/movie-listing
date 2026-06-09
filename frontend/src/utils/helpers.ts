import type { Movie } from '../types/movie';

/** Return the best available poster URL from a Movie object */
export const getPosterUrl = (movie: Movie): string | null => {
  const raw =
    movie.poster_path ??
    movie.poster ??
    movie.image ??
    movie.backdrop_path ??
    movie.backdrop ??
    null;
  if (!raw) return null;
  // jsonfakery sometimes returns relative paths
  if (typeof raw === 'string' && raw.startsWith('/')) {
    return `https://image.tmdb.org/t/p/w500${raw}`;
  }
  return raw as string;
};

/** Return genres as a string array, regardless of source format */
export const getGenres = (movie: Movie): string[] => {
  const raw = movie.genres ?? movie.genre ?? movie.genre_ids ?? [];
  if (Array.isArray(raw)) {
    return raw.map(g => {
      if (typeof g === 'string') return g;
      if (typeof g === 'number') return String(g);
      if (typeof g === 'object' && g !== null && 'name' in g) return (g as { name: string }).name;
      return '';
    }).filter(Boolean);
  }
  if (typeof raw === 'string') return [raw];
  return [];
};

/** Return vote average / rating as a number */
export const getRating = (movie: Movie): number | null => {
  const raw = movie.vote_average ?? movie.rating ?? null;
  if (raw === null) return null;
  const num = Number(raw);
  return isNaN(num) ? null : Math.round(num * 10) / 10;
};

/** Return a release year string */
export const getReleaseYear = (movie: Movie): string => {
  if (movie.year) return String(movie.year);
  if (movie.release_date) return movie.release_date.substring(0, 4);
  return '';
};

/** Truncate a string to a max length with ellipsis */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}…`;
};

/** Extract unique genres from a list of movies */
export const extractAllGenres = (movies: Movie[]): string[] => {
  const set = new Set<string>();
  movies.forEach(m => getGenres(m).forEach(g => set.add(g)));
  return Array.from(set).sort();
};
