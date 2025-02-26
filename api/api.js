const express = require('express')
const api = express();
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;

api.get('/', (req, res) => {
  console.log('API GET request received');
  res.send('hi API');
});

if (ENVIRONMENT === "dev") {
  api.listen(PORT, () => {
    console.log('API is running on port ' + PORT);
  });
}

module.exports = api;