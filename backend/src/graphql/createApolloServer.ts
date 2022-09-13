import { ApolloServer } from "apollo-server-express"; // may need to switch to lambda for production    
import { makeExecutableSchema } from '@graphql-tools/schema'
import schema from "./typeDefs";
import client from "../database";
import adminResolver from "./resolvers/admin.resolver";

const createApolloServer = () => {
    const combinedSchema = makeExecutableSchema({
        typeDefs: schema,
        // resolvers: {}, // Update this once made
        resolvers: adminResolver,
        inheritResolversFromInterfaces: true,
    });

    return new ApolloServer({
        introspection: process.env.NODE_ENV !== "production",
        schema: combinedSchema,
        dataSources: () => client,
        context: ({ req, res }) => {
            return {
              req,
              res,
            };
        }
    })
}

export default createApolloServer;