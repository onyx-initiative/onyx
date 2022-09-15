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
        job_id: ID!
        employer_id: Int!
        jobTitle: String!
        jobDescription: String!
        company: String! 
        city: String!
        province: String!
        jobSource: String! 
        totalViews: Int! 
        totalApplications: Int!
        jobType: JobType!
        jobCategory: jobCategory!
        jobSkills: [String!]!
        salaryRange: String! 
        jobLength: Int! 
        postDate: String! 
        applicationDeadline: String!
        contactEmail: String!
        feature: Boolean!
        additionalInstructions: String! 
        howToApply: ApplicationFormat!
        archived: Boolean!
    }

    type Query {
        getJobs: [Job!]!
        getJobById(job_id: ID!): Job!
        getJobsByEmployerId(employer_id: ID!): [Job!]!
        getJobByFilter(column: String!, filter: String! ): [Job!]!
        # Add more queries as they come up
    }

    type Return {
        message: String!
        job: Job!
    }

    type Mutation {
        createJob(
            jobTitle: String!
            employer_id: Int!
            jobDescription: String!
            company: String!
            city: String!
            province: String!
            jobSource: String!
            totalViews: Int!
            totalApplications: Int!
            jobType: JobType!
            jobCategory: jobCategory!
            jobSkills: [String!]!
            salaryRange: String!
            jobLength: Int!
            postDate: String!
            applicationDeadline: String!
            contactEmail: String!
            feature: Boolean!
            additionalInstructions: String!
            howToApply: ApplicationFormat!
        ): Job
        archiveJob(job_id: ID!): Boolean!
        incrementViews(job_id: ID!): Boolean!
        incrementApplications(job_id: ID!): Boolean!
    }
`