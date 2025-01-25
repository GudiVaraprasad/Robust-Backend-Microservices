// Load environment variables from .env file
const dotenv = require('dotenv')
dotenv.config()

// Import express framework
const express = require('express')
const app = express()

// Connect to the database
const connect = require('./db/db')
connect()

// Import user routes
const userRoutes = require('./routes/user.routes')

// Import cookie parser middleware
const cookieParser = require('cookie-parser')

// Import and connect to RabbitMQ service
const rabbitMq = require('./service/rabbit')
rabbitMq.connect()

// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware to parse cookies
app.use(cookieParser())

// Use user routes for the root path
app.use('/', userRoutes)

// Export the app module
module.exports = app