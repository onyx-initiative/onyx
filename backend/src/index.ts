// Everything runs throught this file

// External Imports
import express from 'express';
import cors from 'cors';

// Internal Imports
import createApolloServer from './graphql/createApolloServer';

const app = express();
app.use(cors());