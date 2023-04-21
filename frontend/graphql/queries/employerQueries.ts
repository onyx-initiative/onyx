import { gql } from '@apollo/client'

// This function is commonly needed
export const GET_EMPLOYER_BY_ID = gql`
    query GetEmployerById($employerId: ID!) {
        getEmployerById(employer_id: $employerId) {
            name
            website
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
        }
}
`

// Get employers
export const GET_EMPLOYERS = gql`
    query GetEmployers {
        getEmployers {
            address
            admin_id
            contact_email
            description
            employer_id
            name
            website
        }
    }
`

// Other queries