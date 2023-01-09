
import { gql } from "apollo-server-core";
import createApolloServer from "../../graphql/createApolloServer";
import { getAdminByName, createAdmin, updateAdmin, removeAdmin  } from "../mock-data/adminData";


// @todo: Update tests to reflect more queries

it("Get an admin by name", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            query GetAdminByName($name: String!) {
                getAdminByName(name: $name) {
                    name
                    email
                }
            }
        `,
        variables: getAdminByName
    });
    expect(res.data?.getAdminByName.name).toEqual(getAdminByName.name);
    expect(res.errors).toBeUndefined(); 
    apolloServer.stop();
})

it("Create an admin", async () => {
    const apolloServer = createApolloServer();

    const create = await apolloServer.executeOperation({
        query: gql`
            mutation CreateAdmin($name: String!, $email: String!) {
                createAdmin(name: $name, email: $email) {
                    admin_id
                    name
                }
            }
        `,
        variables: createAdmin
    });
    expect(create.data?.createAdmin.name).toEqual(createAdmin.name);
    expect(create.errors).toBeUndefined();
    
    const res = await apolloServer.executeOperation({
        query: gql`
            mutation RemoveAdmin($adminId: ID!) {
                removeAdmin(admin_id: $adminId)
            }
        `,
        variables: {
            adminId: create.data?.createAdmin.admin_id
        }
    });
    expect(res.data?.removeAdmin).toEqual(true);
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
});

it("Update an admin", async () => {
    const apolloServer = createApolloServer();

    const res = await apolloServer.executeOperation({
        query: gql`
            mutation UpdateAdmin($adminId: ID!, $name: String!, $email: String!) {
                updateAdmin(admin_id: $adminId, name: $name, email: $email)
            }
        `,
        variables: updateAdmin
    });
    expect(res.data?.updateAdmin).toEqual(true);
    expect(res.errors).toBeUndefined();
    apolloServer.stop();
});