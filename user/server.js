// Import the http module to create an HTTP server
const http = require('http');

// Import the Express application from the app module
const app = require('./app');

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Start the server and listen on port 3001
server.listen(3001, () => {
    console.log('User service is running on port 3001');
});