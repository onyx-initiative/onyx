import { gql } from '@apollo/client'

export const CREATE_EMPLOYER = gql`
    mutation CreateEmployer($adminId: ID!, $name: String!, $contactEmail: String!, $address: String!, $website: String!, $description: String!) {
        createEmployer(admin_id: $adminId, name: $name, contact_email: $contactEmail, address: $address, website: $website, description: $description) {
            employer_id
        }
    }
`

export const REMOVE_EMPLOYER = gql`
    mutation RemoveEmployer($employerId: ID!) {
        removeEmployer(employer_id: $employerId)
    }
`

//@todo: Add update employer mutation