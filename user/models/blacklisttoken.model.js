// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the blacklist token
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true // Token is required
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set default value to current date and time
        expires: 3600 // Document will expire after 1 hour (3600 seconds)
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

// Export the model based on the schema
module.exports = mongoose.model('blacklisttoken', blacklistTokenSchema);