Bookstore Application
Welcome to the Bookstore Application README! This document provides an overview of the application, its features, how to set it up locally, and additional information that users and developers might find useful.


Introduction
The Bookstore Application is a web-based platform designed to manage books, user accounts, and shopping carts for a bookstore. It allows users to browse books, add them to their cart, and checkout securely. Admin users have additional capabilities such as adding, updating, and deleting books.

Features

User Features:
Browse books by category and author.
Add books to the cart.
View and update the cart.
View order details.


Admin Features:
CRD operations on books (Create, Read, Delete).

Getting Started
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js installed (version 12 or higher)
MongoDB installed and running locally or accessible remotely (use my atlas credential , i have provided)
npm or yarn package manager


Installation
Download the zip file in your local (for frontend files)
 https://github.com/satyajitrakhunde1/Bookstore_frontend

cd Bookstore

Install dependencies:
npm install

.env file .I already provided in code . use as it is 
REACT_APP_API_BASE_URL=http://localhost:5000


Start the development server:

npm start


Access the application:
Open your browser and navigate to http://localhost:3000 to use the application.or once you started the development server you will redirected automatically


Usage
To use the Bookstore Application:

Register or log in as a user to browse books, add them to your cart, and checkout.
Log in as an admin to perform CRUD operations on books.


Folder Structure
The project structure is organized as follows:

bookstore-app/
├── public/
├── src/
|  |____components
|       |_(contains all the components)
|       |
│       ├── App.js
│       ├── index.js
│       └── ...
├── .env
├── package.json
└── README.md


public/: Static assets and index.html.
src/: Source code directory containing React components, pages, services, and configuration.
.env: Environment variables file.
package.json: Project dependencies and scripts.


API Documentation
For detailed API documentation, refer to the backend repository or server documentation. The API endpoints handle user authentication, book management, and checkout processes.

Technologies Used

Frontend:
React.js
context (for state management)
React Router dom (for routing)
fetch (for HTTP requests)



Backend:
Node.js
Express.js
MongoDB (with Mongoose)
JSON Web Tokens (JWT) for authentication
















