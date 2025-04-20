const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();

connectDB();  // this is used to connect to the database
const app = express();  // making an object of express into app

const port = process.env.PORT || 5000;  // this used to run the server on port 5001 or 5000

app.use(express.json());  // this is used to parse the json data in the request body

const createContact = (req, res, next) => {
  if (!req.body.name) {
    const error = new Error('Name is required');
    res.status(400);
    return next(error); // Pass the error to the error handler
  }
  res.status(201).json({ message: 'Contact created' });
};

app.use('/api/contacts', require('./routes/contactRoutes'));  // this is the middleware for the server
app.use('/api/users', require('./routes/userRoutes'));  // this is the middleware for the server
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // running the server on the port 
});

