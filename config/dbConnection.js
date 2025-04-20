const mongoose = require('mongoose');
require('colors'); // Ensure colors package is imported

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`MongoDB Connected: ${connect.connection.host}${connect.connection.name}`); // Fixed typo: conn -> connect
    } catch (err) {
        console.log(err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; // Exporting the connectDB function to be used in other files