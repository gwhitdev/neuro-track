const express = require('express')
const app = express();
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

if (ENVIRONMENT === "dev") {
  app.listen(PORT, () => {
    console.log('APP is running on port ' + PORT);
  });
}


module.exports = app;