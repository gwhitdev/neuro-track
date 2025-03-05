async function getRecord(query) {
    const record = await client.ft.search('index_with_timestamp', recordQueryString);
    if (record) {
        return record;
    } else {
        throw new Error(`Could not get record ${query}`);
    }
}

async function createRecord(sub, crypto) {
    const recordNumber = (usr,date) => crypto.createHash('sha256').update(`${usr}${date}${Math.random()*1000}`).digest('base64');
    const date = new Date();
    const humanDate = date.toDateString();
    const num = recordNumber(sub,humanDate);
    return {
        num,
        sub,
        indicatorType: "memory",
        date,
        notes: "This is a space to put some notes",
        timestamp: Date.now()
    }
    return await client.hSet(`record:${num}`,{
        user: sub,
        indicatorType: "memory",
        date: `${humanDate}`,
        notes: "This is a space to put some notes",
        timestamp: Date.now()
    })
}

function validateReqBodyUser(req) {
    return typeof req.body.user !== 'number';
}

export {
    createRecord,
    getRecord,
    validateReqBodyUser
}

