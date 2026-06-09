import { useEffect, useRef } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search movies…',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: "/" focuses search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={styles.wrapper} role="search">
      <label htmlFor="movie-search" className="sr-only">
        Search movies
      </label>
      <span className={styles.icon} aria-hidden="true">🔍</span>
      <input
        ref={inputRef}
        id="movie-search"
        type="search"
        className={styles.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        aria-label="Search movies by title"
      />
      {value && (
        <button
          id="clear-search-btn"
          className={styles.clearBtn}
          onClick={() => onChange('')}
          type="button"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
