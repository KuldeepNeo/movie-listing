import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="Netflix — Go to Home">
          <span className={styles.logoIcon}>▶</span>
          <span className={styles.logoText}>Netflix</span>
        </Link>

        {!isHome && (
          <nav className={styles.nav} aria-label="Main navigation">
            <Link to="/" className={styles.navLink}>
              ← All Movies
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
