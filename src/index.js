const express = require('express');
const port = 4000;
const app = express();

app.get('/', (req, res) => {
    res.send('<h1> hi dev! </h1>');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
