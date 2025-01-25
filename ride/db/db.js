// Import the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Function to connect to the MongoDB database
function connect() {
    // Connect to MongoDB using the connection string from environment variables
    mongoose.connect(process.env.MONGO_URL).then(() => {
        // Log a success message if the connection is successful
        console.log('ride service connected to MongoDB');
    }).catch(err => {
        // Log an error message if the connection fails
        console.log(err);
    });
}

// Export the connect function to be used in other parts of the application
module.exports = connect;