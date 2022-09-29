// import { ApolloServer } from "apollo-server-express"; // may need to switch to lambda for production    
import { ApolloServer } from "apollo-server-lambda"; // may need to switch to lambda for production    
import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from "./typeDefs";
import client from "../database";
import resolvers from "./resolvers";
import dotenv from 'dotenv';

// To diagnose problems: npx diagnose-endpoint@1.1.0 --endpoint=http://localhost:4000/graphql

const createApolloServer = () => {
    dotenv.config();
    const combinedSchema = makeExecutableSchema({
        typeDefs: typeDefs,
        resolvers: resolvers,
        inheritResolversFromInterfaces: true,
    });

    return new ApolloServer({
        introspection: process.env.NODE_ENV !== "production",
        schema: combinedSchema,
        csrfPrevention: true,
        dataSources: () => {
            return {
                db: client,
            };
        },
        // For some reason, this doesn't work with the tests
        context: ({ event, context, express }: any) => ({
            headers: event.headers,
            requestContext: event.requestContext || context,
            functionName: context.functionName,
            event,
            context,
            expressRequest: express.req
        }),
    })
}

export default createApolloServer;