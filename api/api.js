import express from 'express';
import { urlencoded, json } from "express";
const api = express();
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;
const {client} = await import('./database.js')
api.use(express.urlencoded({extended: true}));
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

const recordNumber = Math.floor(Math.random()*100);
const date = new Date();
const humanDate = date.toDateString();
function createRecord(sub) {

  client.hSet(`record:${recordNumber}`,{
    user: sub,
    indicatorType: "memory",
    date: `${humanDate}`,
    notes: "This is a space to put some notes"
  })
}

api.get('/records', async (req, res) => {
  const records = await client.ft.search('usrname',req.query.usr);
  if (records) {
    const data = [
          {
            records,
            recordNumber
          }
        ]
        res.json(data)
  }
})

api.post('/record', (req, res) => {
  createRecord(req.body.user);
  console.log(req.body.user)
  res.json(
      {"body": req.body.user}
  )
})

export default api;