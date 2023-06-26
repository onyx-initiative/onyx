import { gql } from '@apollo/client'

//@todo: Change fields based on needs

export const GET_FEATURED_JOBS = gql`
    query GetFeaturedJobs {
        getFeaturedJobs {
            job_id
            employer_id
            admin_id
            title
            description
            long_description
            requirements
            experience
            education
            how_to_apply
            additional_info
            contact_email
            job_type
            term
            location
            applicant_year
            deadline
            date_posted
            total_views
            tags
            link
            live
        }
    }
`

export const GET_JOB_BY_FILTER = gql`
    query GetJobByFilter($column: String!, $filter: String!) {
        getJobByFilter(column: $column, filter: $filter) {
            admin_id
            applicant_year
            contact_email
            deadline
            description
            employer_id
            job_type
            job_id
            location
            long_description
            tags
            term
            title
            total_views
            link
        }
    }
`

export const GET_JOB_BY_ID = gql`
    query GetJobById($jobId: ID!) {
        getJobById(job_id: $jobId) {
            job_id
            employer_id
            admin_id
            title
            description
            long_description
            requirements
            experience
            education
            how_to_apply
            additional_info
            contact_email
            job_type
            term
            location
            applicant_year
            deadline
            date_posted
            total_views
            tags
            link
            live
        }
    }
`

export const GET_JOBS = gql`
    query GetJobs {
        getJobs {
            job_id
            employer_id
            admin_id
            title
            description
            long_description
            requirements
            experience
            education
            how_to_apply
            additional_info
            contact_email
            job_type
            term
            location
            applicant_year
            deadline
            date_posted
            total_views
            tags
            link
            live
        }
    }
`

export const GET_JOBS_ADMIN = gql`
    query GetJobsAdmin($active: Boolean!, $live: Boolean!) {
        getJobsAdmin(active: $active, live: $live) {
            job_id
            employer_id
            admin_id
            title
            description
            long_description
            requirements
            experience
            education
            how_to_apply
            additional_info
            contact_email
            job_type
            term
            location
            applicant_year
            deadline
            date_posted
            total_views
            tags
            link
            live
        }
    }
`

export const GET_JOBS_BY_EMPLOYER_ID = gql`
    query GetJobsByEmployerId($employerId: ID!) {
        getJobsByEmployerId(employer_id: $employerId) {
            job_id
            employer_id
            admin_id
            title
            description
            long_description
            requirements
            experience
            education
            how_to_apply
            additional_info
            contact_email
            job_type
            term
            location
            applicant_year
            deadline
            date_posted
            total_views
            tags
            link
            live
        }
    }
`

export const GET_RELEVANT_JOBS = gql`
    query GetRelevantJobs($scholarId: ID!, $viewId: ID!) {
        getRelevantJobs(scholar_id: $scholarId, view_id: $viewId) {
            job_id
            employer_id
            title
            description
            long_description
            requirements
            experience
            education
            how_to_apply
            additional_info
            contact_email
            job_type
            term
            location
            applicant_year
            deadline
            date_posted
            total_views
            tags
            link
            live
        }
    }
`

export const SEARCH_JOBS = gql`
    query SearchJobs($search: String!) {
        searchJobs(search: $search) {
            job_id
            name
            employer_id
            admin_id
            title
            description
            long_description
            requirements
            experience
            education
            how_to_apply
            additional_info
            contact_email
            job_type
            term
            location
            applicant_year
            deadline
            date_posted
            total_views
            tags
            link
        }
    }
`

export const GET_NEW_JOBS = gql`
    query GetNewJobs {
        getNewJobs {
            job_id
            employer_id
            admin_id
            title
            description
            long_description
            requirements
            experience
            education
            how_to_apply
            additional_info
            contact_email
            job_type
            term
            location
            applicant_year
            deadline
            date_posted
            total_views
            tags
            link
            live
        }
    }
`

export const GET_FAVOURITES = gql`
    query GetFavourites($scholarId: ID!) {
        getFavourites(scholar_id: $scholarId) {
            job_id
            employer_id
            admin_id
            title
            description
            long_description
            requirements
            experience
            education
            how_to_apply
            additional_info
            contact_email
            job_type
            term
            location
            applicant_year
            deadline
            date_posted
            total_views
            tags
            link
        }
    }
`

export const GET_FILTERED_JOBS = gql`
    query GetFilteredJobs($filter: JobFilterInput!) {
        getFilteredJobs(filter: $filter) {
            job_id
            employer_id
            admin_id
            title
            description
            long_description
            requirements
            experience
            education
            how_to_apply
            additional_info
            contact_email
            job_type
            term
            location
            applicant_year
            deadline
            date_posted
            total_views
            tags
            link
            live
        }
    }
`

export const GET_LOCATIONS = gql`
    query GetJobs {
        getJobs { 
            location
        }
    }
`