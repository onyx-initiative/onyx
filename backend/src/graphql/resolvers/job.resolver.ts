import { establishConnection } from '../utils';

const jobResolver = {
    Query: {
        getJobs: async (_: any, __: any, { dataSources }: any) => {
            const date = new Date();
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `SELECT * FROM job
                               WHERE NOT EXISTS (
                                    SELECT job_id
                                    FROM Archive
                                    WHERE job.job_id = Archive.job_id
                                )
                                AND live = true
                                AND deadline > $1`;
                const resp = await client.query(query, [date]);
                return resp.rows;
            } catch (err) {
                console.error(err);
                return [];
            } finally {
                client.release();
            }
        },
        getJobsAdmin: async (_: any, { active, live }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                let query;
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
                const resp = await client.query(query, [live]);
                return resp.rows;
            } catch (err) {
                console.error(err);
                return [];
            } finally {
                client.release();
            }
        },
        getJobById: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `SELECT * FROM job WHERE job_id = $1 AND job_id NOT IN (SELECT job_id FROM archive)`;
                const resp = await client.query(query, [job_id]);
                return resp.rows[0];
            } catch (err) {
                console.error(err);
                return null;
            } finally {
                client.release();
            }
        },
        getJobsByEmployerId: async (_: any, { employer_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `SELECT * FROM job WHERE employer_id = $1 AND job_id NOT IN (SELECT job_id FROM archive)`;
                const resp = await client.query(query, [employer_id]);
                return resp.rows;
            } catch (err) {
                console.error(err);
                return [];
            } finally {
                client.release();
            }
        },
        // @todo: Re-implement this function. It should check the filterview table and return
        // the jobs with relevant tags/locations/types, etc.
        getFeaturedJobs: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `SELECT *
                               FROM job, featured
                               WHERE job.job_id = featured.job_id
                               AND job.job_id NOT IN (SELECT job_id FROM archive)`;
                const resp = await client.query(query);
                return resp.rows;
            } catch (err) {
                console.error(err);
                return [];
            } finally {
                client.release();
            }
        },
        searchJobs: async (_: any, { search }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `SELECT * FROM search_jobs_trgm($1);`;
                const resp = await client.query(query, [search]);
                return resp.rows;
            } catch (err) {
                console.error(err);
                return [];
            } finally {
                client.release();
            }
        },
        searchArchivedJobs: async (_: any, { search, limit = 50, offset = 0 }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT * FROM search_archived_jobs_trgm($1)
                    LIMIT $2 OFFSET $3;
                `;
                const resp = await client.query(query, [search, limit, offset]);
                console.log(`searchArchivedJobs found ${resp.rows.length} results for "${search}"`);
                return resp.rows;
            } catch (err) {
                console.error('searchArchivedJobs error:', err);
                return [];
            } finally {
                client.release();
            }
        },
        getNewJobs: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT *
                    FROM Job
                    WHERE date_posted > NOW() - INTERVAL '7 days'
                    LIMIT 10;
                `;
                const resp = await client.query(query);
                return resp.rows;
            } catch (err) {
                console.error(err);
                return [];
            } finally {
                client.release();
            }
        },
        getFavourites: async (_: any, { scholar_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT Saved.job_id,
                    employer_id,
                    admin_id,
                    title,
                    description,
                    long_description,
                    requirements,
                    experience,
                    education,
                    how_to_apply,
                    additional_info,
                    contact_email,
                    job_type,
                    term,
                    location,
                    applicant_year,
                    deadline,
                    date_posted,
                    total_views,
                    tags,
                    link
                    FROM Saved, Job
                    WHERE scholar_id = $1
                    AND Saved.job_id = Job.job_id;
                `;
                const resp = await client.query(query, [scholar_id]);
                return resp.rows;
            } catch (err) {
                console.error(err);
                return [];
            } finally {
                client.release();
            }
        },
        getFilteredJobs: async (_: any, { filter }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                // Initialize an array to store query parameters
                const queryParams = [];

                // Initialize the query string
                let query = 'SELECT * FROM Job WHERE live = true';

                // Filter by location
                if (filter.location) {
                    query += ` AND location = '${filter.location}'`;
                    queryParams.push(filter.location);
                }

                // Filter by job type (dynamically build the condition based on the specified job types)
                const jobTypeConditions = Object.entries(filter.job_type)
                    .filter(([type, value]) => value == true)
                    .map(([type]) => {
                    const formattedType = type.replace('_', ' ');
                    return formattedType;
                    })
                if (jobTypeConditions) {
                    let jobTypeCondition = '';
                    jobTypeCondition += ` AND (`;
                    for (let i = 0; i < jobTypeConditions.length; i++) {
                        jobTypeCondition += `job_type = '${jobTypeConditions[i]}'`;
                        jobTypeCondition += ' OR '
                    }
                    jobTypeCondition = jobTypeCondition.slice(0, -4);
                    jobTypeCondition += `)`;
                    if (jobTypeCondition.length > 7) {
                        query += jobTypeCondition;
                    }
                }

                // Filter by applicant year
                if (filter.applicant_year.length > 0) {
                    for (let i = 0; i < filter.applicant_year.length; i++) {
                        query += ` AND ${filter.applicant_year[i]} = ANY(applicant_year)`;
                    }
                }

                // Filter by tags
                if (filter.tags.length > 0) {
                    for (let i = 0; i < filter.tags.length; i++) {
                        query += ` AND '${filter.tags[i]}' = ANY(tags)`;
                    }
                }

                // Sort by date posted (Newest or Oldest)
                if (filter.sort === 'Newest') {
                    query += ' ORDER BY date_posted DESC';
                } else if (filter.sort === 'Oldest') {
                    query += ' ORDER BY date_posted ASC';
                }

                console.log(query)
                const result = await client.query(query);
                return result.rows;
            } catch (err) {
                console.error(err);
                return [];
            } finally {
                client.release();
            }
        },
        viewArchivedJobs: async (_: any, { limit = 50, offset = 0 }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `SELECT * FROM job
                               WHERE EXISTS (
                                    SELECT job_id
                                    FROM Archive
                                    WHERE job.job_id = Archive.job_id
                                )
                               ORDER BY date_posted DESC
                               LIMIT $1 OFFSET $2`;
                const resp = await client.query(query, [limit, offset]);
                return resp.rows;
            } catch (err) {
                console.error(err);
                return [];
            } finally {
                client.release();
            }
        }
    },
    Mutation: {
        createJob: async (_: any, {
            employer_id,
            admin_id,
            title,
            description,
            long_description,
            requirements,
            experience,
            education,
            how_to_apply,
            additional_info,
            contact_email,
            job_type,
            term,
            location,
            applicant_year,
            deadline,
            tags,
            live,
            link
            }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                // Check that Job doesnt already exist
                const currentJobs = await client.query(
                    `SELECT * FROM job WHERE title = $1 AND employer_id = $2;`,
                    [title, employer_id]
                );
                if (currentJobs.rows.length > 0) {
                    throw new Error(`A job with the title "${title}" already exists for this employer. Please use a different title.`);
                }

                const query = `INSERT INTO job(
                    employer_id,
                    admin_id,
                    title,
                    description,
                    long_description,
                    requirements,
                    experience,
                    education,
                    how_to_apply,
                    additional_info,
                    job_type,
                    term,
                    location,
                    applicant_year,
                    deadline,
                    tags,
                    live,
                    link,
                    contact_email
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *;`;
                await client.query(query, [
                    employer_id,
                    admin_id,
                    title,
                    description,
                    long_description,
                    requirements,
                    experience,
                    education,
                    how_to_apply,
                    additional_info,
                    job_type.toLowerCase(),
                    term,
                    location,
                    applicant_year,
                    deadline,
                    tags,
                    live,
                    link,
                    contact_email
                ]);
                return true;
            } catch (err: any) {
                console.error('Error creating job:', err);
                throw new Error(`Failed to create job: ${err.message || 'Unknown database error'}`);
            } finally {
                client.release();
            }
        },
        batchCreateJobs: async (_: any, { admin_id, jobs }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `INSERT INTO job(
                    employer_id,
                    admin_id,
                    title,
                    description,
                    long_description,
                    requirements,
                    how_to_apply,
                    contact_email,
                    job_type,
                    term,
                    location,
                    applicant_year,
                    deadline,
                    tags,
                    live,
                    link
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, true, $15) RETURNING *;`;
                for (let i = 0; i < jobs.length; i++) {
                    const employer = await client.query(
                        `SELECT employer_id FROM employer WHERE name = $1;`,
                        [jobs[i].employer_name]
                    );
                    const job = jobs[i];
                    job.deadline == null ? job.deadline = "2100-01-01" : job.deadline = job.deadline;
                    await client.query(query, [
                        employer.rows[0].employer_id,
                        admin_id,
                        job.title,
                        job.description,
                        job.long_description,
                        job.requirements,
                        job.how_to_apply,
                        job.contact_email,
                        job.job_type.toLowerCase(),
                        job.term,
                        job.location,
                        job.applicant_year,
                        job.deadline,
                        job.tags,
                        job.link
                    ]);
                }
                return true;
            } catch (err) {
                console.error(err);
                return false;
            } finally {
                client.release();
            }
        },
        // @todo: Make this a cron to run sunday every 2 weeks
        archiveJob: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `SELECT job_id FROM job WHERE job_id = $1`;
                const resp = await client.query(query, [job_id]);
                if (resp.rows.length === 0) {
                    return false;
                }
                const archiveQuery = `INSERT INTO archive(job_id, scholar_id) VALUES ($1, 62)`;
                await client.query(archiveQuery, [job_id]);
                return true;
            } catch (err) {
                console.error(err);
                return false;
            } finally {
                client.release();
            }
        },
        archive: async (_: any, __: any, { dataSources }: any) => {
            const date = new Date();
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `SELECT job_id
                               FROM job
                               WHERE deadline < $1
                               AND job_id NOT IN (SELECT job_id FROM archive)`;
                const resp = await client.query(query, [date]);
                if (resp.rows.length === 0) {
                    return false;
                }
                const archiveQuery = `INSERT INTO archive(job_id, scholar_id) VALUES ($1, 62)`;
                for (let i = 0; i < resp.rows.length; i++) {
                    await client.query(archiveQuery, [resp.rows[i].job_id]);
                }
                return true;
            } catch (err) {
                console.error(err);
                return false;
            } finally {
                client.release();
            }
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
            try {
                await client.query(`DELETE FROM saved WHERE job_id = $1`, [job_id]);
                await client.query(`DELETE FROM job WHERE job_id = $1`, [job_id]);
                return true;
            } catch (err) {
                console.error(err);
                return false;
            } finally {
                client.release();
            }
        },
        addToFeatured: async (_: any, { job_ids }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `INSERT INTO featured(job_id) VALUES ($1)`;
                for (let i = 0; i < job_ids.length; i++) {
                    await client.query(query, [job_ids[i]]);
                }
                return true;
            } catch (err) {
                console.error(err);
                return false;
            } finally {
                client.release();
            }
        },
        removeFromFeatured: async (_: any, { job_ids }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `DELETE FROM featured WHERE job_id = $1`;
                for (let i = 0; i < job_ids.length; i++) {
                    await client.query(query, [job_ids[i]]);
                }
                return true;
            } catch (err) {
                console.error(err);
                return false;
            } finally {
                client.release();
            }
        },
        setLive: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                await client.query(`UPDATE job SET live = true WHERE job_id = $1`, [job_id]);
                return true;
            } catch (err) {
                console.error(err);
                return false;
            } finally {
                client.release();
            }
        },
        makePrivate: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                await client.query(`UPDATE job SET live = false WHERE job_id = $1`, [job_id]);
                return true;
            } catch (err) {
                console.error(err);
                return false;
            } finally {
                client.release();
            }
        },
        editJob: async (_: any, { job_id, fields }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const fieldUpdates = Object.entries(fields)
                    .map(([key, value], index) => `${key} = $${index + 1}`)
                    .join(', ');
                const query = `
                    UPDATE Job
                    SET ${fieldUpdates}
                    WHERE job_id = $${Object.keys(fields).length + 1}
                `;
                const values = Object.values(fields).concat(job_id);
                await client.query(query, values);
                return true;
            } catch (err) {
                console.error(err);
                return false;
            } finally {
                client.release();
            }
        }
    }
};

export default jobResolver;
