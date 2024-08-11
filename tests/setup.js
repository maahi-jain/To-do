// setup.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require('../app');

let mongoServer;

beforeAll(async () => {
    // Start in-memory MongoDB server
    console.log("executing setup.js")
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log("URI--", uri);

    // Check if mongoose is already connected
    if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect(); // Disconnect the current connection if active
    }

    // Connect to in-memory MongoDB
    await mongoose.connect(uri);
});

// Stop mongoose connection and stop mongoServer
afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
    console.log("connections closed");
});

module.exports = app;
