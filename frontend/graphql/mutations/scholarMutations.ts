import { gql } from '@apollo/client'

export const CREATE_SCHOLAR = gql`
    mutation CreateScholar($name: String!, $email: String!, $year: Int!, $school: String!, $major: String!, $status: Status!, $notifications: Boolean!) {
        createScholar(name: $name, email: $email, year: $year, school: $school, major: $major, status: $status, notifications: $notifications) {
            scholar_id
            name
            email
            year
            school
            major
            status
            notifications
        }
    }
`

export const UPDATE_SCHOLAR = gql`
    mutation UpdateScholar($scholarId: ID!, $column: String!, $newValue: String!) {
        updateScholar(scholar_id: $scholarId, column: $column, new_value: $newValue) {
            scholar_id
            name
            email
            year
            school
            major
            status
            notifications
        }
    }
`

export const ARCHIVE_SCHOLAR = gql`
    mutation ArchiveScholar($scholarId: ID!) {
        archiveScholar(scholar_id: $scholarId)
    }
`

export const DELETE_SCHOLAR = gql`
    mutation DeleteScholar($scholarId: ID!) {
        deleteScholar(scholar_id: $scholarId)
    }
`

export const CREATE_VIEW = gql`
    mutation CreateView($viewId: ID!, $email: String!, $viewName: String!, $criteria: [String!]!) {
        createView(view_id: $viewId, email: $email, view_name: $viewName, criteria: $criteria) {
            view_name
            criteria
        }
    }
`

export const ADD_CRITERIA = gql`
    mutation AddCriteria($viewId: ID!, $criteria: [String!]) {
        addCriteria(view_id: $viewId, criteria: $criteria) {
            view_id
            scholar_id
            view_name
            criteria
        }
    }
`

export const REMOVE_CRITERIA = gql`
    mutation RemoveCriteria($viewId: ID!, $criteria: [String!]) {
        removeCriteria(view_id: $viewId, criteria: $criteria) {
            view_id
            scholar_id
            view_name
            criteria
        }
    }
`

export const DELETE_VIEW = gql`
    mutation DeleteView($viewId: ID!) {
        deleteView(view_id: $viewId) {
            view_id
            scholar_id
            view_name
            criteria
        }
    }
`

export const BOOKMARK_JOB = gql`
    mutation Mutation($email: String!, $jobId: ID!) {
        bookmarkJob(email: $email, job_id: $jobId)
    }
`