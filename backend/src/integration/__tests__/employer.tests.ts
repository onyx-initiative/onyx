import { 
    getEmployer, 
    getEmployerByName, 
    createEmployer
} from "../mock-data/employerData";
import { gql } from "apollo-server-core";
import createApolloServer from "../../graphql/createApolloServer";

it("Get an employer by id", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            query GetEmployerById($employerId: ID!) {
                getEmployerById(employer_id: $employerId) {
                    employer_id
                }
            }
        `,
        variables: getEmployer
    });
    expect(res.data?.getEmployerById.employer_id).toEqual(getEmployer.employerId);
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
});

it("Get an employer by name", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            query GetEmployerByName($name: String!) {
                getEmployerByName(name: $name) {
                    name
                }
            }
        `,
        variables: getEmployerByName
    });
    expect(res.data?.getEmployerByName.name).toEqual(getEmployerByName.name);
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
});

it("Create an employer", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            mutation CreateEmployer($name: String!, $email: String!, $city: String!, $province: String!, $websiteUrl: String!, $description: String!, $logo: String) {
                createEmployer(name: $name, email: $email, city: $city, province: $province, website_url: $websiteUrl, description: $description, logo: $logo)
            }
        `,
        variables: createEmployer
    });
    expect(res.data?.createEmployer).toEqual(true);
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
});

it("Remove an employer", async () => {
    const apolloServer = createApolloServer();

    // Add a sample employer with no jobs to test deletion
    const init = await apolloServer.executeOperation({
        query: gql`
            query GetEmployers {
                getEmployers {
                    employer_id
                }
            }
        `
    })

    const testId = init.data?.getEmployers[init.data.getEmployers.length - 1].employer_id;

    const res = await apolloServer.executeOperation({
        query: gql`
            mutation RemoveEmployer($employerId: ID!) {
                removeEmployer(employer_id: $employerId)
            }
        `,
        variables: {
            employerId: testId  
        }
    });
    
    expect(res.data?.removeEmployer).toEqual(true);
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
});