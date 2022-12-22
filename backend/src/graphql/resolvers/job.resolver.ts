import { establishConnection } from '../utils';

const jobResolver = {
    Query: {
        getJobs: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM job 
                           WHERE NOT EXISTS (
                                SELECT job_id 
                                FROM Archive 
                                WHERE job.job_id = Archive.job_id
                        )`;
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            return resp.rows;
        },
        getJobById: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM job WHERE job_id = $1 AND job_id NOT IN (SELECT job_id FROM archive)`;
            const resp = await client.query(query, [job_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        getJobsByEmployerId: async (_: any, { employer_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM job WHERE employer_id = $1 AND job_id NOT IN (SELECT job_id FROM archive)`;
            const resp = await client.query(query, [employer_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        },
        // @todo: Re-implement this function. It should check the filterview table and return
        // the jobs with relevant tags/locations/types, etc.
        getJobByFilter: async (_: any, { column, filter }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            const query = `SELECT * FROM job WHERE ${column} = $1 AND archived = false`;
            const resp = await client.query(query, [filter]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        },
    },
    Mutation: {
        createJob: async (_: any, { 
            employer_id,
            admin_id,
            title,
            description,
            job_type,
            location,
            applicant_year,
            deadline,
            tags
            }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            // Check that Job doesnt already exist
            const currentJobs = await client.query(`SELECT * 
                                                    FROM job 
                                                    WHERE title = $1 AND employer_id = $2;`, 
                                [title, employer_id]).catch((err: any) => {
                                    console.log(err);
                                    client.release()
                                });
            if (currentJobs.rows.length > 0) {
                client.release()
                return false;
            }

            const query = `INSERT INTO job(
                employer_id,
                admin_id,
                title,
                description,
                job_type,
                location,
                applicant_year,
                deadline,
                tags
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`;
            const resp = await client.query(query, 
                [
                employer_id,
                admin_id,
                title,
                description,
                job_type,
                location,   
                applicant_year,
                deadline,
                tags
            ]).catch((err: any) => {
                console.log(err);
                client.release()
                return false;
            });
            client.release()
            return true;
        },
        // @todo: Add an indert into archived jobs table
        // This ideally is done automatically when when the deadline is passed
        archiveJob: async (_: any, { job_id }: any, { dataSources }: any) => {
            return 'Not implemented';
        },
        // @todo: Need to implement server side logging with express. Need to
        // figure out the best implementation
        incrementViews: async (_: any, { job_id }: any, { dataSources }: any) => {
            return 'Not implemented';
        },
        // @todo: Try to implement this. Since jobs arent applied to directly on the website,
        // this may not be possible
        incrementApplications: async (_: any, { job_id }: any, { dataSources }: any) => {
            return 'Not implemented';
        },
        deleteJob: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `DELETE FROM job WHERE job_id = $1`;
            await client.query(query, [job_id]).catch((err: any) => {
                console.log(err);
                client.release()
                return false
            });
            client.release()
            return true;
        }
    }
};

export default jobResolver;