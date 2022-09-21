import { gql } from "apollo-server-express"

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
        job_id: ID! #
        employer_id: Int! #
        job_title: String! #
        description: String! #
        company: String! #
        city: String!#
        province: String!#
        job_source: String! #
        total_views: Int! #
        total_applications: Int!#
        job_type: JobType! #
        job_category: jobCategory! #
        job_skills: [String!]! #
        applicant_year: [String!]! #
        salary_range: String! #
        job_length: Int! 
        post_date: String! 
        application_deadline: String!
        contact_email: String!
        feature: Boolean!
        additional_instructions: String! 
        how_to_apply: ApplicationFormat!
        archived: Boolean!
    }

    type Query {
        getJobs: [Job!]!
        getJobById(job_id: ID!): Job!
        getJobsByEmployerId(employer_id: ID!): [Job!]!
        getJobByFilter(column: String!, filter: String! ): [Job!]!
    }

    type Return {
        message: String!
        job: Job!
    }

    type Mutation {
        createJob(
            employer_id: Int! #
            job_title: String! #
            description: String! #
            company: String! #
            city: String!#
            province: String!#
            job_source: String! #
            total_views: Int! #
            total_applications: Int!#
            job_type: JobType! #
            job_category: jobCategory! #
            job_skills: [String!]! #
            applicant_year: [String!]! #
            salary_range: String! #
            job_length: Int! 
            post_date: String! 
            application_deadline: String!
            contact_email: String!
            feature: Boolean!
            additional_instructions: String! 
            how_to_apply: ApplicationFormat!
            archived: Boolean!
        ): Job!
        archiveJob(job_id: ID!): Boolean!
        incrementViews(job_id: ID!): Boolean!
        incrementApplications(job_id: ID!): Boolean!
        deleteJob(job_id: ID!): Boolean!
    }
`