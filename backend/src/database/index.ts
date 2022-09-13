const { Pool } = require("pg");
import dotenv from 'dotenv';

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

export default client;