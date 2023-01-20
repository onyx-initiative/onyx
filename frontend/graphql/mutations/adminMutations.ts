import { gql } from '@apollo/client'

// @todo: Update the return fields to match use cases

export const CREATE_ADMIN = gql`
    mutation CreateAdmin($name: String!, $email: String!) {
        createAdmin(name: $name, email: $email)
}
`

export const UPDATE_ADMIN = gql`
    mutation UpdateAdmin($adminId: ID!, $email: String!) {
        updateAdmin(admin_id: $adminId, email: $email)
}
`

export const REMOVE_ADMIN = gql`
    mutation RemoveAdmin($adminId: ID!) {
        removeAdmin(admin_id: $adminId)
}
`
