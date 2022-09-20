const adminResolver = {
    // Create types for the resolvers
    Query: {
        getAdminByName: async (_: any, { name }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM admin WHERE name = $1`;
            const resp = await client.query(query, [name]).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            // Only the first row is returned assuming no duplicates
            return resp.rows[0];
        },
        getAdmins: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM admin`;
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            return resp.rows;
        }
    },

    Mutation: {
        createAdmin: async (_: any, { name, email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `INSERT INTO admin (name, email) VALUES ($1, $2)`;
            await client.query(query, [name, email]).catch((err: any) => {
                console.log(err);
                client.release()
                return false
            });
            client.release()
            return true;
        },
        updateAdmin: async (_: any, { id, name, email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `UPDATE admin SET name = $1, email = $2 WHERE admin_id = $3`;
            await client.query(query, [name, email, id]).catch((err: any) => {
                console.log(err)
                client.release()
                return false;
            });
            client.release()
            return true;
        },
        removeAdmin: async (_: any, { id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
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