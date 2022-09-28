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

const createHandler = (event: any, context: any, callback: any) => {

    const apolloServer = createApolloServer();

    const handler = apolloServer.createHandler({
        expressAppFromMiddleware(middleware) {
            const app = express();
            dotenv.config()
            const port = process.env.PORT || 8000;

            app.use(cors(CORS_CONFIG));
            app.use(middleware);
            app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }))

            const httpServer = http.createServer(app);
            const httpTerminator = createHttpTerminator({ server: httpServer });


            app.use(json({ limit: "16mb" }));

            app.get('/', cors(), (_, res) => {
                res.send('Hello, Onyx!');
            });

            app.get('/healthcheck', cors(), (_, res) => {
                res.status(200).send('Server is healthy!');
            });

            // app.listen(port, () => {
            //     // Added try catch block to handle errors on server start   
            //     try {
            //         console.log(`Onyx jobs API is running at http://localhost:4000${apolloServer.graphqlPath}.`);
            //     } catch (err) {
            //         console.error('Error starting server: ', err);
            //     }
            // });
            
            return app;
        },
        expressGetMiddlewareOptions: {
            cors: CORS_CONFIG,
            path: "/" 
        }
    });
    if (!event.requestContext || event === '') {
        event.requestContext = context;
    }
    return handler(event, context, callback);
    
}

export const handler = createHandler;