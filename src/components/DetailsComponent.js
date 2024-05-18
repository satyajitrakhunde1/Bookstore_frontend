import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailsComponent = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=eafd305d`);
      const data = await response.json();
      setMovieDetails(data);
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div className="details-container">
      {movieDetails ? (
        <div className="movie-details">
          <img src={movieDetails.Poster} alt={movieDetails.Title} />
          <h2>{movieDetails.Title}</h2>
          <p><strong>Year:</strong> {movieDetails.Year}</p>
          <p><strong>Plot:</strong> {movieDetails.Plot}</p>
          <p><strong>Type:</strong> {movieDetails.Type ? movieDetails.Type : "Unknown"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsComponent;