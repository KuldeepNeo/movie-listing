import styles from './GenreFilter.module.css';

interface GenreFilterProps {
  genres: string[];
  selected: string;
  onSelect: (genre: string) => void;
}

const ALL_LABEL = 'All';

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selected, onSelect }) => {
  if (genres.length === 0) return null;

  const allGenres = [ALL_LABEL, ...genres];

  return (
    <nav className={styles.wrapper} aria-label="Filter by genre">
      <ul className={styles.list} role="list">
        {allGenres.map(genre => {
          const isActive = genre === ALL_LABEL ? selected === '' : selected === genre;
          return (
            <li key={genre}>
              <button
                id={`genre-filter-${genre.toLowerCase().replace(/\s+/g, '-')}`}
                className={`${styles.pill} ${isActive ? styles.active : ''}`}
                onClick={() => onSelect(genre === ALL_LABEL ? '' : genre)}
                type="button"
                aria-pressed={isActive}
                aria-label={`Filter by ${genre}`}
              >
                {genre}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default GenreFilter;
