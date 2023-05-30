// import { gql } from "apollo-server-express"
import { gql } from "apollo-server-lambda";


export const jobTypeDef = gql`

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
        admin_id: ID!
        title: String!
        description: String!
        long_description: String
        requirements: String
        experience: String
        education: String
        how_to_apply: String
        additional_info: String
        employer_industries: String!
        job_function: String!
        contact_email: String
        job_type: String!
        term: String!
        location: String!
        applicant_year: [Int!]!
        deadline: String!
        date_posted: String!
        total_views: Int!
        tags: [String!]!
        live: Boolean!
        link: String!
    }

    input BatchJob {
        employer_name: String!
        title: String!
        description: String!
        long_description: String
        requirements: String
        experience: String
        education: String
        how_to_apply: String
        additional_info: String
        employer_industries: String!
        job_function: String!
        contact_email: String
        job_type: String!
        term: String!
        location: String!
        applicant_year: [Int!]!
        deadline: String!
        tags: [String!]!
        link: String!
    }

    type JobSearch {
        job_id: ID!
        name: String!
        employer_id: ID!
        admin_id: ID!
        title: String!
        description: String!
        long_description: String
        requirements: String
        experience: String
        education: String
        how_to_apply: String
        additional_info: String
        employer_industries: String!
        job_function: String!
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

    input JobTypeFilterInput {
        full_time: Boolean!
        part_time: Boolean!
        internship: Boolean!
        new_grad: Boolean!
    }


    input JobFilterInput {
        location: String!
        job_type: JobTypeFilterInput!
        applicant_year: [Int]!
        sort: String!
        tags: [String]!
    }

    type Query {
        getJobs: [Job!]!
        getJobsAdmin(active: Boolean!, live: Boolean!): [Job!]!
        getJobById(job_id: ID!): Job!
        getJobsByEmployerId(employer_id: ID!): [Job!]!
        getFeaturedJobs: [Job!]!
        searchJobs(search: String!): [JobSearch!]!
        getNewJobs: [Job!]!
        getFavourites(scholar_id: ID!): [Job!]!
        getFilteredJobs(filter: JobFilterInput!): [Job]!
    }

    type Return {
        message: String!
        job: Job!
    }

    type Mutation {
        createJob(
            employer_id: ID!
            admin_id: ID!
            title: String!
            description: String!
            long_description: String
            requirements: String
            experience: String
            education: String
            how_to_apply: String
            additional_info: String
            employer_industries: String!
            job_function: String!

            contact_email: String
            job_type: String!
            term: String!
            location: String!
            applicant_year: [Int!]!
            deadline: String!
            tags: [String!]!
            live: Boolean!
            link: String!
        ): Boolean!
        batchCreateJobs(
            admin_id: ID!
            jobs: [BatchJob!]!
        ): Boolean!
        archiveJob(job_id: ID!): Boolean!
        incrementViews(job_id: ID!): Boolean!
        incrementApplications(job_id: ID!): Boolean!
        deleteJob(job_id: ID!): Boolean!
        addToFeatured(job_ids: [ID!]!): Boolean!
        removeFromFeatured(job_id: ID!): Boolean!
        setLive(job_id: ID!): Boolean!
        makePrivate(job_id: ID!): Boolean!
    }
`