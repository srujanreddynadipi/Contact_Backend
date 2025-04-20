const asyncHandler = require('express-async-handler');
const User = require('../models/userModel'); // importing the user model
const bcrypt = require('bcrypt'); // for hashing passwords
const jwt = require('jsonwebtoken'); // for generating JWT tokens

//@desc regisger a user
//@route post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
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
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashed password is ", hashPassword);
    //new user
    const user = await User.create({
        userName,
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
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const user = await User.findOne({ email }); // check if user exists
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }   
    // check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);    
    if (passwordIsCorrect) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user._id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // Increased to 15 minutes
        console.log("the access token is ", accessToken);
        res.status(200).json({accessToken});
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
    // Remove this unreachable code
    // res.status(201).json({ message: 'login here' });
});

//@desc current user info
//@route get /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    console.log("User in request:", req.user);
    res.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
};