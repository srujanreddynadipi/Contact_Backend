const asyncHandler = require('express-async-handler');
const User = require('../models/userModel'); // importing the user model
const bcrypt = require('bcrypt'); // for hashing passwords

//@desc regisger a user
//@route post /api/users/register
//@access public
const registerUser = asyncHandler(async  (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    // hash password
    const hashPassword = await bcrypt.hash(password ,10);
    console.log("hashed password is ", hashPassword);
    //new user
    const user = await User.create({
        userName,  // Match the case with your request
        email,
        password: hashPassword,
    });
    
    console.log("the user is ", user);
    // check if user is created
    if (user) {
        res.status(201).json({
            userName: user.userName,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc login a user
//@route post /api/users/login
//@access public
const loginUser = asyncHandler(async  (req, res) => {
    res.status(201).json({ message: 'login here' });
});

//@desc current use info
//@route get /api/users/current
//@access private
const currentUser = asyncHandler(async  (req, res) => {
    res.status(201).json({ message: 'current user information' });
});


module.exports = {
    registerUser,
    loginUser,
    currentUser,
};