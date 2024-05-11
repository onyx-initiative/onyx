// All resolvers are imported here and combined into one object
import { mergeResolvers } from "@graphql-tools/merge";

import adminResolver from "./admin.resolver";
import employerResolver from "./employer.resolver";
import jobResolver from "./job.resolver";
import scholarResolver from "./scholar.resolver";
import viewResolver from "./view.resolver";
import analyticsResolver from "./analytics.resolver";

const resolvers = mergeResolvers([
    adminResolver,
    employerResolver,
    jobResolver,
    scholarResolver,
    viewResolver,
    analyticsResolver
])

export default resolvers;

