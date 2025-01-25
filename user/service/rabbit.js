// Import the amqplib library for RabbitMQ
const amqp = require('amqplib');

// Get the RabbitMQ URL from environment variables
const RABBITMQ_URL = process.env.RABBIT_URL;

let connection, channel;

// Function to establish a connection to RabbitMQ and create a channel
async function connect() {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
}

// Function to subscribe to a queue and consume messages
async function subscribeToQueue(queueName, callback) {
    if (!channel) await connect(); // Ensure connection and channel are established
    await channel.assertQueue(queueName); // Assert that the queue exists
    channel.consume(queueName, (message) => {
        callback(message.content.toString()); // Process the message
        channel.ack(message); // Acknowledge the message
    });
}

// Function to publish a message to a queue
async function publishToQueue(queueName, data) {
    if (!channel) await connect(); // Ensure connection and channel are established
    await channel.assertQueue(queueName); // Assert that the queue exists
    channel.sendToQueue(queueName, Buffer.from(data)); // Send the message to the queue
}

// Export the functions for use in other modules
module.exports = {
    subscribeToQueue,
    publishToQueue,
    connect,
};
