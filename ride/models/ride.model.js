// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for a ride
const rideSchema = new mongoose.Schema({
    // Reference to the captain (optional)
    captain: {
        type: mongoose.Schema.Types.ObjectId,
    },
    // Reference to the user (required)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    // Pickup location (required)
    pickup: {
        type: String,
        required: true
    },
    // Destination location (required)
    destination: {
        type: String,
        required: true
    },
    // Status of the ride with default value 'requested'
    status: {
        type: String,
        enum: ['requested', 'accepted', 'started', 'completed'],
        default: 'requested'
    },
}, {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
});

// Export the ride model
module.exports = mongoose.model('ride', rideSchema);