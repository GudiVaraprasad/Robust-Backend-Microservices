const captainModel = require('../models/captain.model');
const blacklisttokenModel = require('../models/blacklisttoken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const captain = await captainModel.findOne({ email });

        if (captain) {
            return res.status(400).json({
                message: `captain ${captain.captainname || captain.email || captain.id} already exists`,
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const newcaptain = new captainModel({ name, email, password: hash });

        await newcaptain.save();

        const token = jwt.sign({ id: newcaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token);
        delete captain._doc.password;

        res.send({ token, newcaptain });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find captain by email and include the password field for validation
        const captain = await captainModel
            .findOne({ email })
            .select('+password');

        if (!captain) {
            return res.status(400).json({ message: `captain with email ${email} not found` });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, captain.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        delete captain._doc.password;

        // Set the JWT as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        // Respond with success message and token (if required)
        return res.status(200).json({
            message: `captain ${captain.captainname || captain.email} logged in successfully`,
            token, // Optionally include the token
            captain,
        });

    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({ message: error.message });
    }
};

module.exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklisttokenModel.create({ token });
        res.clearCookie('token');
        res.send({ message: `captain ${captain.captainname || captain.email || captain.id} logged out successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.profile = async (req, res) => {
    try {
        res.send(req.captain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.toggleAvailability = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain._id);
        captain.isAvailable = !captain.isAvailable;
        await captain.save();
        res.send({ message: `captain ${captain.captainname || captain.email || captain.id} availability status updated` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 