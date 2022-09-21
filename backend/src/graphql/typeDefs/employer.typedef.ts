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
        job_id: ID!
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
        job_id: ID!
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
        employer_id: ID!
        job_id: [ID]
        name: String!
        logo: String
        city: String!
        province: String!
        website_url: String!
        description: String!
        videos: [String!]
    }

    type Query {
        getEmployerById(employer_id: ID!): Employer!
        getEmployerByName(name: String!): Employer!
        getEmployers: [Employer!]!
        getJobs: [Job!]!
    }

    type Mutation {
        createEmployer(
            name: String!
            logo: String
            email: String!
            city: String!
            province: String!
            website_url: String!
            description: String!
            videos: [String]
        ): Employer!
        removeEmployer(employer_id: ID!): Boolean!                                          
    }
`