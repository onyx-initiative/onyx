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
                            )
                            AND live = true`;
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            return resp.rows;
        },
        getJobsAdmin: async (_: any, { active, live }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            let query;

            // If live is false, youll see your draft jobs

            if (active) {
                query = `SELECT * FROM job
                        WHERE NOT EXISTS (
                            SELECT job_id 
                            FROM Archive 
                            WHERE job.job_id = Archive.job_id
                        )
                        AND live = $1`;

            } else {
                query = `SELECT * FROM job WHERE live = $1`;
            }
            const resp = await client.query(query, [live]).catch((err: any) => {
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
        getFeaturedJobs: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT *
                           FROM job, featured
                           WHERE job.job_id = featured.job_id 
                           AND job.job_id NOT IN (SELECT job_id FROM archive)`;
            const resp = await client.query(query ).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        },
        searchJobs: async (_: any, { search }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `
                SELECT * FROM search_jobs_trgm($1);
            `;
            const resp = await client.query(query, [search]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        },
        getNewJobs: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `
                SELECT *
                FROM Job
                WHERE date_posted > NOW() - INTERVAL '3 days'
                LIMIT 10;
            `;
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        },
        getFavourites: async (_: any, { scholar_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `
                SELECT Saved.job_id,
                employer_id,
                admin_id,
                title,
                description,
                long_description,
                contact_email,
                job_type,
                term,
                location,
                applicant_year,
                deadline,
                date_posted,
                total_views,
                tags
                FROM Saved, Job
                WHERE scholar_id = $1
                AND Saved.job_id = Job.job_id;
            `;
            const resp = await client.query(query, [scholar_id]).catch((err: any) => {
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
            long_description,
            contact_email,
            job_type,
            term,
            location,
            applicant_year,
            deadline,
            tags,
            live
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

            let query;
            
            if (contact_email === undefined && live === undefined) {
                query = `INSERT INTO job(
                    employer_id,
                    admin_id,
                    title,
                    description,
                    job_type,
                    term,
                    location,
                    applicant_year,
                    deadline,
                    tags
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;
                await client.query(query, 
                    [
                    employer_id,
                    admin_id,
                    title,
                    description,
                    job_type,
                    term,
                    location,   
                    applicant_year,
                    deadline,
                    tags
                ]).catch((err: any) => {
                    console.log(err);
                    client.release()
                    return false;
                });
            } else if (live === undefined) {
                query = `INSERT INTO job(
                    employer_id,
                    admin_id,
                    title,
                    description,
                    contact_email,
                    job_type,
                    term,
                    location,
                    applicant_year,
                    deadline,
                    tags
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`;
                    await client.query(query, 
                        [
                        employer_id,
                        admin_id,
                        title,
                        description,
                        contact_email,
                        job_type,
                        term,
                        location,   
                        applicant_year,
                        deadline,
                        tags
                    ]).catch((err: any) => {
                        console.log(err);
                        client.release()
                        return false;
                    });
            } else if (contact_email === undefined) {
                query = `INSERT INTO job(
                    employer_id,
                    admin_id,
                    title,
                    description,
                    long_description,
                    job_type,
                    term,
                    location,
                    applicant_year,
                    deadline,
                    tags,
                    live
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true) RETURNING *;`;
                await client.query(query, 
                    [
                    employer_id,
                    admin_id,
                    title,
                    description,
                    long_description,
                    job_type,
                    term,
                    location,   
                    applicant_year,
                    deadline,
                    tags
                ]).catch((err: any) => {
                    console.log(err);
                    client.release()
                    return false;
                });
            } else {
                query = `INSERT INTO job(
                    employer_id,
                    admin_id,
                    title,
                    description,
                    long_description,
                    contact_email,
                    job_type,
                    term,
                    location,
                    applicant_year,
                    deadline,
                    tags,
                    live
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true) RETURNING *;`;
                await client.query(query, 
                    [
                    employer_id,
                    admin_id,
                    title,
                    description,
                    long_description,
                    contact_email,
                    job_type,
                    term,
                    location,   
                    applicant_year,
                    deadline,
                    tags
                ]).catch((err: any) => {
                    console.log(err);
                    client.release()
                    return false;
                });
            }
            
            client.release()
            return true;
        },
        batchCreateJobs: async (_: any, { admin_id, jobs }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            const query = `INSERT INTO job(
                employer_id,
                admin_id,
                title,
                description,
                long_description,
                contact_email,
                job_type,
                term,
                location,
                applicant_year,
                deadline,
                tags,
                live
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true) RETURNING *;`;
            for (let i = 0; i < jobs.length; i++) {
                // Get the employer id
                const employer = await client.query(`SELECT employer_id
                                                    FROM employer   
                                                    WHERE name = $1;`,
                    [jobs[i].employer_name]).catch((err: any) => {
                        console.log(err);
                        client.release()
                        return false;
                    });
                const job = jobs[i];
                await client.query(query, 
                    [
                    employer.rows[0].employer_id,
                    admin_id,
                    job.title,
                    job.description,
                    job.long_description,
                    job.contact_email,
                    job.job_type,
                    job.term,
                    job.location,   
                    job.applicant_year,
                    job.deadline,
                    job.tags
                ]).catch((err: any) => {
                    console.log(err);
                    client.release()
                    return false;
                });
            }
            client.release()
            return true;
        },
        // @todo: Make this a cron to run sunday every 2 weeks
        archiveJob: async (_: any, { job_id }: any, { dataSources }: any) => {
            const date = new Date();
            const { db } = dataSources;
            const client = await establishConnection(db);

            // Find all of the jobs past the deadline
            const query = `SELECT job_id
                           FROM job
                           WHERE job_id = $1 AND deadline < $2`;
            const resp = await client.query(query, [job_id, date]).catch((err: any) => {
                console.log(err);
                client.release()
                return false;
            });
            if (resp.rows.length === 0) {
                client.release()
                return false;
            }

            // Archive the job
            const archiveQuery = `INSERT INTO archive(job_id) VALUES ($1)`;
            await client.query(archiveQuery, [job_id]).catch((err: any) => {
                console.log(err);
                client.release()
                return false;
            });
            client.release()
            return true;
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
        },
        addToFeatured: async (_: any, { job_ids }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `INSERT INTO featured(job_id) VALUES ($1)`;
            for (let i = 0; i < job_ids.length; i++) {
                await client.query(query, [job_ids[i]]).catch((err: any) => {
                    console.log(err);
                    client.release()
                    return false
                });
            }
            client.release()
            return true;
        },
        removeFromFeatured: async (_: any, { job_ids }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `DELETE FROM featured WHERE job_id = $1`;
            for (let i = 0; i < job_ids.length; i++) {
                await client.query(query, [job_ids[i]]).catch((err: any) => {
                    console.log(err);
                    client.release()
                    return false
                });
            }
            client.release()
            return true;
        },
        setLive: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `UPDATE job SET live = true WHERE job_id = $1`;
            await client.query(query, [job_id]).catch((err: any) => {
                console.log(err);
                client.release()
                return false
            });
            client.release()
            return true;
        },
        makePrivate: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `UPDATE job SET live = false WHERE job_id = $1`;
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