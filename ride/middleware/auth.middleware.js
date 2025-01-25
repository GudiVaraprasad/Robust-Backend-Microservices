// Import required libraries
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Middleware to authenticate user
module.exports.userAuth = async (req, res, next) => {
    try {
        // Retrieve token from cookies or authorization header
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Verify the token using JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user profile from the user service
        const response = await axios.get(`${process.env.BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // Extract user data from the response
        const user = response.data;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach user data to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        // Handle errors and send a 500 response with the error message
        res.status(500).json({ message: error.message });
    }
}

// Middleware to authenticate captain
module.exports.captainAuth = async (req, res, next) => {
    try {
        // Retrieve token from cookies or authorization header
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Verify the token using JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch captain profile from the captain service
        const response = await axios.get(`${process.env.BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // Extract captain data from the response
        const captain = response.data;

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach captain data to the request object
        req.captain = captain;

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        // Handle errors and send a 500 response with the error message
        res.status(500).json({ message: error.message });
    }
}