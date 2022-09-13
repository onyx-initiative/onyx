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
        ): Boolean!
        updateAdmin(
            id: ID!
            name: String!
            email: String!
        ): Boolean!
        # Might switch this to delete by name
        removeAdmin(id: ID!): Boolean!
    }
`