const { Pool, PoolConfig } = require("pg");
// This should be used locally

// env file not working with serverless, temp fix
import cred from "./db";

/*
* connection to the DB
* All CRUD operations are done through this connection
*/

const client = new Pool({
    user: cred.DB_USER as string,
    database: cred.DB_NAME as string,
    password: cred.DB_PASSWORD as string,
    host: cred.PROD_HOST as string,
    port: cred.DB_PORT as number,
});

export default client;