import { useState, useEffect, useCallback } from 'react';
import { getMovies } from '../services/movieService';
import type { Movie } from '../types/movie';

interface UseMoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  lastPage: number;
  total: number;
}

interface UseMoviesReturn extends UseMoviesState {
  setPage: (page: number) => void;
  retry: () => void;
}

export const useMovies = (initialPage = 1): UseMoviesReturn => {
  const [page, setPage] = useState<number>(initialPage);
  const [state, setState] = useState<UseMoviesState>({
    movies: [],
    loading: true,
    error: null,
    currentPage: initialPage,
    lastPage: 1,
    total: 0,
  });

  const fetchMovies = useCallback(async (pageNum: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await getMovies({ page: pageNum });
      setState({
        movies: result.movies,
        loading: false,
        error: null,
        currentPage: result.currentPage,
        lastPage: result.lastPage,
        total: result.total,
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load movies.',
      }));
    }
  }, []);

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  const retry = () => fetchMovies(page);

  return { ...state, setPage, retry };
};
