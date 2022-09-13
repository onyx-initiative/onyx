const { Pool } = require("pg");
// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();

/*
* connection to the DB
* All CRUD operations are done through this connection
*/

const client = new Pool({
    user: "mdawes",
    password: process.env.DB_PASSWORD,
    database: "onyx_jobs",
    host: process.env.DEV_HOST,
    port: process.env.DB_PORT,
});

// For testing during develpoement

// const testCall = async () => {
//     const db = await client.connect();
//     const resp = await db.query(`SELECT * FROM admin WHERE name = $1`, ["Michael Dawes"]);
//     db.release()
//     console.log(`DB connection successful with ${db.database} on ${db.host}`);
//     console.log(resp.rows);
//     return resp;
// }

// void testCall();

export default client;