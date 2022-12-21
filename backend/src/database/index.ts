const { Pool, PoolConfig } = require("pg");
require('dotenv').config();
import serverlessInfo from "../serverlessAuth";

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
//     await db.query('SET search_path TO onyx;')
//     const resp = await db.query(`SELECT * FROM Scholar`);
//     db.release()
//     console.log(`DB connection successful with ${db.database} on ${db.host}`);
//     console.log(resp);
//     return resp;
// }

// void testCall();
