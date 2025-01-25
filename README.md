# 🚀 Robust Backend Microservices

## 📖 Overview

This project is a robust backend system built with three microservices (User, Captain, Ride) using Express.js, all controlled by a Gateway proxy. Each microservice handles specific functionalities and communicates with each other through the Gateway, ensuring a scalable and maintainable architecture.

## ✨ Features

- 🧑‍✈️ **Captain Service**: Manages captain registration, authentication, and profile management.
- 🚗 **Ride Service**: Handles ride booking, tracking, and management.
- 👤 **User Service**: Manages user registration, authentication, and profile management.
- 🌐 **Gateway Proxy**: Acts as a single entry point for all microservices, routing requests to the appropriate service.

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for building the backend services.
- **Express.js**: Web framework for handling HTTP requests and responses.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for generating and verifying JWT tokens.
- **RabbitMQ**: Message broker for handling asynchronous tasks and help microservices communicate.

## 📂 Project Structure

```plaintext
/Robust-Backend-Microservices/
├── captain
│   ├── controllers
│   ├── db/db.js
│   ├── middleware/authMiddleWare.js
│   ├── models
│   ├── routes
│   ├── service/rabbit.js
│   ├── app.js
│   └── server.js
├── gateway
│   └── app.js
├── ride
│   ├── controllers
│   ├── db/db.js
│   ├── middleware/authMiddleWare.js
│   ├── models
│   ├── routes
│   ├── service/rabbit.js
│   ├── app.js
│   └── server.js
├── user
│   ├── controllers
│   ├── db/db.js
│   ├── middleware/authMiddleWare.js
│   ├── models
│   ├── routes
│   ├── service/rabbit.js
│   ├── app.js
│   └── server.js
```

Each folder `/captain`,`/ride`,`/user` represents a microservice with its own controllers, models, routes, and services, ensuring a modular and organized codebase routed by `/gateway/app.js`