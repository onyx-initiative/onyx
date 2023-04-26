// import { gql } from "apollo-server-core";
import { gql } from "apollo-server-lambda";

export const viewTypeDef = gql`
    type View {
        view_id: ID!
        scholar_id: Int!
        view_name: String!
        criteria: [String!]!
    }

    type Query {
        getScholarsViews(scholar_id: ID!): [View!]!
        getRelevantJobs(scholar_id: ID!, view_id: ID!): [Job!]!
    }

    type Mutation {
        createView(
            view_id: ID!
            scholar_id: ID!
            view_name: String!
            criteria: [String!]!
        ): View!
        addCriteria(view_id: ID!, criteria: [String!]): View!
        removeCriteria(view_id: ID!, criteria: [String!]): View!
        deleteView(view_id: ID!): View!
    }
`;