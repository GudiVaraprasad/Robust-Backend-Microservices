// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for user (captain)
const userSchema = new mongoose.Schema({
    // Name field which is required
    name: {
        type: String,
        required: true
    },
    // Email field which is unique and required
    email: {
        type: String,
        unique: true,
        required: true,
    },
    // Password field which is required and not selected by default
    password: {
        type: String,
        required: true,
        select: false,
    },
    // isAvailable field to indicate availability status
    isAvailable: {
        type: Boolean,
        default: false
    },
})

// Export the model based on the schema
module.exports = mongoose.model('captain', userSchema);