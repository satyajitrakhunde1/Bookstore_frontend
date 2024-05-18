import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { WatchlistContext } from '../App';

function MovieDetailsComponent() {
  const { id } = useParams();
  const { watchlist, setWatchlist } = useContext(WatchlistContext);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=eafd305d`)
      .then((response) => response.json())
      .then((data) => setMovie(data));
  }, [id]);

  const handleAddToWatchlist = () => {
    if (!watchlist.find((item) => item.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
      alert(`${movie.Title} has been added to your watchlist`);
    } else {
      alert(`${movie.Title} is already in your watchlist`);
    }
  };
  console.log("movie: ",movie)

  return (
    <div className="details-container">
      {movie ? (
        <>
          <h2>{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <img src={movie.Poster ? movie.Poster : "https://m.media-amazon.com/images/M/MV5BN2U5MTdkNTAtYTk5Zi00NzBlLTkyMjItYWI5ZjIzMDU5Njg0XkEyXkFqcGdeQXVyNTAxMzEzNjU@._V1_SX300.jpg"} alt={movie.Title} />
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <h4><strong>Release Year:</strong>{movie.Year}</h4>
          <h4><strong>Type:</strong>{movie.Type}</h4>
          <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetailsComponent;