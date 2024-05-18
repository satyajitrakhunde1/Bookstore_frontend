// WatchlistComponent.js
import React, { useContext } from 'react';
import { WatchlistContext } from '../App';
import './styles.css';

const WatchlistComponent = () => {
    const { watchlist, updateWatchlist, showPopup } = useContext(WatchlistContext);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(watchlist)
    const userWatchlistKey = currentUser ? `watchlist_${currentUser.email}` : null;
    const storedWatchlist = userWatchlistKey ? JSON.parse(localStorage.getItem(userWatchlistKey)) || [] : [];

    const removeFromWatchlist = (movie) => {
        const newWatchlist = storedWatchlist.filter((item) => item.imdbID !== movie.imdbID);
        localStorage.setItem(userWatchlistKey, JSON.stringify(newWatchlist));
        updateWatchlist(newWatchlist);
        showPopup(`${movie.Title} removed from watchlist`);
    };

    return (
        <div className="watchlist-container">
            <h1>My Watchlist</h1>
            {storedWatchlist.length === 0 ? (
                <p>Your watchlist is empty</p>
            ) : (
                <div className="watchlist-results">
                    {storedWatchlist.map((movie) => (
                        <div key={movie.imdbID} className="movie-card">
                            <img
                                src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/300x450.png?text=No+Image"}
                                alt={movie.Title}
                            />
                            <div className="movie-info">
                                <h3>{movie.Title}</h3>
                                <p><strong>Year:</strong> {movie.Year}</p>
                                {/* <p><strong>Type:</strong> {movie.Type ? movie.Type :"2000"}</p> */}
                                <p><strong>Type:</strong> {movie.Type ? movie.Type : "Unknown"}</p>
                                <button onClick={() => removeFromWatchlist(movie)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchlistComponent;
