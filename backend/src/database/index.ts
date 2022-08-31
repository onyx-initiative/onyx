const { Pool } = require("pg");

/*
* connection to the DB
* All CRUD operations are done through this connection
*/
const getDB = () => {
    const client = new Pool({
        user: "postgres",
        password: process.env.DB_PASSWORD,
        database: "onyx_jobs",
        host: process.env.DEV_HOST,
        port: process.env.PORT,
    })
    return client;
}

export default getDB;