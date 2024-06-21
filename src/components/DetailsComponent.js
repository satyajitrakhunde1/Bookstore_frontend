import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailsComponent = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBookDetails(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div className="details-container ">
      {bookDetails ? (
        <div className="book-details ">
          <h2>{bookDetails.title}</h2>
          <p><strong>Author:</strong> {bookDetails.author}</p>
          <p><strong>Category:</strong> {bookDetails.category}</p>
          <p><strong>Price:</strong> ${bookDetails.price}</p>
          <p><strong>Quantity Available:</strong> {bookDetails.quantity}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsComponent;
