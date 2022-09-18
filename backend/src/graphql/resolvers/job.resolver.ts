const jobResolver = {
    Query: {
        getJobs: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM job WHERE archived = false`;
            const resp = await client.query(query).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            return resp.rows;
        },
        getJobById: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM job WHERE job_id = $1 AND archived = false`;
            const resp = await client.query(query, [job_id]).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            return resp.rows[0];
        },
        getJobsByEmployerId: async (_: any, { employer_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM job WHERE employer_id = $1 AND archived = false`;
            const resp = await client.query(query, [employer_id]).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            return resp.rows;
        },
        getJobByFilter: async (_: any, { column, filter }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM job WHERE ${column} = $1 AND archived = false`;
            const resp = await client.query(query, [filter]).catch((err: any) => {
                console.error(err);
                client.release()
            });
            client.release()
            return resp.rows;
        },
    },
    Mutation: {
        createJob: async (_: any, { 
            jobTitle,
            employer_id,
            jobDescription,
            company,
            city,
            province,
            jobSource,
            totalViews,
            totalApplications,
            jobType,
            jobCategory,
            jobSkills,
            salaryRange,
            jobLength,
            postDate,
            applicationDeadline,
            contactEmail,
            feature,
            additionalInstructions,
            howToApply,
            applicantYear }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `INSERT INTO job (
                job_title,
                employer_id,
                description,
                company,
                city,
                province,
                job_source,
                total_views,
                total_applications,
                job_type,
                job_category,
                job_skills,
                salary_range,
                job_length,
                created_at,
                application_deadline,
                contact_email,
                feature,
                additional_info,
                how_to_apply,
                applicant_year,
                archived
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *`;
            const resp = await client.query(query, 
                [jobTitle,
                employer_id,
                jobDescription,
                company,
                city,
                province,
                jobSource,
                totalViews,
                totalApplications,
                jobType,
                jobCategory,
                jobSkills,
                salaryRange,
                jobLength,
                postDate,
                applicationDeadline,
                contactEmail,
                feature,
                additionalInstructions,
                howToApply,
                applicantYear,
                false]).catch((err: any) => {
                console.log(err);
                client.release()
                return 
            });
            client.release()
            return resp.rows[0];
        },
        // Figure out how to archive by timestamp
        archiveJob: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `UPDATE job SET archived = true WHERE job_id = $1`;
            await client.query(query, [job_id]).catch((err: any) => {
                console.log(err);
                client.release()
                return false
            });
            client.release()
            return true;
        },
        incrementViews: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `UPDATE job SET totalViews = totalViews + 1 WHERE job_id = $1`;
            await client.query(query, [job_id]).catch((err: any) => {
                console.log(err);
                client.release()
                return false
            });
            client.release()
            return true;
        },
        incrementApplications: async (_: any, { job_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `UPDATE job SET totalApplications = totalApplications + 1 WHERE job_id = $1`;
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