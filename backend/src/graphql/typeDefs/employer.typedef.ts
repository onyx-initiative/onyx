// import { gql } from "apollo-server-express";
import { gql } from "apollo-server-lambda";


export const employerTypeDef = gql`

    type Employer {
        employer_id: ID!
        admin_id: ID!
        name: String!
        contact_email: String!
        address: String!
        website: String!
        description: String!
        logo_url: String
        student_new_grad_link: String
    }

    type Query {
        getEmployerById(employer_id: ID!): Employer!
        getEmployerByName(name: String!): Employer!
        getEmployers: [Employer!]!
    }

    type Mutation {
        createEmployer(
            admin_id: ID!
            name: String!
            contact_email: String!
            address: String!
            website: String!
            description: String!
            student_new_grad_link: String
        ): Employer!
        removeEmployer(employer_id: ID!): Boolean!      
        updateLogo(name: String!, logo_url: String!): Employer!    
        editEmployer(employer_id: ID!, field: String!, value: String!): Boolean!                        
    }
`