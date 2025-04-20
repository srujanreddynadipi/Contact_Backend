const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email address'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema); // Exporting the Contact model to be used in other files
// This model is used to create and manage contacts in the MongoDB database