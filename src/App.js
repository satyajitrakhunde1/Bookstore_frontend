import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import SearchComponent from './components/SearchComponent';
import WatchlistComponent from './components/WatchlistComponent';
import PopupComponent from './components/PopupComponent';
import './components/styles.css';

export const WatchlistContext = createContext();
export const UserContext = createContext();

function App() {
    const [watchlist, setWatchlist] = useState([]);
    const [user, setUser] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        if (loggedUser) {
            setUser(loggedUser);
            const userWatchlist = localStorage.getItem(loggedUser.email);
            if (userWatchlist) {
                setWatchlist(JSON.parse(userWatchlist));
            }
        }
    }, []);

    const updateWatchlist = (newWatchlist) => {
        setWatchlist(newWatchlist);
        if (user) {
            localStorage.setItem(user.email, JSON.stringify(newWatchlist));
        }
    };

    const showPopup = (message) => {
        setPopupMessage(message);
    };

    const handleClosePopup = () => {
        setPopupMessage('');
    };

    const handleLogout = () => {
        setUser(null);
        setWatchlist([]);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <WatchlistContext.Provider value={{ watchlist, updateWatchlist, showPopup }}>
                <Router>
                    <div className="app">
                        {user && (
                            <aside className="sidebar">
                                <h2>Watchlists</h2>
                                <nav>
                                    <Link to="/search">Home</Link>
                                    <Link to="/watchlist">My Lists</Link>
                                    <button onClick={handleLogout}>Logout</button>
                                </nav>
                            </aside>
                        )}
                        <main>
                            <Routes>
                                <Route path="/" element={user ? <Navigate to="/search" /> : <LoginComponent />} />
                                <Route path="/register" element={<RegisterComponent />} />
                                <Route path="/search" element={user ? <SearchComponent /> : <Navigate to="/" />} />
                                <Route path="/watchlist" element={user ? <WatchlistComponent /> : <Navigate to="/" />} />
                            </Routes>
                        </main>
                        {popupMessage && <PopupComponent message={popupMessage} onClose={handleClosePopup} />}
                    </div>
                </Router>
            </WatchlistContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
