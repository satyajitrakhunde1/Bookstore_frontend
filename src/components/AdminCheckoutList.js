
import React, { useEffect, useState } from 'react';

const AdminCheckoutList = () => {
    const [checkoutList, setCheckoutList] = useState([]);

    useEffect(() => {
        const fetchCheckoutList = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/checkout');
                if (!response.ok) {
                    throw new Error('Failed to fetch checkout list');
                }
                const data = await response.json();
                setCheckoutList(data);
            } catch (error) {
                console.error('Error fetching checkout list:', error);
            }
        };

        fetchCheckoutList();
    }, []);

    // Ensure that checkoutList is an array before using map
    if (!Array.isArray(checkoutList)) {
        return <div>No checkout items found.</div>;
    }

    return (
        <div>
            <h1>Checkout List</h1>
            {checkoutList.length === 0 ? (
                <p>No checkout items available.</p>
            ) : (
                <ul>
                    {checkoutList.map((checkout) => (
                        <li key={checkout.id}>
                            <p>User: {checkout.user}</p>
                            <p>Book: {checkout.book}</p>
                            <p>Date: {checkout.date}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminCheckoutList;

