const express = require('express')
const app = express();
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;
const path = require('path');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0SECRET,
  baseURL: process.env.ENVIRONMENT === "dev" ? `http://localhost:${PORT}` : `https://neurotrack-63884f254468.herokuapp.com`,
  clientID: '5cO4WcJMs86IVjRYKhOfm35KlW0yJBdy',
  issuerBaseURL: 'https://dev-3-d1xtuk.eu.auth0.com',
};

app.use(auth(config));
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
    isAuthenticated: req.oidc.isAuthenticated()
  }
  res.render('index',data);
});

app.get('/dashboard', requiresAuth(), (req, res) => {
  const data = {
    user: req.oidc.user,
    isAuthenticated: req.oidc.isAuthenticated()
  }
  res.render('dashboard', data);
})

module.exports = app;