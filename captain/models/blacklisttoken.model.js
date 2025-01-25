// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for blacklisted tokens
const blacklistTokenSchema = new mongoose.Schema({
    // Token field which is required
    token: {
        type: String,
        required: true
    },
    // createdAt field to store the creation date and set expiration time
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Token expires after 1 hour (3600 seconds)
    }
}, {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
})

// Export the model based on the schema
module.exports = mongoose.model('blacklisttoken', blacklistTokenSchema);