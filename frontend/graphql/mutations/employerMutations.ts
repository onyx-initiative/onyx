import { gql } from '@apollo/client'

export const CREATE_EMPLOYER = gql`
    mutation CreateEmployer($adminId: ID!, $name: String!, $contactEmail: String!, $address: String!, $website: String!, $description: String!, $studentNewGradLink: String) {
        createEmployer(admin_id: $adminId, name: $name, contact_email: $contactEmail, address: $address, website: $website, description: $description, student_new_grad_link: $studentNewGradLink) {
            employer_id
            admin_id
            name
            contact_email
            address
            website
            description
            logo_url
            student_new_grad_link
        }
    }
`

export const REMOVE_EMPLOYER = gql`
    mutation RemoveEmployer($employerId: ID!) {
        removeEmployer(employer_id: $employerId)
    }
`

export const UPDATE_LOGO = gql`
    mutation UpdateLogo($name: String!, $logoUrl: String!) {
        updateLogo(name: $name, logo_url: $logoUrl) {
            logo_url
        }
    }
`

//@todo: Add update employer mutation