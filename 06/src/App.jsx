import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout.jsx';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import NowPlayingPage from './pages/NowPlayingPage';
import PopularPage from './pages/PopularPage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';
import SearchPage from './pages/SearchPage/SearchPage';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignupPage from './pages/SignupPage/SignupPage.jsx';
import NotFound from './pages/not-found';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import { AuthProvider } from './AutoContext.jsx';

const router = createBrowserRouter([
  { path: '/', element: <RootLayout />, errorElement: <NotFound />, children: [
      { path: '/', element: <HomePage /> },
      { path: 'movies', element: <MoviesPage /> },
      { path: 'movies/now-playing', element: <NowPlayingPage /> },
      { path: 'movies/popular', element: <PopularPage /> },
      { path: 'movies/top-rated', element: <TopRatedPage /> },
      { path: 'movies/upcoming', element: <UpcomingPage /> },
      { path: 'movies/:movieId', element: <MovieDetailPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
  ]},
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
