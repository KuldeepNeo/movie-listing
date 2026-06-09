import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import {
  getPosterUrl,
  getGenres,
  getRating,
  getReleaseYear,
} from '../../utils/helpers';
import styles from './MovieDetailPage.module.css';

interface LocationState {
  movie?: Movie;
}

const MovieDetailPage: React.FC = () => {
  const { state } = useLocation() as { state: LocationState | null };
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const movie = state?.movie;

  // Edge case: direct URL visit without state
  if (!movie) {
    return (
      <main className={styles.noData} id="main-content">
        <div className={styles.noDataInner}>
          <span className={styles.noDataIcon}>🎬</span>
          <h1 className={styles.noDataTitle}>Movie Not Found</h1>
          <p className={styles.noDataText}>
            We don't have enough information to display this movie (ID: {id}).
          </p>
          <button
            id="go-back-btn"
            className={styles.backBtn}
            onClick={() => navigate('/')}
            type="button"
          >
            ← Return to Movies
          </button>
        </div>
      </main>
    );
  }

  const posterUrl = getPosterUrl(movie);
  const genres = getGenres(movie);
  const rating = getRating(movie);
  const year = getReleaseYear(movie);
  const title = String(movie.title ?? 'Untitled');
  const overview = String(movie.overview ?? movie.description ?? '');

  const ratingColour =
    rating === null
      ? 'var(--color-text-muted)'
      : rating >= 7
      ? 'var(--color-rating-high)'
      : rating >= 5
      ? 'var(--color-rating-mid)'
      : 'var(--color-rating-low)';

  // Normalise cast to string array
  const rawCast = movie.cast ?? [];
  const castList: string[] = Array.isArray(rawCast)
    ? rawCast.map(c => {
        if (typeof c === 'string') return c;
        if (typeof c === 'object' && c !== null && 'name' in c) return (c as { name: string }).name;
        return '';
      }).filter(Boolean)
    : [];

  return (
    <main className={styles.page} id="main-content">
      {/* Hero section */}
      <section className={styles.hero} aria-label="Movie hero">
        {/* Background blur poster */}
        {!imgError && posterUrl && (
          <div
            className={styles.heroBg}
            style={{ backgroundImage: `url(${posterUrl})` }}
            aria-hidden="true"
          />
        )}
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroContent}>
          {/* Poster */}
          <div className={styles.posterWrapper}>
            {!imgError && posterUrl ? (
              <img
                src={posterUrl}
                alt={`${title} poster`}
                className={styles.poster}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className={styles.posterFallback} aria-hidden="true">
                🎬
              </div>
            )}
          </div>

          {/* Meta info */}
          <div className={styles.meta}>
            <h1 className={styles.title}>{title}</h1>

            {/* Rating + Year + Language */}
            <div className={styles.badges}>
              {rating !== null && (
                <span
                  className={styles.ratingBadge}
                  style={{ color: ratingColour, borderColor: ratingColour }}
                  aria-label={`Rating: ${rating} out of 10`}
                >
                  ★ {rating} / 10
                </span>
              )}
              {year && (
                <span className={styles.badge}>{year}</span>
              )}
              {(movie.language ?? movie.original_language) && (
                <span className={styles.badge}>
                  {String(movie.language ?? movie.original_language).toUpperCase()}
                </span>
              )}
              {movie.runtime && (
                <span className={styles.badge}>{movie.runtime} min</span>
              )}
            </div>

            {/* Genres */}
            {genres.length > 0 && (
              <ul className={styles.genres} aria-label="Genres">
                {genres.map(g => (
                  <li key={g} className={styles.genreTag}>{g}</li>
                ))}
              </ul>
            )}

            {/* Overview */}
            {overview && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <p className={styles.overview}>{overview}</p>
              </div>
            )}

            {/* Director */}
            {movie.director && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Director</h2>
                <p className={styles.sectionText}>{String(movie.director)}</p>
              </div>
            )}

            {/* Cast */}
            {castList.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Cast</h2>
                <ul className={styles.castList} aria-label="Cast members">
                  {castList.slice(0, 8).map(name => (
                    <li key={name} className={styles.castItem}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetailPage;
