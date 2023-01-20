import { gql } from '@apollo/client'

//@todo: Update the return fields to match use cases

export const GET_ADMINS = gql`
    query GetAdmins {
        getAdmins {
            admin_id
            name
            email
        }
    }
`

export const GET_ADMIN_BY_NAME = gql`
    query GetAdminByName($name: String!) {
        getAdminByName(name: $name) {
            admin_id
            email
            name
        }
}
`
