// Import required modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleWare');

// Define user registration route
router.post('/register', userController.register);

// Define user login route
router.post('/login', userController.login);

// Define user logout route
router.get('/logout', userController.logout);

// Define user profile route, protected by authentication middleware
router.get('/profile', authMiddleware.userAuth, userController.profile);

// Define accepted ride route, protected by authentication middleware
router.get('/accepted-ride', authMiddleware.userAuth, userController.acceptedRide);

// Export the router to be used in other parts of the application
module.exports = router;