// import { gql } from "apollo-server-express"
import { gql } from "apollo-server-lambda";


export const jobTypeDef = gql`

    enum JobType {
        FULL_TIME
        PART_TIME
        CONTRACT
        INTERNSHIP
    }

    enum jobCategory {
        SOFTWARE
        HARDWARE
        DESIGN
        MARKETING
        BUSINESS
        OTHER
    }

    enum ApplicationFormat {
        EMAIL
        LINK
        FORM
    }

    type Job {
        job_id: ID!
        employer_id: ID!
        added_by: ID!
        job_title: String!
        job_description: String!
        job_type: JobType!
        applicant_years: [Int!]!
        deadline: String!
        total_views: Int!
        tags: [String!]!
    }

    type Query {
        getJobs: [Job!]!
        getJobById(job_id: ID!): Job!
        getJobsByEmployerId(employer_id: ID!): [Job!]!
        getJobByFilter(column: String!, filter: String!): [Job!]!
    }

    type Return {
        message: String!
        job: Job!
    }

    type Mutation {
        createJob(
            job_id: ID!
            employer_id: ID!
            added_by: ID!
            job_title: String!
            job_description: String!
            job_type: JobType!
            applicant_years: [Int!]!
            deadline: String!
            total_views: Int!
            tags: [String!]!
        ): Job!
        archiveJob(job_id: ID!): Boolean!
        incrementViews(job_id: ID!): Boolean!
        incrementApplications(job_id: ID!): Boolean!
        deleteJob(job_id: ID!): Boolean!
    }
`