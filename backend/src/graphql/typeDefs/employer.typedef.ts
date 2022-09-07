import { gql } from "apollo-server-express";

export const employerTypeDef = gql`
    # Modularize Job TypeDef
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

    input JobInput {
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

    type Employer {
        id: ID!
        name: String!
        logo: String!
        city: String!
        province: String!
        websiteUrl: String!
        description: String!
        availableJobs: [Job]
        videos: [String!]
    }

    type Query {
        getEmployerById(id: ID!): Employer!
        getEmployerById(name: String!): Employer!
        getEmployers: [Employer!]!
    }

    type Mutation {
        createEmployer(
            name: String!
            logo: String!
            city: String!
            province: String!
            websiteUrl: String!
            description: String!
            availableJobs: [JobInput]
            videos: [String!]
        ): Employer!
        removeEmployer(id: ID!): Boolean!
        addJobToEmployer(id: ID!, job: JobInput!): Employer!
    }
`