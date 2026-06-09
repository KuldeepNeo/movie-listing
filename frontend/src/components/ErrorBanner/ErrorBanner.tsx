import styles from './ErrorBanner.module.css';

interface ErrorBannerProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) => {
  return (
    <div className={styles.wrapper} role="alert" aria-live="assertive">
      <div className={styles.icon} aria-hidden="true">⚠</div>
      <h2 className={styles.title}>Oops! Something went wrong</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button
          id="retry-button"
          className={styles.retryBtn}
          onClick={onRetry}
          type="button"
          aria-label="Retry loading movies"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
