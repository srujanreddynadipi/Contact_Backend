const asyncHandler = require('express-async-handler'); // to handle async errors
const Contact = require('../models/contactModel'); // importing the contact model


//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id:req.user.id}); // Fetch all contacts from the database
    res.status(200).json(contacts);
});




//@desc Create new  contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res, next) => {
    console.log("the request body is ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        const error = new Error('Please add all fields');
        res.status(400);
        next(error);
        return;
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id, // Associate the contact with the logged-in user
    });
    res.status(201).json(contact);
});


//@desc Get contacts
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id); // Fetch contact by ID from the database
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id); // Fetch contact by ID from the database
    if (!contacts) {
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contacts.user_id.toString() !== req.user.id) { // Check if the logged-in user is the owner of the contact
        res.status(403); // Forbidden
        throw new Error('You are not authorized to update this contact');
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, {
        new: true,
    }); // Update the contact with the new data

    res.status(200).json(updatedContact); // Send the updated contact as a response
});


//@desc Delete contacts
//@route Delete /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id); // Fetch contact by ID from the database
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contacts.user_id.toString() !== req.user.id) { // Check if the logged-in user is the owner of the contact
        res.status(403); // Forbidden
        throw new Error('You are not authorized to update this contact');
    }
    
    await Contact.findByIdAndDelete(req.params.id);// Correctly delete the specific contact
    res.status(200).json({ message: `Contact with id ${req.params.id} deleted successfully` });
});



module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }; // exporting the getContact and createContact functions to be used in other files