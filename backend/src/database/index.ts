const { Client } = require("pg");

const client = new Client(process.env.DATABASE_URL);

// Include client.end() when used
const getDB = async () => {
    await client.connect();
    return client;
}