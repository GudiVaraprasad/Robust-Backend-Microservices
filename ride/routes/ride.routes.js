// Import necessary modules
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const rideController = require('../controller/ride.controller')

// Define route for creating a ride
// This route requires user authentication
router.post('/create-ride', authMiddleware.userAuth, rideController.createRide)

// Define route for accepting a ride
// This route requires captain authentication
router.put('/accept-ride', authMiddleware.captainAuth, rideController.acceptRide)

// Export the router to be used in other parts of the application
module.exports = router;