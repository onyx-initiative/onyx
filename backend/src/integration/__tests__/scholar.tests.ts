import { 
    getScholar,
    getScholarByFilter,
    createScholar,
    updateScholar,
} from "../mock-data/scholarData";
import { gql } from "apollo-server-core";
import createApolloServer from "../../graphql/createApolloServer";

it("Gets a scholar by their id", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            query GetScholar($scholarId: ID!) {
                getScholar(scholar_id: $scholarId) {
                    name
                    email
                }
            }
        `,
        variables: getScholar
    });
    expect(res.data?.getScholar.name).toEqual("Michael Dawes");
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
})

it("Gets a scholar based on a filter", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            query GetScholarByFilter($column: String!, $filter: String!) {
                getScholarByFilter(column: $column, filter: $filter) {
                    name
                    email
                }
            }
        `,
        variables: getScholarByFilter
    });
    console.log(res);
    expect(res.data?.getScholarByFilter[0].name).toEqual("Cole Purboo");
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
})

it("Creates a scholar, archives them, then deletes", async () => {
    const apolloServer = createApolloServer();

    const create = await apolloServer.executeOperation({
        query: gql`
            mutation CreateScholar($name: String!, $email: String!, $current: Boolean!, $gradYear: String!, $school: String!, $major: String!, $city: String!, $province: String!, $registrationDate: String!, $notifications: Boolean!, $skills: [String]) {
                createScholar(name: $name, email: $email, current: $current, gradYear: $gradYear, school: $school, major: $major, city: $city, province: $province, registrationDate: $registrationDate, notifications: $notifications, skills: $skills) {
                    name
                    scholar_id
                }
            }
        `,
        variables: createScholar
    });
    expect(create.data?.createScholar.name).toEqual("Michael Dawes");
    expect(create.errors).toBeUndefined();

    const archive = await apolloServer.executeOperation({
        query: gql`
            mutation ArchiveScholar($scholarId: ID!) {
                archiveScholar(scholar_id: $scholarId)
            }
        `,
        variables: {
            scholarId: create.data?.createScholar.scholar_id
        }
    });
    expect(archive.data?.archiveScholar).toEqual(true);

    const res = await apolloServer.executeOperation({
        query: gql`
            mutation DeleteScholar($scholarId: ID!) {
                deleteScholar(scholar_id: $scholarId)
            }
        `,
        variables: {
            scholarId: create.data?.createScholar.scholar_id
        }
    });

    expect(res.data?.deleteScholar).toEqual(true);
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
})

it("Updates a scholar", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            mutation ArchiveScholar($scholarId: ID!, $column: String!, $newValue: String!) {
                updateScholar(scholar_id: $scholarId, column: $column, new_value: $newValue) {
                    email
                }
            }
        `,
        variables: updateScholar
    });
    expect(res.data?.updateScholar.email).toEqual("michaelanthony.dawes@mail.utoronto.ca");
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
})