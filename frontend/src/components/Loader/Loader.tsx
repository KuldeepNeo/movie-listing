import styles from './Loader.module.css';

interface LoaderProps {
  count?: number;
}

const SkeletonCard: React.FC = () => (
  <div className={styles.skeletonCard} aria-hidden="true">
    <div className={styles.skeletonPoster} />
    <div className={styles.skeletonBody}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonMeta} />
      <div className={styles.skeletonGenres} />
    </div>
  </div>
);

const Loader: React.FC<LoaderProps> = ({ count = 10 }) => {
  return (
    <div
      className={styles.grid}
      role="status"
      aria-label="Loading movies…"
    >
      <span className="sr-only">Loading movies…</span>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default Loader;
