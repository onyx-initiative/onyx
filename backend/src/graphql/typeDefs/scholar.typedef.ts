// import { gql } from "apollo-server-express";
import { gql } from "apollo-server-lambda";


export const scholarTypeDef = gql`

    enum Status {
        current
        alumni
    }

    type Scholar {
        scholar_id: ID!
        name: String!
        email: String!
        year: Int!
        school: String!
        major: String!
        status: Status!
        notifications: Boolean!
    }

    type Query {
        getScholars: [Scholar!]!
        getScholar(scholar_id: ID!): Scholar!
        checkViews(scholar_id: ID!, view_id: ID!): [Scholar]!
    }

    type Mutation {
        createScholar(
            name: String!
            email: String!
            year: Int!
            school: String!
            major: String!
            status: Status!
            notifications: Boolean!
        ): Scholar!
        updateScholar(scholar_id: ID!, column: String!, new_value: String!): Scholar!
        addToFavourites(scholar_id: ID!, job_id: ID!): Boolean!
        removeFromFavourites(scholar_id: ID!, job_id: ID!): Boolean!
        archiveScholar(scholar_id: ID!): Boolean!
        deleteScholar(scholar_id: ID!): Boolean!
    }
`