const express = require('express');
const server = express();
const app = require('./app');
const api = require('./api');
const PORT = 3000 || process.env.port;


server.use('/', app);
server.use('/api', api);

server.listen(PORT, () => {
    console.log('Server is running and has made /api available for the API and / available for the app on port' + PORT);
});