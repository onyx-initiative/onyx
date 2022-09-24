import { response } from "express";

const employerResolver = {
    Query: {
        getEmployerById: async (_: any, { employer_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM employer WHERE employer_id = $1`;
            const resp = await client.query(query, [employer_id]).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            // Only the first row is returned assuming no duplicates
            return resp.rows[0];
        },
        getEmployerByName: async (_: any, { name }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM employer WHERE name = $1`;
            const resp = await client.query(query, [name]).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            // Only the first row is returned assuming no duplicates
            return resp.rows[0];
        },
        getEmployers: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM employer`;
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            return resp.rows;
        },

        // Add the get jobs once the job relation is implemented
    },

    Mutation: {
        // Need to add the URL path to the logo or an empty string OR remove from db and store locally
        createEmployer: async (_: any, { name, email, logo, city, province, website_url, description, videos }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()

            // Fix and add later
            // if (await client.query(`SELECT EXISTS(SELECT FROM employer WHERE name = $1 AND city = $2 AND province = $3`, [name, city, province])) {
            //     const query = `SELECT FROM employer WHERE name = $1 AND city = $2 AND province = $3`;
            //     const resp = await client.query(query, [name, city, province]).catch((err: any) => {
            //         console.error(err);
            //         client.release()
            //     });
            //     client.release()
            //     console.log("Employer already exists");
            //     return resp.rows[0];
            // }
            const query = `INSERT INTO employer (name, email, logo, city, province, website_url, description, videos) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
            const resp = await client.query(query, [name, email, logo, city, province, website_url, description, videos]).catch((err: any) => {
                console.log(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        removeEmployer: async (_: any, { employer_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `DELETE FROM employer WHERE employer_id = $1`;
            await client.query(query, [employer_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return false;
            });
            client.release()
            return true;
        }
    }
}

export default employerResolver;