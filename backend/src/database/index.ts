const { Client } = require("pg");

const client = new Client(process.env.DATABASE_URL);

// Include client.end() when used
const getDB = () => {
    // Add: await client.connect();
    // and client.end() when used
    return client;
}