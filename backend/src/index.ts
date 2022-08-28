// Everything runs throught this file

// External Imports
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import { json } from 'body-parser';
import { createHttpTerminator } from 'http-terminator';

// Internal Imports
import createApolloServer from './graphql/createApolloServer';
import { CORS_CONFIG } from './lib/config';


const main = async () => {
    // Configure Express server
    const app = express();
    const port = process.env.PORT || 4000;

    // Adding CORS to allow cross-origin requests
    // ie. running backend and frontend on the same machine
    app.use(cors());
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(json({ limit: "16mb" }));

    // Express server endpoints
    app.get('/', (_, res) => {
        res.send('Hello, Onyx!');
    });

    app.get('/healthcheck', (_, res) => {
        res.status(200).send('Server is healthy!');
    });

    app.listen(port, () => {
        console.log(`Onyx jobs API is running on ${port}.`);
      });

    const httpServer = http.createServer(app);
    const httpTerminator = createHttpTerminator({ server: httpServer });

    // Create Apollo Server
    const apolloServer = createApolloServer();

    // Start Apollo Server
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: CORS_CONFIG,
      });
}

// Runs the server
void main().catch(async err => {
    console.error('Error starting server:', err);
    await createApolloServer().stop();
});

