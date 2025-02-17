E-Commerce Dashboard API

This is a backend API for an e-commerce application, built using Node.js, Express.js, and MongoDB. The API provides authentication, product management, and search functionality.

Features

User Registration & Login with JWT Authentication

Product Management (Add, Update, Delete, Search)

Middleware for Token Verification

Technologies Used

Node.js

Express.js

MongoDB (Mongoose)

JSON Web Token (JWT)

CORS

Dotenv

Installation

Clone the repository:

git clone https://github.com/your-repo.git

Navigate to the project directory:

cd e-commerce-api

Install dependencies:

npm install

Set up the environment variables in a .env file:

PORT=9000
JWT_KEY=e-comm
MONGO_URI=your-mongodb-connection-string

Usage

Start the server:

node app.js

The API will run on:

http://localhost:9000

API Endpoints

Authentication

POST /register - Register a new user

POST /login - Login user and get authentication token

Product Management

POST /add-product - Add a new product (Protected)

GET /product - Retrieve all products (Protected)

GET /product/:id - Retrieve a specific product (Protected)

PUT /product/:id - Update a product (Protected)

DELETE /product/:id - Delete a product (Protected)

Search

GET /search/:key - Search for products (Protected)

Middleware

verifyToken - Ensures valid JWT token is provided in headers

Folder Structure

project-root/
│── db/                # Database models
│── public/            # Static files
│── views/             # EJS templates
│── app.js             # Main server file
│── package.json       # Project metadata and dependencies
│── .env               # Environment variables

License

This project is open-source and available under the MIT License.

