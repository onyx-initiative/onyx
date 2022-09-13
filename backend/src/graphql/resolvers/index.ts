// All resolvers are imported here and combined into one object
import { mergeResolvers } from "@graphql-tools/merge";
import adminResolver from "./admin.resolver";

const resolvers = mergeResolvers([
    adminResolver,
])

export default resolvers;

