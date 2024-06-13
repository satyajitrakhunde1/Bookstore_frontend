

import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';

const AdminBookManagement = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        category: '',
        description: '',
        price: ''
    });
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/books', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleAddBook = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(newBook)
            });
            if (!response.ok) {
                throw new Error('Failed to add book');
            }
            const data = await response.json();
            setBooks([...books, data]);
            setNewBook({
                title: '',
                author: '',
                category: '',
                description: '',
                price: ''
            });
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/books/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete book');
            }
            setBooks(books.filter(book => book._id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div>
            <h1>Admin Book Management</h1>
            <form  className='auth-container' onSubmit={(e) => { e.preventDefault(); handleAddBook(); }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newBook.category}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newBook.description}
                    onChange={handleInputChange}
                    required
                ></textarea>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newBook.price}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Book</button>
            </form>
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        <strong>{book.title}</strong> by {book.author} - {book.price}
                        <button  onClick={() => handleDeleteBook(book._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminBookManagement;
