const express = require('express');
const redis = require('redis');
const os = require('os');

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

app.get('/', (req, res) => {
    redisClient.set('Products', 'Mobile Phones ..');
    console.log(`Traffic from ${os.hostname()}`);
    res.send('<h1>Hi Dev, This is Nagy!</h1> <h2>This is docker hub</h2>');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
