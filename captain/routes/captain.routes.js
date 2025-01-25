// Import required modules
const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Define routes for captain-related operations

// Route for captain registration
router.post('/register', captainController.register);

// Route for captain login
router.post('/login', captainController.login);

// Route for captain logout
router.get('/logout', captainController.logout);

// Route to get captain profile, protected by authentication middleware
router.get('/profile', authMiddleware.captainAuth, captainController.profile);

// Route to toggle captain availability, protected by authentication middleware
router.patch('/toggle-availability', authMiddleware.captainAuth, captainController.toggleAvailability);

// Route to wait for a new ride, protected by authentication middleware
router.get('/new-ride', authMiddleware.captainAuth, captainController.waitForNewRide);

// Export the router to be used in other parts of the application
module.exports = router;