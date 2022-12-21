// import { gql } from "apollo-server-express";
import { gql } from "apollo-server-lambda";


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

    input JobInput {
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

    type Employer {
        employer_id: ID!
        added_by: ID!
        name: String!
        contect_email: String!
        address: String!
        website_url: String!
        description: String!
    }

    type Query {
        getEmployerById(employer_id: ID!): Employer!
        getEmployerByName(name: String!): Employer!
        getEmployers: [Employer!]!
        getJobs: [Job!]!
    }

    type Mutation {
        createEmployer(
            employer_id: ID!
            added_by: ID!
            name: String!
            contect_email: String!
            address: String!
            website_url: String!
            description: String!
        ): Employer!
        removeEmployer(employer_id: ID!): Boolean!                                          
    }
`