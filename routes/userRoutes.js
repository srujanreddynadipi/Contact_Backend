const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router(); // Create a new router instance

router.post('/register', registerUser);

router.post('/login', loginUser);

// Fix: validateToken middleware should be BEFORE currentUser handler
router.get('/current', validateToken, currentUser);

module.exports = router; // Export the router to be used in other files