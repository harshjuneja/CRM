# Mini CRM Application

A full-stack Customer Relationship Management (CRM) application built with React.js and Node.js.

## Features

- User authentication (register/login)
- Customer management (CRUD operations)
- Dashboard with customer statistics
- Search and filter customers
- Responsive Material-UI design

## Tech Stack

### Frontend

- React.js
- Redux Toolkit for state management
- Material-UI for components
- Axios for API calls
- React Router for navigation

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:

```bash
git clone <your-repository-url>
cd crm
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crm_db
JWT_SECRET=your_jwt_secret
```

5. Start MongoDB service on your machine

6. Start the backend server:

```bash
cd backend
npm run dev
```

7. Start the frontend development server:

```bash
cd frontend
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
crm/
├── frontend/               # React frontend application
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       ├── store/         # Redux store and slices
│       └── App.js         # Main application component
│
└── backend/               # Node.js backend application
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    └── server.js         # Entry point
```

## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Customers

- GET /api/customers - Get all customers
- POST /api/customers - Create a new customer
- GET /api/customers/:id - Get a customer
- PUT /api/customers/:id - Update a customer
- DELETE /api/customers/:id - Delete a customer

## License

MIT
