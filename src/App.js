import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";
import MovieDetails from './MovieDetails';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notFound, setNotFound] = useState(false); // To handle "not found" status
  const navigate = useNavigate();

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const search = async () => {
    if (searchQuery.length > 3) {
      const query = await searchMovie(searchQuery);
      if (query.results.length === 0) {
        setNotFound(true); // If no movies are found, set notFound to true
        setPopularMovies([]); // Clear movie list
      } else {
        setNotFound(false); // Reset notFound
        setPopularMovies(query.results);
      }
    }
  };

  const PopularMovieList = () => {
    if (notFound) {
      return <h2 className="text-center mt-5">Movie not found</h2>; // Display "Movie not found" message
    }

    return (
      <div className="Movie-container">
        {popularMovies.map((movie, i) => (
          <div key={i} className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="movie-poster"
              alt={movie.title}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="release-date">{new Date(movie.release_date).toDateString()}</p>
            </div>
            <div className="rating-circle">
              <span>{Math.round(movie.vote_average * 10)}%</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App text-center">
      <header className="App-header">
        <div className="header-background"></div>
        <div className="container">
          <h1>Selamat datang</h1>
          <p>Millions of movies, TV shows and people to discover. Explore now.</p>
          <div className="row justify-content-center mt-4">
            <div className="col-md-8 col-lg-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari sebuah film, serial tv, kru / aktor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary" onClick={search}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="trending-section">
          <h2>Trending</h2>
          <div className="scroll-container">
            <PopularMovieList />
          </div>
        </div>
      </header>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
