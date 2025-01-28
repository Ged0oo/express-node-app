const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const port = 4000;
const app = express();

const redisHost = 'redis';
const redisPort = 6379;
const redisClient = redis.createClient({
	url: `redis://${redisHost}:${redisPort}`
});
redisClient.on('error', (err) => console.log("Failed to connect to Redis:", err));
redisClient.on('connect', ()  => console.log("Connected to Redis."));
redisClient.connect();

const mongoHost = 'mongodb';
const mongoPort = 27017; 
const mongoUname  = 'root';
const mongoPasswd = 'example';
const mongoURI = `mongodb://${mongoUname}:${mongoPasswd}@${mongoHost}:${mongoPort}`;
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB:", err));

app.get('/', (req, res) => {
    redisClient.set('Products', 'Mobile Phones ..');
    res.send('<h1>Hi Dev!</h1>');
});

app.get('/data', async (req, res) => {
    const products = await redisClient.get('Products'); 
    res.send(`<h1>Hi Dev!</h1> <h2>Hi Dev! This is a ${products}</h2>`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
