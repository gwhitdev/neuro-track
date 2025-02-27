import { createClient } from 'redis';

const client = createClient({
    username: process.env.REDIS_USR,// || 'neurotrack_app_api_dev',
    password: process.env.REDIS_PWD,// || 'CariadWren2028!',
    socket: {
        host: 'redis-15680.c338.eu-west-2-1.ec2.redns.redis-cloud.com',
        port: 15680
    }
});

client.on('error', err => console.error('Redis client error', err));

await client.connect();
await client.set('foo','bar');
const result = await client.get('foo');

export { client, result };