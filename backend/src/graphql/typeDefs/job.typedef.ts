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
        id: ID!
        jobTitle: String!
        jobDescription: String!
        company: String! 
        city: String!
        province: String!
        jobSource: String! 
        totalViews: Int! 
        totalApplications: Int!
        jobStatus: Boolean!
        jobType: JobType!
        jobCategory: jobCategory!
        jobSkills: [String!]!
        salaryRange: String! 
        jobLength: Int! 
        postDate: String! 
        applicationDeadline: String!
        description: String! 
        contactEmail: String!
        feature: Boolean!
        additionalInstructions: String! 
        howToApply: ApplicationFormat!
        archived: Boolean!
    }

    type Query {
        getJobs: [Job!]!
        getJobById(id: ID!): Job!
        getJobByCity(city: String!): [Job!]!
        getJobByProvince(province: String!): [Job!]!
        getJobByJobCategory(jobCategory: jobCategory!): [Job!]!
        getJobByJobType(jobType: JobType!): [Job!]!
        getJobByJobStatus(jobStatus: JobStatus!): [Job!]!

        # Add more queries as they come up
    }

    type Mutation {
        createJob(
            jobTitle: String!
            jobDescription: String!
            company: String!
            city: String!
            province: String!
            jobSource: String!
            totalViews: Int!
            totalApplications: Int!
            jobStatus: JobStatus!
            jobType: JobType!
            jobCategory: jobCategory!
            jobSkills: [String!]!
            salaryRange: String!
            jobLength: Int!
            postDate: String!
            applicationDeadline: String!
            description: String!
            contactEmail: String!
            feature: Boolean!
            additionalInstructions: String!
            howToApply: ApplicationFormat!
            archived: Boolean!
        ): Job!
        archiveJob(id: ID!): Job!
    }
`