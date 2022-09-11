import { ApolloServer } from "apollo-server-express"; // may need to switch to lambda for production    
import { makeExecutableSchema } from '@graphql-tools/schema'
import schema from "./typeDefs";
import client from "../database";

export interface ApolloServerParams {
    // Update to be of the db type
    db: any;
}

const createApolloServer = ({ db }: ApolloServerParams) => {
    const combinedSchema = makeExecutableSchema({
        typeDefs: schema,
        resolvers: {}, // Update this once made
        inheritResolversFromInterfaces: true,
    });

    return new ApolloServer({
        schema: combinedSchema,
        dataSources: () => db,
    })
}

export default createApolloServer;