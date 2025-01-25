// Import the amqplib module for working with RabbitMQ
const amqp = require('amqplib');

// Get the RabbitMQ URL from environment variables
const RABBITMQ_URL = process.env.RABBIT_URL;

let connection, channel;

// Function to establish a connection to RabbitMQ
async function connect() {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
}

// Function to subscribe to a queue and process messages
async function subscribeToQueue(queueName, callback) {
    if (!channel) await connect();
    await channel.assertQueue(queueName);
    channel.consume(queueName, (message) => {
        callback(message.content.toString());
        channel.ack(message);
    });
}

// Function to publish messages to a queue
async function publishToQueue(queueName, data) {
    if (!channel) await connect();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(data));
}

// Export the functions to be used in other parts of the application
module.exports = {
    subscribeToQueue,
    publishToQueue,
    connect,
};
