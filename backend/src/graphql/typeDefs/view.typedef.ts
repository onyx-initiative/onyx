import { gql } from "apollo-server-core";

export const viewTypeDef = gql`
    type View {
        view_id: ID!
        scholar_id: Int!
        view_name: String!
        criteria: [String!]!
    }

    type Query {
        getScholarsViews(scholar_id: ID!): [View!]!
        getRelevantJobs(view: View!): [Job!]!
    }

    type Mutation {
        createView(
            scholar_id: Int!
            view_name: String!
            criteria: [String!]!
        ): View!
        updateView(criteria: [String!]): View!
        deleteView(view_id: ID!): View!
    }
`;