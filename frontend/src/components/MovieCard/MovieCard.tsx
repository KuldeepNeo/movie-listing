import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import { getPosterUrl, getGenres, getRating, getReleaseYear, truncate } from '../../utils/helpers';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const posterUrl = getPosterUrl(movie);
  const genres = getGenres(movie);
  const rating = getRating(movie);
  const year = getReleaseYear(movie);
  const title = String(movie.title ?? 'Untitled');

  const ratingClass =
    rating === null
      ? ''
      : rating >= 7
      ? styles.ratingHigh
      : rating >= 5
      ? styles.ratingMid
      : styles.ratingLow;

  const handleClick = () => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className={styles.card}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}`}
    >
      {/* Poster */}
      <div className={styles.posterWrapper}>
        {!imgError && posterUrl ? (
          <img
            src={posterUrl}
            alt={`${title} poster`}
            className={styles.poster}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.posterFallback} aria-hidden="true">
            <span className={styles.fallbackIcon}>🎬</span>
            <span className={styles.fallbackText}>{truncate(title, 30)}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className={styles.overlay} aria-hidden="true">
          <span className={styles.playBtn}>▶</span>
          <span className={styles.moreInfo}>More Info</span>
        </div>

        {/* Rating badge */}
        {rating !== null && (
          <div className={`${styles.ratingBadge} ${ratingClass}`} aria-label={`Rating: ${rating}`}>
            ★ {rating}
          </div>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <h3 className={styles.title} title={title}>
          {truncate(title, 40)}
        </h3>
        <div className={styles.meta}>
          {year && <span className={styles.year}>{year}</span>}
        </div>
        {genres.length > 0 && (
          <ul className={styles.genres} aria-label="Genres">
            {genres.slice(0, 2).map(g => (
              <li key={g} className={styles.genreTag}>{g}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

export default MovieCard;
