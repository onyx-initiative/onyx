// import { gql } from "apollo-server-express";
import { gql } from "apollo-server-lambda";
import { scholarTypeDef } from "./scholar.typedef";
import { adminTypeDef } from "./admin.typedef";
import { jobTypeDef } from "./job.typedef";
import { employerTypeDef } from "./employer.typedef";
import { viewTypeDef } from "./view.typedef";
import { analyticsTypeDefs } from "./analytics.typedef";

const baseSchema = gql`
  """
  The queries available in this schema
  """
  type Query {
    healthCheck: Boolean!
  }
  """
  The mutation operations available in this schema
  """
  type Mutation {
    setHealth: Boolean!
  }
`;

const typeDefs = [
    baseSchema,
    scholarTypeDef,
    adminTypeDef,
    jobTypeDef,
    employerTypeDef,
    viewTypeDef,
    analyticsTypeDefs
]


export default typeDefs;