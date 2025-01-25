// Import the express framework
const express = require('express');

// Import the express-http-proxy library
const expressProxy = require('express-http-proxy');

const app = express();

// Proxy requests to the user service
app.use('/user', expressProxy('http://localhost:3001'));

// Proxy requests to the captain service
app.use('/captain', expressProxy('http://localhost:3002'));

// Proxy requests to the ride service
app.use('/ride', expressProxy('http://localhost:3003'));

// Start the gateway server and listen on port 3000
app.listen(3000, () => {
    console.log('Gateway server listening on port 3000');
});