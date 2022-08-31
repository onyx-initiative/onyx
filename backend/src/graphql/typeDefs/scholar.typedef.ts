import { gql } from "apollo-server-express";

export const scholarTypeDef = gql`
    enum Status {
        CURRENT,
        ALUMNI,
        NEW_GRADUATE,
        INTERN
    }

    type View {
        id: ID!;
        viewName: String!;
        filters: [Filter!]!;
    }

    type Filter {
        id: ID!;
        industryFilter: String;
        provinceFilter: String;
        cityFilter: String;
        yearFilter: String;
        durationFilter: String;
    }

    type Scholar {
        id: ID!;
        name: String!;
        email: String!;
        jobApplications: String;
        workHistory?: [String];
        status: Status!; 
        views: [View]; 
        profilePicture: String;
        year: String!;
        school: String!;
        major: String!;
        city: String!;
        province: String!;
        registrationDate: String!;
        skills: [String];
        notifications: Boolean!;
    }

    type Query {
        getScholars: [Scholar!]!;
        getScholar(id: ID!): Scholar;
        getScholarByEmail(email: String!): Scholar!;
        getScholarByStatus(status: Status!): [Scholar!]!;
        getScholarByYear(year: String!): [Scholar!]!;
    }

    type Mutation {
        createScholar(
            name: String!
            email: String!
            jobApplications: String
            workHistory: [String]
            status: Status!
            views: [View]
            profilePicture: String
            year: String!
            school: String!
            major: String!
            city: String!
            province: String!
            registrationDate: String!
            skills: [String]
            notifications: Boolean!
        ): Scholar;
        updateScholar(
            id: ID!
            name: String
            email: String
            jobApplications: String
            workHistory: [String]
            status: Status
            views: [View]
            profilePicture: String
            year: String
            school: String
            major: String
            city: String
            province: String
            registrationDate: String
            skills: [String]
            notifications: Boolean
        ): Scholar;
    }
`