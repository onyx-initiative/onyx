import { gql } from '@apollo/client'

// This function is commonly needed
export const GET_EMPLOYER_BY_ID = gql`
    query GetEmployerById($employerId: ID!) {
        getEmployerById(employer_id: $employerId) {
            name
            logo_url
        }
    }
`

export const GET_EMPLOYER_BY_NAME = gql`
    query GetEmployerByName($name: String!) {
        getEmployerByName(name: $name) {
            address
            admin_id
            contact_email
            description
            employer_id
            name
            website
            logo_url
        }
}
`

// Get employers
export const GET_EMPLOYERS = gql`
    query GetEmployers {
        getEmployers {
            employer_id
            admin_id
            name
            contact_email
            address
            website
            description
            logo_url
        }
    }
`

// Other queries