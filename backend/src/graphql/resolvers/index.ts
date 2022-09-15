// All resolvers are imported here and combined into one object
import { mergeResolvers } from "@graphql-tools/merge";

import adminResolver from "./admin.resolver";
import employerResolver from "./employer.resolver";
import jobResolver from "./job.resolver";

const resolvers = mergeResolvers([
    adminResolver,
    employerResolver,
    jobResolver
])

export default resolvers;

