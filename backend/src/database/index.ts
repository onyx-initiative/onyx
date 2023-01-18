const { Pool, PoolConfig } = require("pg");
// This should be used locally
// const dotenv = require('dotenv').config().parsed;
const dotenv = require('dotenv')
const path = require('path');
const express = require('express');

// // Create an express app
const app = express();


/*
* connection to the DB
* All CRUD operations are done through this connection
*/

const client = new Pool({
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.PROD_HOST as string,
    // host: 'localhost',
    port: 5432,
});

export default client;


