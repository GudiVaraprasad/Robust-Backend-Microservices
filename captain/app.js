// Load environment variables from a .env file
const dotenv = require('dotenv');
dotenv.config();

// Import the express framework
const express = require('express');
const app = express();

// Import and connect to the database
const connect = require('./db/db');
connect();

// Import routes for the captain service
const captainRoutes = require('./routes/captain.routes');

// Import cookie-parser middleware
const cookieParser = require('cookie-parser');

// Import and connect to RabbitMQ
const rabbitMq = require('./service/rabbit');
rabbitMq.connect();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Use captain routes for the root path
app.use('/', captainRoutes);

// Export the app module
module.exports = app;