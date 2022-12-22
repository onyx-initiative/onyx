import { establishConnection } from '../utils';

const adminResolver = {
    // Create types for the resolvers
    Query: {
        getAdminByName: async (_: any, { name }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM Admin WHERE name = $1`;
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
            const query = `SELECT * FROM Admin`;
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        }
    },

    Mutation: {
        createAdmin: async (_: any, { name, email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            // Check if admin already exists
            const currentAdmins = await client.query(`SELECT * FROM admin;`).catch((err: any) => {
                console.error(err);
                client.release()
            });

            // If admin already exists, return the admin
            if (currentAdmins.rows.length > 0) {
                console.log("Admin already exists");
                return false;
            }

            // If admin does not exist, create a new admin and return the admin
            const query = `INSERT INTO admin (name, email) VALUES ($1, $2) RETURNING *;`;
            const resp = await client.query(query, [name, email]).catch((err: any) => {
                console.log(err);
                client.release()
                return false;
            });
            client.release()
            return true;
        },
        // This resolver may need to be updated based on the frontend UX
        updateAdmin: async (_: any, { id, email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            // Only updating the email for now
            const query = `UPDATE admin SET email = $1 WHERE admin_id = $2`;
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
            const query = `DELETE FROM admin WHERE admin_id = $1`;
            await client.query(query, [id]).catch((err: any) => {
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