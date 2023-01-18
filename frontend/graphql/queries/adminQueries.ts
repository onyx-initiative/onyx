import { gql } from '@apollo/client'

export const GET_ADMINS = gql`
    query GetAdmins {
        getAdmins {
            name
            email
        }
    }
`
