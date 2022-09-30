import { gql } from '@apollo/client'

export const GET_EMPLOYER_BY_ID = gql`
        query GetEmployerById($employerId: ID!) {
            getEmployerById(employer_id: $employerId) {
                employer_id
                name
            }
        }
    `

// Other queriesß