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
            const formattedColumn = formantColumn(column);
            let query = `SELECT * FROM scholar WHERE ${formattedColumn} = $1`;
            if (column === 'skills') {
                query = `SELECT * FROM scholar WHERE ${column} = ANY($1)`
            }
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
            current,
            gradYear,
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
            const query = `INSERT INTO scholar (name, email, job_applications, work_history, current_scholar, year, school, major, city, province, registration_date, skills, notifications) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`;
            const resp = await client.query(query, [name, email, jobApplications, workHistory, current, gradYear, school, major, city, province, registrationDate, skills, notifications]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        updateScholar: async (_: any, { scholar_id, column, new_value }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()

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
            const client = await db.connect()
            const query = `UPDATE scholar SET current_scholar = $1 WHERE scholar_id = $2 RETURNING *`;
            const resp = await client.query(query, [false, scholar_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return false;
            });
            client.release()
            return true;
        }
    }
}

const formantColumn = (column: string) => {
    if (column === "jobApplications") {
        return "job_applications";
    } else if (column === "workHistory") {
        return "work_history";
    } else if (column === "current") {
        return "current_scholar";
    } else if (column === "gradYear") {
        return "year";
    } else if (column === "registrationDate") {
        return "registration_date";
    }
    return column;
}

export default scholarResolver;