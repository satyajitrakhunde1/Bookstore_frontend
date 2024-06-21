


import React, { useContext, useEffect, useState } from 'react';
import { WatchlistContext, UserContext } from '../App';
import './styles.css';

const CartComponent = () => {
    const { showPopup } = useContext(WatchlistContext);
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                const data = await response.json();
                console.log('Fetched cart items:', data); // Debugging output
                setCart(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        if (user) {
            fetchCartItems();
        }
    }, [user]);

    const addToCart = async (bookId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ bookId, quantity: 1 }) // default quantity to 1
            });
            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }
            const newCartItem = await response.json();
            setCart([...cart, newCartItem]);
            showPopup('Item added to cart');
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }
            const updatedCart = cart.filter(item => item._id !== itemId);
            setCart(updatedCart);
            showPopup('Item removed from cart');
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <div className="cart-container">
            <h1>My Cart</h1>
            {cart.length === 0 ? (
                <p>Your Cart is empty</p>
            ) : (
                <div className="cart-results">
                    {cart.map((item) => (
                        item.book && ( // Ensure item.book is not null
                            <div key={item._id} className="book-card">
                                {/* <img
                                    src="https://via.placeholder.com/150"
                                    alt={item.book.title}
                                /> */}
                                <div className="book-info auth-container">
                                    {/* <h3>{item.book.title}</h3> */}
                                    <p><strong>Title:</strong> {item.book.title}</p>
                                    <p><strong>Author:</strong> {item.book.author}</p>
                                    <p><strong>Category:</strong> {item.book.category}</p>
                                    <p><strong>Price:</strong> ${item.book.price}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartComponent;
