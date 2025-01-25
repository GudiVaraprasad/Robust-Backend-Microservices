// Import the ride model and RabbitMQ service functions
const rideModel = require('../models/ride.model');
const { subscribeToQueue, publishToQueue } = require('../service/rabbit')

// Controller function to create a new ride
module.exports.createRide = async (req, res, next) => {
    // Extract pickup and destination from request body
    const { pickup, destination } = req.body;

    // Create a new ride instance with user ID, pickup, and destination
    const newRide = new rideModel({
        user: req.user._id,
        pickup,
        destination
    })

    // Save the new ride to the database
    await newRide.save();

    // Publish the new ride to the "new-ride" queue
    publishToQueue("new-ride", JSON.stringify(newRide))

    // Send the new ride as a response
    res.send(newRide);
}

// Controller function to accept a ride
module.exports.acceptRide = async (req, res, next) => {
    // Extract ride ID from request query
    const { rideId } = req.query;

    // Find the ride by ID
    const ride = await rideModel.findById(rideId);
    if (!ride) {
        // If ride not found, send a 404 response
        return res.status(404).json({ message: 'Ride not found' });
    }

    // Update the ride status to 'accepted'
    ride.status = 'accepted';

    // Save the updated ride to the database
    await ride.save();

    // Publish the accepted ride to the "ride-accepted" queue
    publishToQueue("ride-accepted", JSON.stringify(ride))

    // Send the accepted ride as a response
    res.send(ride);
}