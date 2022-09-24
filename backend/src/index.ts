// Everything runs throught this file

// External Imports
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import serverless from 'serverless-http';
import { createHttpTerminator } from 'http-terminator';

// Internal Imports
import createApolloServer from './graphql/createApolloServer';
import { CORS_CONFIG } from './lib/config';

// const createHandler = (event: any, context: any) => {

//     const apolloServer = createApolloServer();

//     const handler = apolloServer.createHandler({
//         expressAppFromMiddleware(middleware) {
//             const app = express();
//             dotenv.config()
//             const port = process.env.PORT || 8000;

//             app.use(cors());
//             app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }))

//             app.use(json({ limit: "16mb" }));

//             app.get('/', (_, res) => {
//                 res.send('Hello, Onyx!');
//             });

//             app.get('/healthcheck', (_, res) => {
//                 res.status(200).send('Server is healthy!');
//             });

//             app.listen(port, () => {
//                 // Added try catch block to handle errors on server start   
//                 try {
//                     const path = apolloServer.graphqlPath;
//                     console.log(`Onyx jobs API is running at http://localhost:4000${apolloServer.graphqlPath}.`);
//                 } catch (err) {
//                     console.error('Error starting server:', err);
//                 }
//             });
            
//             return app;
//         },
//         expressGetMiddlewareOptions: {
//             cors: CORS_CONFIG,
//             path: "/graphql"
//         }
//     });
//     if(event !== undefined && typeof(event) === 'string') {
//             event = {
//             requestContext: context
//         }
//     }
    
    
//     return handler(
//         event,
//         context,
//         (err) => {
//             console.log(err);
//         }
//     );
// }

// export const handler = createHandler;

/*
    Made for running locally
*/

const main = async () => {
    // Configure Express server
    const app = express();
    dotenv.config()
    const port = process.env.PORT || 8000;

    // Adding CORS to allow cross-origin requests
    // ie. running backend and frontend on the same machine
    app.use(cors());
    app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }))

    app.use(json({ limit: "16mb" }));

    // Express server endpoints
    app.get('/', (_, res) => {
        res.send('Hello, Onyx!');
    });

    app.get('/healthcheck', (_, res) => {
        res.status(200).send('Server is healthy!');
    });

    app.listen(port, () => {
        // Added try catch block to handle errors on server start
        try {
            const path = apolloServer.graphqlPath;
            console.log(`Onyx jobs API is running at http://localhost:4000${apolloServer.graphqlPath}.`);
        } catch (err) {
            console.error('Error starting server:', err);
        }
    });

    const httpServer = http.createServer(app);
    const httpTerminator = createHttpTerminator({ server: httpServer });

    // Create Apollo Server with the connection to the db
    const apolloServer = createApolloServer();

    // Start Apollo Server
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        // Adds CORS to stop errors when running frontend and backend on the same machine   
        cors: CORS_CONFIG,
        path: "/graphql"
      });
}

// Runs the server with a catch block to handle errors

void main().catch(async err => {
    console.error('Error starting server:', err);
    await createApolloServer().stop();
});
