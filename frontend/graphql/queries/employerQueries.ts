import { gql } from '@apollo/client'

// This function is commonly needed
export const GET_EMPLOYER_BY_ID = gql`
        query GetEmployerById($employerId: ID!) {
            getEmployerById(employer_id: $employerId) {
                name
            }
        }
    `

// Other queries