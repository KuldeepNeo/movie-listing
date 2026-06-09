import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MovieListingPage from './pages/MovieListing/MovieListingPage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<MovieListingPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
