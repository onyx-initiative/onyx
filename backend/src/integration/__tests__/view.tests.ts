import { 
    getRelevantJobs,
    getScholarViews,
    createView,
    addViewCriteria
} from "../mock-data/viewData";
import { gql } from "apollo-server-core";
import createApolloServer from "../../graphql/createApolloServer";

it("Gets relevant jobs based on view criteria", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            query GetRelevantJobs($scholarId: ID!, $viewId: [ID!]!) {
                getRelevantJobs(scholar_id: $scholarId, view_id: $viewId) {
                    job_id
                    job_title
                }
            }
        `,
        variables: getRelevantJobs
    });
    expect(res.data?.getRelevantJobs[0].job_id).toEqual("5");
    expect(res.data?.getRelevantJobs[0].job_title).toEqual("Sample Job");
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
});

it("Gets all views for a scholar", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            query GetScholarsViews($scholarId: ID!) {
                getScholarsViews(scholar_id: $scholarId) {
                    view_id
                    view_name
                }
            }
        `,
        variables: getScholarViews
    });
    expect(res.data?.getScholarsViews[0].view_id).toEqual("1");
    expect(res.data?.getScholarsViews[0].view_name).toEqual("Local Jobs");
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
})

it("Creates a new view", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            mutation CreateView($scholarId: Int!, $viewName: String!, $criteria: [String!]!) {
                createView(scholar_id: $scholarId, view_name: $viewName, criteria: $criteria) {
                    view_id
                    scholar_id
                    view_name
                }
            }
        `,
        variables: createView
    });
    expect(res.data?.createView.scholar_id).toEqual(4);
    expect(res.data?.createView.view_name).toEqual("Test View");
    expect(res.errors).toBeUndefined();

    const deleteView = await apolloServer.executeOperation({
        query: gql`
            mutation DeleteView($viewId: ID!) {
                deleteView(view_id: $viewId) {
                    scholar_id
                    view_name
                }
            }
        `,
        variables: {
            "viewId": res.data?.createView.view_id
        }
    });
    expect(deleteView.data?.deleteView.scholar_id).toEqual(4);
    apolloServer.stop();
})

it("Adds and removes criteria from a view", async () => {
    const apolloServer = createApolloServer();

    // Create a test view
    const create = await apolloServer.executeOperation({
        query: gql`
            mutation CreateView($scholarId: Int!, $viewName: String!, $criteria: [String!]!) {
                createView(scholar_id: $scholarId, view_name: $viewName, criteria: $criteria) {
                    view_id
                    scholar_id
                    view_name
                }
            }
        `,
        variables: createView
    });

    // Add criteria to the test view
    const addCriteria = await apolloServer.executeOperation({
        query: gql`
            mutation AddCriteria($viewId: ID!, $criteria: [String!]) {
                addCriteria(view_id: $viewId, criteria: $criteria) {
                    view_id
                    criteria
                }
            }
        `,
        variables: {
            "viewId": create.data?.createView.view_id,
            "criteria": addViewCriteria.criteria
        }
    });
    expect(addCriteria.data?.addCriteria.criteria).toEqual(["INTERNSHIP", "SOFTWARE", "High Paying", "Startup"]);
    expect(addCriteria.errors).toBeUndefined();

    // Remove criteria from the test view
    const res2 = await apolloServer.executeOperation({
        query: gql`
            mutation RemoveCriteria($viewId: ID!, $criteria: [String!]) {
                removeCriteria(view_id: $viewId, criteria: $criteria) {
                    view_id
                    criteria
                }
            }
        `,
        variables: {
            "viewId": create.data?.createView.view_id,
            "criteria": ["High Paying"]
        }
    });
    expect(res2.data?.removeCriteria.criteria).toEqual(["SOFTWARE", "INTERNSHIP","Startup"]);
    expect(res2.errors).toBeUndefined();

    // Delete the test view
    await apolloServer.executeOperation({
        query: gql`
            mutation DeleteView($viewId: ID!) {
                deleteView(view_id: $viewId) {
                    scholar_id
                    view_name
                }
            }
        `,
        variables: {
            "viewId": create.data?.createView.view_id
        }
    });

    apolloServer.stop();    
})
