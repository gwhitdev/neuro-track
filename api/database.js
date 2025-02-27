import { createClient } from 'redis';

const client = createClient({
    username: process.env.REDIS_USR,
    password: process.env.REDIS_PWD,
    socket: {
        host: 'redis-15680.c338.eu-west-2-1.ec2.redns.redis-cloud.com',
        port: 15680
    }
});
await client.connect();
client.on('error', err => console.error('Redis client error', err));

export { client };