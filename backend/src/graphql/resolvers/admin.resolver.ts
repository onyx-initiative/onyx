const adminResolver = {
    // Create types for the resolvers
    Query: {
        getAdminByName: async (_: any, { name }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const query = `SELECT * FROM admin WHERE name = $1`;
            await db.query(query, [name]).catch((err: any) => {
                console.error(err);
                return false;
            });
            return true;
        },
        getAdmins: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const query = `SELECT * FROM admin`;
            await db.query(query).catch((err: any) => {
                console.error(err);
                return false;
            });
            return true;
        }
    },

    Mutation: {
        createAdmin: async (_: any, { name, email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const query = `INSERT INTO admin (name, email) VALUES ($1, $2)`;
            await db.query(query, [name, email]).catch((err: any) => {
                console.log(err);
                return false
            });
            return true;
        },
        updateAdmin: async (_: any, { id, name, email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const query = `UPDATE admin SET name = $1, email = $2 WHERE id = $3`;
            await db.query(query, [name, email, id]).catch((err: any) => {
                console.log(err)
                return false;
            });
            return true;
        },
        removeAdmin: async (_: any, { id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const query = `DELETE FROM admin WHERE id = $1`;
            await db.query(query, [id]).catch((err: any) => {
                console.error(err);
                return false;
            });
            return true;
        }
    }
}

export default adminResolver;