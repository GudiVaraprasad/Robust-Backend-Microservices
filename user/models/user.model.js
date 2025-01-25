// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the user model
const userSchema = new mongoose.Schema({
    // User's name, required field
    name: {
        type: String,
        required: true
    },
    // User's email, must be unique and required
    email: {
        type: String,
        unique: true,
        required: true,
    },
    // User's password, required field, not selected by default in queries
    password: {
        type: String,
        required: true,
        select: false,
    }
})

// Export the user model based on the userSchema
module.exports = mongoose.model('user', userSchema);