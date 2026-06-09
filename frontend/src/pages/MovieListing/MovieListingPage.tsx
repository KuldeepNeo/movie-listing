import { useState, useMemo } from 'react';
import { useMovies } from '../../hooks/useMovies';
import { extractAllGenres, getGenres } from '../../utils/helpers';
import SearchBar from '../../components/SearchBar/SearchBar';
import GenreFilter from '../../components/GenreFilter/GenreFilter';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import Loader from '../../components/Loader/Loader';
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner';
import Pagination from '../../components/Pagination/Pagination';
import styles from './MovieListingPage.module.css';

const MovieListingPage: React.FC = () => {
  const { movies, loading, error, currentPage, lastPage, total, setPage, retry } = useMovies();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Extract unique genres from current page of movies
  const allGenres = useMemo(() => extractAllGenres(movies), [movies]);

  // Client-side filter: search + genre
  const filteredMovies = useMemo(() => {
    let result = movies;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m =>
        String(m.title ?? '').toLowerCase().includes(q)
      );
    }

    if (selectedGenre) {
      result = result.filter(m => getGenres(m).includes(selectedGenre));
    }

    return result;
  }, [movies, searchQuery, selectedGenre]);

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };

  return (
    <main className={styles.page} id="main-content">
      {/* Hero banner */}
      <section className={styles.hero} aria-label="Movie listing header">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Movies</h1>
          <p className={styles.heroSubtitle}>
            {loading ? 'Loading…' : `Browse ${total > 0 ? total.toLocaleString() : ''} titles`}
          </p>
        </div>
      </section>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlsInner}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <GenreFilter
            genres={allGenres}
            selected={selectedGenre}
            onSelect={handleGenreSelect}
          />
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {loading ? (
          <Loader count={10} />
        ) : error ? (
          <ErrorBanner message={error} onRetry={retry} />
        ) : (
          <>
            <MovieGrid movies={filteredMovies} />
            {!searchQuery && !selectedGenre && (
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default MovieListingPage;
