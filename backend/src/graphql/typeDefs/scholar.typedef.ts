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

    type Job {
        job_id: ID!
        employer_id: ID!
        admin_id: ID!
        title: String!
        description: String!
        long_description: String
        contact_email: String
        job_type: String!
        term: String!
        location: String!
        applicant_year: [Int!]!
        deadline: String!
        date_posted: String!
        total_views: Int!
        tags: [String!]!
        link: String!
    }

    type Recommendation {
        scholar: String!
        email: String!
        scholar_id: ID!
        view_name: String!
        employer: String!
        title: String!
        description: String!
        job_type: String!
        location: String!
        deadline: String!
        link: String!
    }

    type Query {
        getScholars: [Scholar!]!
        getScholar(scholar_id: ID!): Scholar!
        getScholarByEmail(email: String!): Scholar
        checkViews(scholar_id: ID!, view_id: ID!): [Scholar]!
        getRecommendedJobs: [Recommendation]!
        getBookmarkedJobs(scholar_id: ID!): [Job]!
        checkBookmark(job_id: ID!, email: String!): Boolean
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
        bookmarkJob(email: String!, job_id: ID!): Boolean
    }
`