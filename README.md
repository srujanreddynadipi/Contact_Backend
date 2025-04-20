# Contact_Backend
# Contact Management API

A RESTful API built with Node.js and Express for managing contacts with user authentication.

## Features

- User authentication (Register/Login)
- JWT token-based authorization
- CRUD operations for contacts
- Private routes protection
- MongoDB integration
- Error handling middleware

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt for password hashing

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/current` - Get current user info (Protected)

### Contacts
- `GET /api/contacts` - Get all contacts (Protected)
- `POST /api/contacts` - Create new contact (Protected)
- `GET /api/contacts/:id` - Get contact by ID (Protected)
- `PUT /api/contacts/:id` - Update contact (Protected)
- `DELETE /api/contacts/:id` - Delete contact (Protected)

## Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=5000
CONNECTION_STRING=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/contact-backend.git
```

2. Install dependencies
```bash
cd contact-backend
npm install
```

3. Start the server
```bash
npm run dev
```

## API Usage

### Register User
```http
POST /api/users/register
Content-Type: application/json

{
    "userName": "john_doe",
    "email": "john@example.com",
    "password": "password123"
}
```

### Login User
```http
POST /api/users/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

### Create Contact
```http
POST /api/contacts
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "1234567890"
}
```

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Authorization errors
- Not found errors
- Server errors

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected routes
- User-specific contact access

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
