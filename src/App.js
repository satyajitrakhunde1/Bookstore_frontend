

// import React, { useState, useEffect, createContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import LoginComponent from './components/LoginComponent';
// import RegisterComponent from './components/RegisterComponent';
// import SearchComponent from './components/SearchComponent';
// import CartComponent from './components/CartComponent';
// import PopupComponent from './components/PopupComponent';
// import AdminCartComponent from './components/AdminCartComponent'; // Import the admin cart component
// import AdminBookManagement from './components/AdminBookManagement'; // Import the admin book management component
// import './components/styles.css';

// export const WatchlistContext = createContext();
// export const UserContext = createContext();

// function App() {
//     const [cart, setCart] = useState([]);
//     const [user, setUser] = useState(null);
//     const [popupMessage, setPopupMessage] = useState('');

//     useEffect(() => {
//         const loggedUser = JSON.parse(localStorage.getItem('user'));
//         if (loggedUser) {
//             setUser(loggedUser);
//         }
//     }, []);

//     const handleLogout = () => {
//         setUser(null);
//         localStorage.removeItem('user');
//     };

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             <WatchlistContext.Provider value={{ cart, setCart, popupMessage, setPopupMessage }}>
//                 <Router>
//                     <div className="app">
//                         {user && (
//                             <aside className="sidebar">
//                                 <h2>{user.email === 'admin@gmail.com' ? 'Admin Dashboard' : 'User Dashboard'}</h2>
//                                 <nav>
//                                     <Link to="/search">Home</Link>
//                                     {user.email === 'admin@gmail.com' ? (
//                                         <>
//                                             <Link to="/admin/books">Admin Books</Link>
//                                             <Link to="/admin/cart">Admin Cart</Link>
//                                         </>
//                                     ) : (
//                                         <Link to="/cart">My Cart</Link>
//                                     )}
//                                     <button onClick={handleLogout}>Logout</button>
//                                 </nav>
//                             </aside>
//                         )}
//                         <main>
//                             <Routes>
//                                 <Route path="/" element={user ? <Navigate to="/search" /> : <LoginComponent />} />
//                                 <Route path="/register" element={<RegisterComponent />} />
//                                 <Route path="/search" element={user ? <SearchComponent /> : <Navigate to="/" />} />
//                                 <Route path="/cart" element={user ? <CartComponent /> : <Navigate to="/" />} />
//                                 <Route path="/admin/books" element={user && user.email === 'admin@gmail.com' ? <AdminBookManagement /> : <Navigate to="/" />} />
//                                 <Route path="/admin/cart" element={user && user.email === 'admin@gmail.com' ? <AdminCartComponent /> : <Navigate to="/" />} />
//                             </Routes>
//                         </main>
//                         {popupMessage && <PopupComponent message={popupMessage} onClose={() => setPopupMessage('')} />}
//                     </div>
//                 </Router>
//             </WatchlistContext.Provider>
//         </UserContext.Provider>
//     );
// }

// export default App;





import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import SearchComponent from './components/SearchComponent';
import CartComponent from './components/CartComponent';
import PopupComponent from './components/PopupComponent';
import AdminCartComponent from './components/AdminCartComponent'; // Import the admin cart component
import AdminBookManagement from './components/AdminBookManagement'; // Import the admin book management component
import './components/styles.css';

export const WatchlistContext = createContext();
export const UserContext = createContext();

function App() {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        if (loggedUser) {
            setUser(loggedUser);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <WatchlistContext.Provider value={{ cart, setCart, popupMessage, setPopupMessage }}>
                <Router>
                    <div className="app">
                        {user && (
                            <aside className="sidebar">
                                <h2>{user.email === 'admin@gmail.com' ? 'Admin Dashboard' : 'User Dashboard'}</h2>
                                <nav>
                                    {/* Render Home link only for non-admin users */}
                                    {!user.email === 'admin@gmail.com' && <Link to="/search">Home</Link>}
                                    {user.email === 'admin@gmail.com' ? (
                                        <>
                                            <Link to="/admin/books">Admin Books</Link>
                                            <Link to="/admin/cart">Admin Cart</Link>
                                        </>
                                    ) : (
                                        <Link to="/cart">My Cart</Link>
                                    )}
                                    <button onClick={handleLogout}>Logout</button>
                                </nav>
                            </aside>
                        )}
                        <main>
                            <Routes>
                                <Route path="/" element={user ? <Navigate to="/search" /> : <LoginComponent />} />
                                <Route path="/register" element={<RegisterComponent />} />
                                <Route path="/search" element={user ? <SearchComponent /> : <Navigate to="/" />} />
                                <Route path="/cart" element={user ? <CartComponent /> : <Navigate to="/" />} />
                                <Route path="/admin/books" element={user && user.email === 'admin@gmail.com' ? <AdminBookManagement /> : <Navigate to="/" />} />
                                <Route path="/admin/cart" element={user && user.email === 'admin@gmail.com' ? <AdminCartComponent /> : <Navigate to="/" />} />
                            </Routes>
                        </main>
                        {popupMessage && <PopupComponent message={popupMessage} onClose={() => setPopupMessage('')} />}
                    </div>
                </Router>
            </WatchlistContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
