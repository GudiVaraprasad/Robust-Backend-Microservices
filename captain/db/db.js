/**
 * Connects to the MongoDB database using the connection string provided in the environment variable `MONGO_URL`.
 * Logs a success message upon successful connection, or logs an error if the connection fails.
 *
 * @function
 */
const mongoose = require('mongoose');
function connect() {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('captain service connected to MongoDB');
    }).catch(err => {
        console.log(err);
    });
}
module.exports = connect;