import { gql } from "apollo-server-express";

export const employerTypeDef = gql`
    # Modularize Job TypeDef
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
    }

    type Employer {
        id: number;
        name: String!;
        logo: String!;
        city: String!;
        province: String!;
        websiteUrl: String!;
        description: String!;
        availableJobs: [Job!]!;

        // P1+
        videos: [String!];
    }

    type Query {
        getEmployerById(id: ID!): Employer!;
        getEmployerById(name: String!): Employer!;
        getEmployers: [Employer!]!;
    }
    type Mutation {
        createEmployer(
            name: String!
            logo: String!
            city: String!
            province: String!
            websiteUrl: String!
            description: String!
            availableJobs: [Job!]!
            videos: [String!]
        ): Employer!;
        removeEmployer(id: ID!): Boolean!;
    }
`