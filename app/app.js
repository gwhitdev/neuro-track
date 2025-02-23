const express = require('express')
const app = express();

app.get('/', (req, res) => {
  console.log('APP GET request received');
  res.send('hi APP');
});


module.exports = app;