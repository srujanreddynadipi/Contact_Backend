//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = (req, res) => {
    res.status(200).json({ message: 'get all the contacts  ' });
};
//@desc Create new  contacts
//@route POST /api/contacts
//@access public

const createContact = (req, res, next) => {
    console.log("the request body is ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        const error = new Error('Please add all fields');
        res.status(400);
        next(error);
        return;
    }
    res.status(201).json({ message: 'Create contacts' });
};


//@desc Get contacts
//@route GET /api/contacts/:id
//@access public

const getContact = (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id} ` });
};

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access public

const updateContact = (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id} ` });
};
//@desc Delete contacts
//@route Delete /api/contacts/:id
//@access public

const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id} ` });
};



module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }; // exporting the getContact and createContact functions to be used in other files