// Importing required models and libraries
const captainModel = require('../models/captain.model');
const blacklisttokenModel = require('../models/blacklisttoken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { subscribeToQueue } = require('../service/rabbit')

// Array to store pending requests
const pendingRequests = [];

// Register a new captain
module.exports.register = async (req, res) => {
    try {
        // Extracting name, email, and password from request body
        const { name, email, password } = req.body;

        // Check if captain already exists
        const captain = await captainModel.findOne({ email });
        if (captain) {
            return res.status(400).json({ message: 'captain already exists' });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Create a new captain instance
        const newcaptain = new captainModel({ name, email, password: hash });

        // Save the new captain to the database
        await newcaptain.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newcaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie
        res.cookie('token', token);

        // Send a success response
        res.status(201).json({ message: 'captain registered successfully' });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'Internal server error' });
    }
};