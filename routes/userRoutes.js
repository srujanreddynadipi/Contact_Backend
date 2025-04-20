const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');

const router = express.Router(); // Create a new router instance

router.post('/register',registerUser);

router.post('/login', loginUser);

router.get('/current', currentUser);


module.exports = router; // Export the router to be used in other files