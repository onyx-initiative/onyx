import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import { createHttpTerminator } from 'http-terminator';
const path = require('path');
const hubspot = require('@hubspot/api-client');
const bodyParser = require('body-parser');
const axios = require('axios');

// Internal Imports
import createApolloServer from './graphql/createApolloServer';
import { CORS_CONFIG } from './lib/config';
import { hubspotInfo } from './serverlessAuth';

// Constants
const OBJECTS_LIMIT = 30;

// Made for running locally

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
    app.get('/test', (_, res) => {
        res.send('Hello, Onyx!');
    });

    app.get('/healthcheck', (_, res) => {
        res.status(200).send('Server is healthy!');
    });

    /*
      Authentication with hubspot
      docs: https://legacydocs.hubspot.com/docs/methods/oauth2/oauth2-quickstart
      sample: https://github.com/HubSpot/sample-apps-oauth/blob/main/node/src/index.js

      @todo:
      When implementing this on the frontend, we'll need to have /callback
      return true or false depending on if the user is authenticated
    */
    // Initialize the hubspot client
    const hubspotClient = new hubspot.Client();
    
    // Views only used for testing & development 
    // @todo: Implement landing page on frontend
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    type TokenStore = {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        tokenType: string;
        scope?: string;
        createdAt?: number;
        updatedAt: number;
        email?: string;
    }

    let tokenStore: TokenStore | null = null;

    // Check if the user is currently authenticated
    const isAuthorized = () => {   
        return tokenStore && tokenStore.accessToken;
    }

    // Check if the users session has expired
    const isTokenExpired = () => {
        if (tokenStore) {
            return Date.now() >= tokenStore.updatedAt + tokenStore.expiresIn * 1000;
        }
      };

    // Refresh the users access token
    const refreshToken = async () => {
        // If there's no token store, we can't refresh
        if (!tokenStore) return;

        // Refresh the access token
        const result = await hubspotClient.oauth.tokensApi.createToken(
            'refresh_token',
            undefined,
            undefined,
            process.env.HUBSPOT_CLIENT_ID,
            process.env.HUBSPOT_CLIENT_SECRET,
            tokenStore.refreshToken
        );
        tokenStore = {
            ...result,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        // console.log('Updated tokens', tokenStore);
        
        if (tokenStore) {
            // Update the access token
            hubspotClient.setAccessToken(tokenStore.accessToken);
        } else {
            console.error('No token store');
        }
    };

    app.use(
        bodyParser.urlencoded({
          limit: '50mb',
          extended: true,
        })
      );
    
    // @todo: Finalize this function to allow for auth
    app.get('/', async (req, res) => {
        try {
            if (!isAuthorized()) return res.render('login');
            if (isTokenExpired()) await refreshToken();
        
            // Add a check to see if they've made a profile in the db
            // @todo: grab profile info to check if they're in the db and
            // help them with prefilling the form
            console.log('User is authorized')
            console.log(tokenStore)
            res.render('index');
        } catch (e) {
            console.error(e);
            res.redirect('/error');
        }
    });

    app.use('/oauth', async (req, res) => {
        // Use the client to get authorization Url
        // https://www.npmjs.com/package/@hubspot/api-client#obtain-your-authorization-url
        console.log('Creating authorization Url');
        const authorizationUrl = hubspotClient.oauth.getAuthorizationUrl(
            hubspotInfo.HUBSPOT_CLIENT_ID,
            hubspotInfo.REDIRECT_URI,
            hubspotInfo.SCOPES
        );
        // console.log('Authorization Url', authorizationUrl);
      
        res.redirect(authorizationUrl);
        return;
    });

    app.use('/callback', async (req, res) => {
        const code: string = req.query.code as string;

        // Error if no code is provided
        if (!code) {
            res.render('error', { error: 'No code provided' });
            return;
        }

        if (isTokenExpired()) await refreshToken();
        // Create OAuth 2.0 Access Token and Refresh Tokens
        // POST /oauth/v1/token
        // https://developers.hubspot.com/docs/api/working-with-oauth
        if (isAuthorized()) {
            res.redirect('/');
            return;
        }
        const getTokensResponse = await hubspotClient.oauth.tokensApi.createToken(
          'authorization_code',
          code,
          hubspotInfo.REDIRECT_URI,
          hubspotInfo.HUBSPOT_CLIENT_ID,
          hubspotInfo.HUBSPOT_CLIENT_SECRET
        );
        // console.log('Retrieving access token result:', getTokensResponse);
      
        tokenStore = {
            ...getTokensResponse,
            updatedAt: Date.now(),
        };

        // @todo: Check that they're an onyx scholar
        const infoUrl = `https://api.hubapi.com/oauth/v1/access-tokens/${tokenStore?.accessToken}`;
        const info = await axios.get(infoUrl, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        });
        const email = info.data.user;
      
        // Set token for the
        // https://www.npmjs.com/package/@hubspot/api-client
        if (tokenStore) {
            hubspotClient.setAccessToken(tokenStore.accessToken);
            tokenStore.email = email;
            res.redirect('/');
            return tokenStore;
        } else {
            // This should redirect to an error page
            console.error('No token store');
            return;
        }
    });

    app.get('/refresh', async (req, res) => {
        try {
            if (isAuthorized()) await refreshToken();
            res.redirect('/oauth');
        } catch (e) {
            console.error(e);
            res.redirect('/error');
        }
    });

    app.get('/logout', async (req, res) => {
        try {
            if (isAuthorized()) {
                // Revoke the access token
                // https://developers.hubspot.com/docs/api/working-with-oauth#revoke-an-access-token
                await hubspotClient.oauth.tokensApi.revokeToken(
                    tokenStore?.accessToken,
                    hubspotInfo.HUBSPOT_CLIENT_ID,
                    hubspotInfo.HUBSPOT_CLIENT_SECRET
                );
                tokenStore = null;
            }
            res.redirect('/');
        } catch (e) {
            console.error(e);
            res.redirect('/error');
        }
    });

    app.get('/error', (req, res) => {
        return { error: 'Error' };
    });
    /*
      End of authentication with hubspot
    */

    app.listen(port, () => {
        // Added try catch block to handle errors on server start
        try {
            const path = apolloServer.graphqlPath;
            console.log(`Onyx jobs API is running at http://localhost:4000${apolloServer.graphqlPath}.`);
            console.log(`Onyx jobs server is running at http://localhost:4000/oauth`);
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
