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
    }

    type Query {
        getScholars: [Scholar!]!
        getScholar(scholar_id: ID!): Scholar!
        getScholarByFilter(column: String!, filter: String! ): [Scholar]!
    }

    type Mutation {
        createScholar(
            scholar_id: ID!
            name: String!
            email: String!
            year: Int!
            school: String!
            major: String!
            status: Status!
        ): Scholar!
        updateScholar(scholar_id: ID!, column: String!, new_value: String!): Scholar!
        archiveScholar(scholar_id: ID!): Boolean!
        deleteScholar(scholar_id: ID!): Boolean!
    }
`