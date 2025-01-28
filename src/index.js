const express = require('express');
const mongoose = require('mongoose');

const port = 4000;
const app = express();

const mongoURI = 'mongodb://root:example@mongodb:27017';
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Failed to connect to DB:", err)); // Fixed error logging

app.get('/', (req, res) => {
    res.send('<h1>Hi Dev!</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
