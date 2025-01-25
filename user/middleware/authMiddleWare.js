// Import required modules and models
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blacklisttokenModel = require('../models/blacklisttoken.model');

// Middleware to authenticate user
module.exports.userAuth = async (req, res, next) => {
    try {
        // Get token from cookies or authorization header
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check if token is blacklisted
        const isBlacklisted = await blacklisttokenModel.find({ token });

        if (isBlacklisted.length) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify token and decode user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to next middleware or route handler
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}