// SearchComponent.js
import React, { useState, useContext } from 'react';
import { WatchlistContext } from '../App';
import './styles.css';

const SearchComponent = () => {
    const { watchlist, updateWatchlist, showPopup } = useContext(WatchlistContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    console.log(watchlist)
    
    const handleSearch = async () => {
        setLoading(true);
        setNoResults(false);
        const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=eafd305d`);
        const data = await response.json();
        setLoading(false);

        if (data.Search) {
            setSearchResults(data.Search);
        } else {
            setSearchResults([]);
            setNoResults(true);
        }
    };

    const addToWatchlist = (movie) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showPopup('You must be logged in to add movies to your watchlist.');
            return;
        }

        const userWatchlistKey = `watchlist_${currentUser.email}`;
        const userWatchlist = JSON.parse(localStorage.getItem(userWatchlistKey)) || [];
        
        if (!userWatchlist.some((item) => item.imdbID === movie.imdbID)) {
            const newWatchlist = [...userWatchlist, movie];
            localStorage.setItem(userWatchlistKey, JSON.stringify(newWatchlist));
            updateWatchlist(newWatchlist);
            showPopup(`${movie.Title} added to watchlist`);
        } else {
            showPopup(`${movie.Title} is already in your watchlist`);
        }
    };

    return (
        <div className="search-container">
            <h1>Welcome to <span className="highlight">Watchlists</span></h1>
            <p>Browse movies, add them to watchlists, and share them with friends. Just click the <strong>Add to Watchlist</strong> to add a movie, and click the poster to see more details.</p>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {noResults && <p>No movies found. Please try a different search term.</p>}
                        {searchResults.map((movie) => (
                            <div key={movie.imdbID} className="movie-card">
                                <img
                                    src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/300x450.png?text=No+Image"}
                                    alt={movie.Title}
                                />
                                <div className="movie-info">
                                    <h3>{movie.Title}</h3>
                                    <p><strong>Publish Year:</strong> {movie.Year}</p>
                                    <p><strong>Type:</strong>{movie.Type}</p>
                                    <button onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
