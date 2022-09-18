import { gql } from "apollo-server-express";

export const scholarTypeDef = gql`
    enum Status {
        CURRENT,
        ALUMNI,
        NEW_GRADUATE,
        INTERN
    }

    union Update = String | Int | Boolean | Status

    type Scholar {
        scholar_id: ID!
        name: String!
        email: String!
        jobApplications: String
        workHistory: [String]
        status: Status!
        profilePicture: String
        year: String!
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
            status: Status!
            profilePicture: String
            year: String!
            school: String!
            major: String!
            city: String!
            province: String!
            registrationDate: String!
            skills: [String]
            notifications: Boolean!
        ): Scholar
        updateScholar(column: String!, new_value: Update!): Scholar
        archiveScholar(scholar_id: ID!): Scholar
    }
`