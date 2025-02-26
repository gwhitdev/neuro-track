const express = require('express')
const app = express();
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;

app.get('/', (req, res) => {
  console.log('APP GET request received');
  res.send('hi APP');
});

if (ENVIRONMENT === "dev") {
  app.listen(PORT, () => {
    console.log('APP is running on port ' + PORT);
  });
}


module.exports = app;