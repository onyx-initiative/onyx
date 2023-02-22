import { establishConnection } from '../utils';

const adminResolver = {
    // Create types for the resolvers
    Query: {
        getAdminByName: async (_: any, { name }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT admin_id, name, email FROM Admin WHERE name = $1`;
            const resp = await client.query(query, [name]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            // Only the first row is returned assuming no duplicates
            return resp.rows[0];
        },
        getAdmins: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT admin_id, name, email FROM Admin`;
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        },
        checkAllowedAdmin: async (_: any, { email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM AllowedAdmins WHERE email = $1`;
            const resp = await client.query(query, [email]).catch((err: any) => {
                console.error(err);
                client.release()
                return false;
            });
            client.release()

            // Returns true if the email is in the AllowedAdmins table
            return resp.rows.length > 0;
        },
        verifyAdmin: async (_: any, { email, password }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM Admin WHERE email = $1 AND password = $2`;
            const resp = await client.query(query, [email, password]).catch((err: any) => {
                console.error(err);
                client.release()
                return false;
            });
            client.release()

            // Returns true if the email is in the AllowedAdmins table
            return resp.rows.length > 0;
        },
        getAdminByEmail: async (_: any, { email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM Admin WHERE email = $1`;
            const resp = await client.query(query, [email]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            // Only the first row is returned assuming no duplicates
            return resp.rows[0];
        }
    },

    Mutation: {
        createAdmin: async (_: any, { email, password }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            // If admin does not exist, create a new admin and return the admin
            try {
                const query = `INSERT INTO admin (email, password) VALUES ($1, $2) RETURNING *;`;
                const resp = await client.query(query, [email, password]).catch((err: any) => {
                    console.log(err);
                    client.release()
                    return [];
                });
                client.release()
                return resp.rows[0];
            } catch (err) {
                console.log(err);
                client.release()
                return [];
            }
        },
        // This resolver may need to be updated based on the frontend UX
        updateAdmin: async (_: any, { id, email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            // Only updating the email for now
            const query = `UPDATE admin SET email = $1 WHERE admin_id = $2;`;
            await client.query(query, [email, id]).catch((err: any) => {
                console.log(err)
                client.release()
                return false;
            });
            client.release()
            return true;
        },
        removeAdmin: async (_: any, { id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `DELETE FROM admin WHERE admin_id = $1;`;
            await client.query(query, [id]).catch((err: any) => {
                console.error(err);
                client.release()
                return false;
            });
            client.release()
            return true;
        },
        addAllowedAdmin: async (_: any, { id, email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            
            // @todo: Use session to check if the admin is allowed to add an admin
            const query = `INSERT INTO AllowedAdmins(email) VALUES ($1);`;
            await client.query(query, [email]).catch((err: any) => {
                console.error(err);
                client.release()
                return false;
            });
            client.release()
            return true;
        }
    }
}

export default adminResolver;