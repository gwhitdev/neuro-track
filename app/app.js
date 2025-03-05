import express from 'express';
const app = express();
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import {auth} from 'express-openid-connect';
import pkg from 'express-openid-connect';
const {requiresAuth} = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0SECRET,
  baseURL: process.env.ENVIRONMENT === "dev" ? `http://localhost:${PORT}` : `https://neurotrack-63884f254468.herokuapp.com`,
  clientID: '5cO4WcJMs86IVjRYKhOfm35KlW0yJBdy',
  issuerBaseURL: 'https://dev-3-d1xtuk.eu.auth0.com'
};

app.use(auth(config));

app.use('/assets', express.static(path.join(__dirname,'/public/assets')));
app.use('/assets/js', express.static(path.join(__dirname, '/src')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

app.get('/callback', (req, res) => {
  res.redirect('/dashboard');
})

app.get('/dashboard', requiresAuth(), (req, res) => {
  const data = {
    user: req.oidc.user,
    isAuthenticated: req.oidc.isAuthenticated()
  }
  res.render('dashboard', data);
})

app.get('/create-note', requiresAuth(), (req, res) => {
  const data =  {
    user: req.oidc.user,
    isAuthenticated: req.oidc.isAuthenticated()
  }
  res.render('create-note', data)
})

export default app;