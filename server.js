/**
* This file should run in Production only
**/

import express from 'express';
const server = express();
import app from './app/app.js';
import api from './api/api.js';
const PORT = process.env.PORT;

// Runs the API and APP apps on the same server
server.use('/', app);
server.use('/api', api);

// Listens on .env PORT or one provided by Heroku's process.env.PORT
server.listen(PORT, () => {
    console.log('Server is running and has made /api available for the API and / available for the app on port ' + PORT);
});