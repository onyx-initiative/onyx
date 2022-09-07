import { gql } from "apollo-server-express";
import { scholarTypeDef } from "./scholar.typedef";
import { adminTypeDef } from "./admin.typedef";
import { jobTypeDef } from "./job.typedef";
import { employerTypeDef } from "./employer.typedef";

// All typeDefs are imported here and combined into one object

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

const schema = [
    baseSchema,

    // Need to fix typeDefs

    scholarTypeDef,
    adminTypeDef,
    jobTypeDef,
    employerTypeDef
]


export default schema;