// Import the http module
const http = require('http');

// Import the express app
const app = require('./app');

// Create an HTTP server using the express app
const server = http.createServer(app);

// Start the server and listen on port 3002
server.listen(3002, () => {
    console.log('captain service is running on port 3002');
});