const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

const app = express();  // making an object of express into app

const port = process.env.PORT || 5000;  // this used to run the server on port 5001 or 5000

app.use(express.json());  // this is used to parse the json data in the request body
app.use('/api/contacts', require('./routes/contactRoutes'));  // this is the middleware for the server
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // running the server on the port 
});

