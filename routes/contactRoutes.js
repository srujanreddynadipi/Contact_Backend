const express = require('express');  // importing express
const router = express.Router();  // making an object of express into router
const {getContacts,getContact, createContact, updateContact, deleteContact} = require('../controllers/contactController');  // importing the getContact function from contactController
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken); // this make the all router private only logged in users can access the routes

router.route('/').get(getContacts);  // this is the middleware for the server

router.route('/').post(createContact);  

router.route('/:id').get(getContact); 

router.route('/:id').put(updateContact);  

router.route('/:id').delete(deleteContact);  

module.exports = router;  // exporting the router object to be used in other files