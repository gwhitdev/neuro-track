const express = require('express');
const server = express();
const app = require('./app');
const api = require('./api');

server.use('/', app);
server.use('/api', api);

server.listen(3000, () => {
    console.log('Server is running and has made /api available for the API and / available for the app on port 3000');
});