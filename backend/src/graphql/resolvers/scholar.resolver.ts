import { establishConnection } from '../utils';

const scholarResolver = {
    Query: {
        getScholars: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM scholar`;
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        },
        getScholar: async (_: any, { scholar_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM scholar WHERE scholar_id = $1`;
            const resp = await client.query(query, [scholar_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        // @todo: Look at the scholar_id and view ID and return relevant jobs based on the
        // criteria
        checkViews: async (_: any, { scholar_id, view_id }: any, { dataSources }: any) => {
            return 'Not implemented'
        },
        getScholarByEmail: async (_: any, { email }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM scholar WHERE email = $1`;
            const resp = await client.query(query, [email]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            if (resp.rows[0]) {
                return resp.rows[0];
            } else {
                return null;
            };
        },
        getRecommendedJobs: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const makeView = `
                DROP VIEW IF EXISTS recommended_jobs;
                CREATE VIEW recommended_jobs AS
                SELECT scholar.name as scholar, scholar.email as email, scholar.scholar_id, view_name, 
                employer.name as employer, job.job_id, job.title, job.description, job.job_type, 
                job.location, job.deadline
                FROM employer JOIN job ON employer.employer_id = job.employer_id 
                JOIN job_search ON job_search.job_id = job.job_id,
                scholar JOIN filterview ON filterview.scholar_id = scholar.scholar_id
                WHERE document @@ plainto_tsquery(array_to_string(filterview.criteria, ' & '))
                GROUP BY scholar.scholar_id, view_name, employer.name, job.title, job.description, 
                job.job_type, job.location, job.deadline, job.job_id;
            `
            await client.query(makeView).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            const query = `                
                SELECT scholar, email, scholar_id, view_name, employer, 
                title, description, job_type, location, deadline
                FROM recommended_jobs
                WHERE job_id IN (
                    SELECT job_id
                    FROM recommended_jobs r2
                    WHERE recommended_jobs.scholar_id = r2.scholar_id
                    LIMIT 5
                );
            `;
            
            // Returns a list of jobs for each scholar, grouped by scholar
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });

            // Turn the returned rows into an obhect with the scholars name as the key
            // and the list of jobs as the value
            // @todo

            client.release()
            return resp.rows;
        }
    },
    Mutation: {
        createScholar: async (_: any, {
            name,
            email,
            year,
            school,
            major,
            status,
            notifications
            }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `INSERT INTO scholar (name, email, year, school, major, status, notifications) 
                           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
            const resp = await client.query(query, [
                name,
                email,
                year,
                school,
                major,
                status,
                notifications
            ]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        // @todo: update this function
        updateScholar: async (_: any, { scholar_id, column, new_value }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            let query;
            if (column !== 'workHistory' || column !== 'skills' || column !== 'status') {
                query = `UPDATE scholar SET ${column} = $1 WHERE scholar_id = $2 RETURNING *`;
            } else if (column === 'workHistory' || column === 'skills') {
                query = `UPDATE scholar SET ${column} = ${column} || $1 WHERE scholar_id = $2 RETURNING *`;
            }

            if (column === 'notifications') {
                new_value = (new_value === 'true');
            }

            const resp = await client.query(query, [new_value, scholar_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        archiveScholar: async (_: any, { scholar_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `UPDATE scholar SET status = alumni WHERE scholar_id = $1 RETURNING *`;
            const resp = await client.query(query, [scholar_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return false;
            });
            client.release()
            return true;
        },
        deleteScholar: async (_: any, { scholar_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `DELETE FROM scholar WHERE scholar_id = $1`;
            const resp = await client.query(query, [scholar_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return false;
            });
            client.release()
            return true;
        },
        addToFavourites: async (_: any, { scholar_id, job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `INSERT INTO favourites (job_id, scholar_id) VALUES ($1, $2)`;
            const resp = await client.query(query, [job_id
                , scholar_id]).catch((err: any) => {
                console.error(err); 
                client.release()
                return false;
            });
            client.release()
            return true;
        },
        removeFromFavourites: async (_: any, { scholar_id, job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `DELETE FROM Favourites WHERE job_id = $1 AND scholar_id = $2`;
            const resp = await client.query(query, [job_id
                , scholar_id]).catch((err: any) => {
                console.error(err); 
                client.release()
                return false;
            });
            client.release()
            return true;
        },
    }
}

export default scholarResolver;