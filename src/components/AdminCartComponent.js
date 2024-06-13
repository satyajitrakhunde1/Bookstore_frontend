// import React, { useEffect, useState } from 'react';

// const AdminCartComponent = () => {
//     const [cartList, setCartList] = useState([]);

//     useEffect(() => {
//         const fetchCartList = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/cart');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch cart list');
//                 }
//                 const data = await response.json();
//                 setCartList(data);
//             } catch (error) {
//                 console.error('Error fetching cart list:', error);
//             }
//         };

//         fetchCartList();
//     }, []);

//     return (
//         <div>
//             <h2>All Users' Cart Items</h2>
//             {cartList.length === 0 ? (
//                 <p>No cart items available.</p>
//             ) : (
//                 <ul>
//                     {cartList.map((cartItem) => (
//                         <li key={cartItem._id}>
//                             <strong>User:</strong> {cartItem.user.email} <br />
//                             <strong>Book:</strong> {cartItem.book.title} <br />
//                             <strong>Quantity:</strong> {cartItem.quantity}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default AdminCartComponent;






// AdminCartComponent.js

import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

const AdminCartComponent = () => {
    const { user } = useContext(UserContext);
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchCartList();
        }
    }, [user]); // Fetch cart list when user or role changes

    const fetchCartList = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/', {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjkxZmEzZTcyOGJiYzBlZWZjNTM0ZiIsImlhdCI6MTcxODI2MDkxOCwiZXhwIjoxNzIwODUyOTE4fQ.jIy3JlpMTh1rW50o06Ta00VSV_848gJlHCf80j6hq9E`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cart list');
            }
            const data = await response.json();
            setCartList(data);
        } catch (error) {
            console.error('Error fetching cart list:', error);
        }
    };

    return (
        <div>
            <h2>All Users' Cart Items (Admin View)</h2>
            {cartList.length === 0 ? (
                <p>No cart items available.</p>
            ) : (
                <ul>
                    {cartList.map((cartItem) => (
                        <li key={cartItem._id}>
                            <strong>User:</strong> {cartItem.user} <br />
                            {cartItem.book ? (
                                <div>
                                    <strong>Book:</strong> {cartItem.book.title} <br />
                                    <strong>Author:</strong> {cartItem.book.author} <br />
                                    <strong>Category:</strong> {cartItem.book.category} <br />
                                    <strong>Price:</strong> ${cartItem.book.price.toFixed(2)} <br />
                                    <strong>Quantity:</strong> {cartItem.quantity}
                                </div>
                            ) : (
                                <p>No book information available.</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminCartComponent;
