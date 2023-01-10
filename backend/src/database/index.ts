const { Pool, PoolConfig } = require("pg");
const dotenv = require('dotenv').config().parsed;
const path = require('path');


/*
* connection to the DB
* All CRUD operations are done through this connection
*/
const host = dotenv.NODE_ENV === "production" ? dotenv.PROD_HOST : "localhost";
const password = dotenv.NODE_ENV === "production" ? dotenv.DB_PASSWORD : dotenv.DEV_PASSWORD;

const client = new Pool({
    user: dotenv.DB_USER as string,
    password: password as string,
    database: dotenv.PROD_DB_NAME as string,
    host: host as string,
    port: dotenv.DB_PORT as number,
});

export default client;
