// import { gql } from "apollo-server-express";
import { gql } from "apollo-server-lambda";


export const scholarTypeDef = gql`

    type Scholar {
        scholar_id: ID!
        name: String!
        email: String!
        jobApplications: String
        workHistory: [String]
        current: Boolean!
        profilePicture: String
        gradYear: String!
        school: String!
        major: String!
        city: String!
        province: String!
        registrationDate: String!
        skills: [String]
        notifications: Boolean!
    }

    type Query {
        getScholars: [Scholar!]!
        getScholar(scholar_id: ID!): Scholar!
        getScholarByFilter(column: String!, filter: String! ): [Scholar]!
    }

    type Mutation {
        createScholar(
            name: String!
            email: String!
            jobApplications: String
            workHistory: [String]
            current: Boolean!
            profilePicture: String
            gradYear: String!
            school: String!
            major: String!
            city: String!
            province: String!
            registrationDate: String!
            skills: [String]
            notifications: Boolean!
        ): Scholar!
        updateScholar(scholar_id: ID!, column: String!, new_value: String!): Scholar!
        archiveScholar(scholar_id: ID!): Boolean!
        deleteScholar(scholar_id: ID!): Boolean!
    }
`