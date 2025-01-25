// Importing required libraries and models
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const blacklisttokenModel = require('../models/blacklisttoken.model');

// Middleware function to authenticate captain
module.exports.captainAuth = async (req, res, next) => {
    try {
        // Extract token from cookies or authorization header
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        // If no token is found, return unauthorized response
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check if the token is blacklisted
        const isBlacklisted = await blacklisttokenModel.find({ token });

        // If token is blacklisted, return unauthorized response
        if (isBlacklisted.length) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the captain by ID from the decoded token
        const captain = await captainModel.findById(decoded.id);

        // If captain is not found, return unauthorized response
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach captain to request object
        req.captain = captain;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle any errors and return a server error response
        res.status(500).json({ message: error.message });
    }
}