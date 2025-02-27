import express from 'express';
import { urlencoded, json } from "express";
const api = express();
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;
const {result, client} = await import('./database.js')
api.use(urlencoded({extended: true}));
api.use(express.json());

api.get('/', (req, res) => {
  console.log('API GET request received');
  res.send('hi API');
});

api.get('/test-redis', (req, res) => {
  res.json({
    path: '/api/test-redis',
    result: result
  })
})

export default api;