import { gql } from '@apollo/client'

export const GET_SCHOLARS = gql`
    query GetScholars {
        getScholars {
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

export const GET_SCHOLAR = gql`
    query GetScholar($scholarId: ID!) {
        getScholar(scholar_id: $scholarId) {
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

export const GET_SCHOLAR_BY_EMAIL = gql`
    query GetScholarByEmail($email: String!) {
        getScholarByEmail(email: $email) {
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

export const CHECK_VIEWS = gql`
    query CheckViews($scholarId: ID!, $viewId: ID!) {
        checkViews(scholar_id: $scholarId, view_id: $viewId) {
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

export const GET_SCHOLAR_VIEWS = gql`
    query GetScholarsViews($scholarId: ID!) {
        getScholarsViews(scholar_id: $scholarId) {
            view_id
            scholar_id
            view_name
            criteria
        }
    }
`