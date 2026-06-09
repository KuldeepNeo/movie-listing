import MovieCard from '../MovieCard/MovieCard';
import type { Movie } from '../../types/movie';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className={styles.empty} role="status" aria-live="polite">
        <span className={styles.emptyIcon}>🎬</span>
        <p className={styles.emptyText}>No movies found.</p>
        <p className={styles.emptySubtext}>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <section
      className={styles.grid}
      aria-label={`${movies.length} movies`}
    >
      {movies.map(movie => (
        <MovieCard key={String(movie.id)} movie={movie} />
      ))}
    </section>
  );
};

export default MovieGrid;
