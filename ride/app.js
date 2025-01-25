// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Import and initialize Express application
const express = require('express');
const app = express();

// Connect to the database
const connect = require('./db/db');
connect();

// Middleware for parsing cookies
const cookieParser = require('cookie-parser');

// Import routes and services
const rideRoutes = require('./routes/ride.routes');
const rabbitMq = require('./service/rabbit')

// Connect to RabbitMQ
rabbitMq.connect();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use('/', rideRoutes);

// Export the app module
module.exports = app;