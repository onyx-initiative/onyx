const scholarResolver = {
    Query: {
        getScholars: async (_: any, __: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
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
            const client = await db.connect()
            const query = `SELECT * FROM scholar WHERE scholar_id = $1`;
            const resp = await client.query(query, [scholar_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        getScholarByFilter: async (_: any, { column, filter }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM scholar WHERE ${column} = $1`;
            const resp = await client.query(query, [filter]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        }
    },
    Mutation: {
        createScholar: async (_: any, {
            name,
            email,
            jobApplications,
            workHistory,
            status,
            profilePicture,
            year,
            school,
            major,
            city,
            province,
            registrationDate,
            skills,
            notifications
            }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `INSERT INTO scholar (name, email, job_applications, work_history, status, profile_picture, year, school, major, city, province, registration_date, skills, notifications) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;
            const resp = await client.query(query, [name, email, jobApplications, workHistory, status, profilePicture, year, school, major, city, province, registrationDate, skills, notifications]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        updateScholar: async (_: any, { column, new_value }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()

            let query;
            if (column !== 'workHistory' || column !== 'skills' || column !== 'status') {
                query = `UPDATE scholar SET ${column} = $1`;
            } else if (column === 'workHistory' || column === 'skills') {
                query = `UPDATE scholar SET ${column} = ${column} || $1`;
            }

            if (column === 'notifications') {
                new_value = (new_value === 'true');
            }

            const resp = await client.query(query, [new_value]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        archiveScholar: async (_: any, { scholar_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `UPDATE scholar SET status = ALUMNI WHERE scholar_id = $1`;
            const resp = await client.query(query, [scholar_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        }
    }
}

export default scholarResolver;