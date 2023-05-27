import { microserviceUrl } from '../env';
import { establishConnection } from '../utils';
import fetch from 'node-fetch';

const employerResolver = {
    Query: {
        getEmployerById: async (_: any, { employer_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
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
            const client = await establishConnection(db);
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
            const client = await establishConnection(db);
            const query = `SELECT * FROM employer`;
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            return resp.rows;
        },
    },

    Mutation: {
        // Need to add the URL path to the logo or an empty string OR remove from db and store locally
        createEmployer: async (_: any, { 
            admin_id, name, contact_email, address, website, description
        }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            // Check if employer already exists
            const currentEmployers = await client.query(`SELECT * FROM employer WHERE name = $1`, [name]).catch((err: any) => {
                console.error(err);
                client.release()
            });

            // Find the logo for the employer
            type Logo = {
                logo: string
            }

            const logo = await fetch(microserviceUrl + '/webscraper/logo/' + name).then(res => res.json()).then(data => {
                return data;
            }) as Logo;
            
            let logo_url = await logo;
            logo_url.logo === null ? logo_url.logo = 'https://logo.clearbit.com/www.onyxinitiative.org/' : logo_url.logo = logo_url.logo;

            if (currentEmployers.rows.length > 0) {
                console.log("Employer already exists");
                return currentEmployers.rows[0];
            }

            // If employer doesn't exist, create a new one
            const query = `INSERT INTO employer (admin_id, name, contact_email, 
                           address, website, description, logo_url)
                           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
            const resp = await client.query(query, [admin_id, name, 
                contact_email, address, website, description, logo_url.logo]).catch((err: any) => {
                console.log(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        removeEmployer: async (_: any, { employer_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
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