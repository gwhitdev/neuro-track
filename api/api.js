const express = require('express')
const api = express();

api.get('/', (req, res) => {
  console.log('API GET request received');
  res.send('hi API');
});

module.exports = api;