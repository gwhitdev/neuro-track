import express from 'express';
const api = express();
import crypto from 'crypto';
const {client} = await import('./database.js')
import {
  createRecord,
  getRecord,
  validateReqBodyUser
} from './helpers/helpers.js';

api.use(express.urlencoded({extended: true}));
api.use(express.json());

/**
 * GET API base path
 */
api.get('/', (req, res) => {
  console.log('API GET request received');
  res.send('hi API');
});

/**
 * GET records
 * Returns a single record with a valid query string or a set of records with a valid user sub
 */
api.get('/records', async (req, res) => {
  try {
    if (req.query.record) {
      const record = getRecord(req.query.record);
      res.status(200).json(
          {
            status: 'Success',
            msg: 'Record identified',
            record: record
          }
      )
    }
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
      res.status(200)
          .json(
              {
                status: 'Success',
                msg: 'Records identified',
                records: records
              }
          )
    }
  } catch(err) {
    console.error(err)
    res.status(500).json(
        {
          status: 'Error',
          msg: 'Could not identify records',
          error: err
        }
    )
  }
})

/**
  * CREATE record
  * Currently accepts user sub in request body
  */
api.post('/records', async (req, res) => {
  try {
    const validated = validateReqBodyUser(req.body.user);
    if (! validated) {
      console.error('Could not validate user')
      new Error("Could not validate user")
    }

    console.log('Trying to create a record for user:',req.body.user);
    const createdRecord = createRecord(req.body.user, crypto);
    const created = await client.hSet(`record:${num}`,createdRecord);
    console.log(created)

    res.status(201).json(
        {
          msg: "Record created",
          status: "Success",
          record: created
        }
    )
  } catch (err) {
    console.error(err);
    res.status(500).json(
        {
          msg: "Could not create record.",
          status: "Error"
        }
    )
  }
})

/**
 * UPDATE record
 */
// TODO

/**
 * DELETE record
 */
// TODO

export default api;