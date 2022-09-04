import { gql } from "apollo-server-express";

export const adminTypeDef = gql`
    type Admin {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        getAdminByName(name: String!): Admin!
        getAdmins: [Admin!]!
    }

    type Mutation {
        createAdmin(
            name: String!
            email: String!
        ): Admin!
        updateAdmin(
            id: ID!
            name: String!
            email: String!
        ): Admin!
        removeAdmin(id: ID!): Boolean!
    }
`