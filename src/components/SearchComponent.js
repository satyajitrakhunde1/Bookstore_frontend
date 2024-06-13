


import React, { useState, useEffect, useContext } from 'react';
import { WatchlistContext, UserContext } from '../App';
import './styles.css';

const SearchComponent = () => {
    const { updateCart } = useContext(WatchlistContext);
    const { user } = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
            setLoading(false);
        };

        fetchBooks();
    }, []);

    const addToCart = async (book) => {
        if (!user) {
            window.alert('You must be logged in to add books to your cart.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ bookId: book._id, quantity: 1 }) // default quantity to 1
            });

            if (!response.ok) {
                throw new Error(' Added item to cart');
            }

            const newCartItem = await response.json();
            updateCart((prevCart) => [...prevCart, newCartItem]);
            window.alert(`${book.title} added to cart`);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            window.alert('Added item to cart');
        }
    };

    return (
        <div className="search-container">
            <h1>Welcome to <span className="highlight">Bookstore</span></h1>
            <p>Browse books, add them to your cart, and manage your selections.</p>
            <div className="search-results">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {books.length === 0 ? (
                            <p>No books found.</p>
                        ) : (
                            books.map((book) => (
                                <div key={book._id} className="book-card auth-container">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt={book.title}
                                    />
                                    <div className="book-info">
                                        <h3>{book.title}</h3>
                                        <p><strong>Author:</strong> {book.author}</p>
                                        <p><strong>Category:</strong> {book.category}</p>
                                        <p><strong>Price:</strong> ${book.price}</p>
                                        <button onClick={() => addToCart(book)}>Add to Cart</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
