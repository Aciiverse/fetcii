import express = require('express');

const   port    = 3000,
        app     = express(),
        router  = require('./router');

const serviceURL = `http://localhost:${port}/api`;

// Error handling
process.on('uncaughtException', (err) => {
    console.error(err);
});

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Dummy Test API started at ${serviceURL}`);
});