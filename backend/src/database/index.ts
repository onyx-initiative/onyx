const { Pool } = require("pg");
require('dotenv').config();
import serverlessInfo from "../../serverlessAuth";
// import dotenv from 'dotenv';
/*
* connection to the DB
* All CRUD operations are done through this connection
*/

const client = new Pool({
    user: serverlessInfo.DB_USER,
    password: serverlessInfo.DB_PASSWORD,
    database: serverlessInfo.PROD_DB_NAME,
    host: serverlessInfo.PROD_HOST,
    port: serverlessInfo.DB_PORT
});

export default client;

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
