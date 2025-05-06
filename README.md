# Express MongoDB Starter

This is a starter project for building RESTful APIs using **Express.js** and **MongoDB**. It includes basic CRUD operations for managing users and demonstrates best practices for structuring an Express application.

## Features

- **Express.js** for building the server.
- **MongoDB** with **Mongoose** for database operations.
- Centralized error handling with custom middleware.
- Reusable utility functions for validation and error creation.
- HTTP status codes defined as constants for better readability.
- Nodemon for development with automatic server restarts.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or in the cloud)

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:fayzullarakhmatullayev/express-mongodb-starter.git
   cd express-mongodb-starter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

## Usage

### Development Mode

Start the server with automatic restarts using Nodemon:

```bash
npm run dev
```

### Production Mode

Start the server in production mode:

```bash
npm start
```

The server will run on `http://localhost:8080` by default.

## API Endpoints

### Users

| Method | Endpoint     | Description         |
| ------ | ------------ | ------------------- |
| GET    | `/users`     | Get all users       |
| GET    | `/users/:id` | Get a user by ID    |
| POST   | `/users`     | Create a new user   |
| PUT    | `/users/:id` | Update a user by ID |
| DELETE | `/users/:id` | Delete a user by ID |

### Request Body for POST/PUT

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

## Project Structure

```
c:\Users\admin\Desktop\demo
├── app.js                  # Main application file
├── routes
│   └── user.routes.js      # User-related routes
├── models
│   └── user.model.js       # Mongoose schema for User
├── middleware
│   └── error.middleware.js # Centralized error handling
├── utils
│   ├── validateFields.js   # Utility for field validation
│   └── createError.js      # Utility for creating errors
├── constants
│   └── httpStatusCodes.js  # HTTP status code constants
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

## License

This project is licensed under the ISC License.
