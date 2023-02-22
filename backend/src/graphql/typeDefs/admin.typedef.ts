// import { gql } from "apollo-server-express";
import { gql } from "apollo-server-lambda";

export const adminTypeDef = gql`
    type Admin {
        admin_id: ID!
        email: String!
        password: String!
    }

    type Query {
        getAdminByName(name: String!): Admin!
        getAdmins: [Admin!]!
        checkAllowedAdmin(email: String!): Boolean!
        verifyAdmin(email: String!, password: String!): Boolean!
        getAdminByEmail(email: String!): Admin!
    }

    type Mutation {
        createAdmin(
            email: String!
            password: String!
        ): Admin!
        updateAdmin(
            admin_id: ID!
            email: String!
        ): Boolean!
        # Might switch this to delete by name
        removeAdmin(admin_id: ID!): Boolean!
        addAllowedAdmin(admin_id: ID!, email: String!): Boolean!
    }
`