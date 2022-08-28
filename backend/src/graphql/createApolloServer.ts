import { ApolloServer } from "apollo-server-lambda";
import { makeExecutableSchema } from '@graphql-tools/schema'
import schema from "./typeDefs";

const createApolloServer = () => {
    const combinedSchema = makeExecutableSchema({
        typeDefs: schema,
        resolvers: {}, // Update this once made
        inheritResolversFromInterfaces: true,
    });

    return new ApolloServer({
        schema: combinedSchema,
    })
}

export default createApolloServer;