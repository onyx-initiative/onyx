const viewResolver = {
    Query: {
        getScholarsViews: async (_: any, { scholar_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `SELECT * FROM filterView WHERE scholar_id = $1`;
            const resp = await client.query(query, [scholar_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        },
        getRelevantJobs: async (_: any, { scholar_id, view_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()

            // Get the relevant views for the scholar
            const viewQuery = `SELECT * FROM filterView WHERE scholar_id = $1 AND view_id = ANY($2)`;  
            const viewResp = await client.query(viewQuery, [scholar_id, view_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            let criteria = viewResp.rows[0].criteria;
            for (let i = 1; i < viewResp.rows.length; i++) {
                criteria.push(...viewResp.rows[i].criteria);
            }
            // Query based on the criteria
            const query = `SELECT * 
                           FROM job 
                           WHERE company = ANY($1) 
                           OR job_title = ANY($1) 
                           OR city = ANY($1) 
                           OR province = ANY($1) 
                           OR job_type = ANY($1) 
                           OR salary_range = ANY($1) 
                           OR job_category = ANY($1) 
                           OR job_length = ANY($1) 
                           OR job_skills && $1::varchar[] 
                           OR applicant_year && $1::varchar[]`;
            const resp = await client.query(query, [criteria]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        }
    },
    Mutation: {
        createView: async (_: any, { scholar_id, view_name, criteria }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `INSERT INTO filterView (scholar_id, view_name, criteria) VALUES ($1, $2, $3) RETURNING *`;
            const resp = await client.query(query, [scholar_id, view_name, criteria]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        addCriteria: async (_: any, { view_id, criteria }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `UPDATE filterView SET criteria = criteria || $1 WHERE view_id = $2 RETURNING *`;
            const resp = await client.query(query, [criteria, view_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        removeCriteria: async (_: any, { view_id, criteria }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `UPDATE filterView SET criteria = array(select unnest(criteria) except select unnest($1::varchar[])) WHERE view_id = $2 RETURNING *`;
            const resp = await client.query(query, [criteria, view_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        deleteView: async (_: any, { view_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await db.connect()
            const query = `DELETE FROM filterView WHERE view_id = $1 RETURNING *`;
            const resp = await client.query(query, [view_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        }
    }
};

export default viewResolver;