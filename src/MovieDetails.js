import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { getMovieById } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieDetails = await getMovieById(id);
      setMovie(movieDetails);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details-page">
        <Link to="/" className="btn btn-primary back-button">Back to Home</Link>
      <div className="movie-details-content">
        <div className="poster-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        </div>
        <div className="movie-info">
          <h1 className="movie-title">{movie.title} <span className="movie-year">({new Date(movie.release_date).getFullYear()})</span></h1>
          <div className="movie-metadata">
          <span className="movie-rating">{Math.round(movie.vote_average * 10)}%</span>
            <span className="movie-release-date">{new Date(movie.release_date).toLocaleDateString()}</span>
            <span className="movie-genre">{movie.genres.map(genre => genre.name).join(', ')}</span>
            <span className="movie-duration">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
          </div>
          <div className="movie-summary">
            <h3>Kilasan Singkat</h3>
            <p>{movie.overview}</p>
          </div>
          {/* <div className="movie-credits">
            <h4>Director</h4>
            <p>{movie.orginial}</p>
            <h4>Screenplay</h4>
            <p>{movie.screenplay}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
