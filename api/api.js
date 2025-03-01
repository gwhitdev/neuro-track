import express from 'express';
const api = express();
import crypto from 'crypto';
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

const recordNumber = (usr,date) => crypto.createHash('sha256').update(`${usr}${date}${Math.random()*1000}`).digest('base64');
const date = new Date();
const humanDate = date.toDateString();

async function createRecord(sub) {

  const num = recordNumber(sub,humanDate);
  console.log('record number: ', num)
  return await client.hSet(`record:${num}`,{
    user: sub,
    indicatorType: "memory",
    date: `${humanDate}`,
    notes: "This is a space to put some notes",
    timestamp: Date.now()
  })
}

api.get('/records', async (req, res) => {
  try {
    console.log('Searching for records for user: ', req.query.usr);
    const records = await client.ft.search('index_with_timestamp',req.query.usr,{
      SORTBY: {
        BY: 'timestamp',
        DIRECTION: 'ASC'
      },
      LIMIT: {
        from:0, size:100
      }
    });
    if (records) {
      const data = [
        {
          records
        }
      ]
      res.json(data)
    }
  } catch(err) {
    console.error(err)
  }

})

api.post('/record', async (req, res) => {
try {
  console.log('Trying to create a record for user:',req.body.user);

 const created = await createRecord(req.body.user);
 console.log(created)
} catch (err) {
  console.error(err);
}
  res.json(
      {"body": req.body.user}
  )
})

export default api;