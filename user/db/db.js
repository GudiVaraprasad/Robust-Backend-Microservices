// Import mongoose for MongoDB connection
const mongoose = require('mongoose');

// Function to connect to MongoDB
function connect() {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        // Log success message if connection is successful
        console.log('User service connected to MongoDB');
    }).catch(err => {
        // Log error message if connection fails
        console.log(err);
    });
}

// Export the connect function
module.exports = connect;