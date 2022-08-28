import { gql } from "apollo-server-express";

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
]


export default schema;