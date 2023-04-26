import { establishConnection } from '../utils';

const viewResolver = {
    Query: {
        getScholarsViews: async (_: any, { scholar_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT * FROM filterView WHERE scholar_id = $1`;
            const resp = await client.query(query, [scholar_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows;
        },
        // @todo: Need to fix to allow applicant year to be a part of the criteria
        getRelevantJobs: async (_: any, { scholar_id, view_id }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            // Get the relevant views for the scholar
            const viewQuery = `SELECT criteria FROM filterView WHERE scholar_id = $1 AND view_id = $2`;  
            const viewResp = await client.query(viewQuery, [scholar_id, view_id]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            let criteria = viewResp.rows[0].criteria;
            console.log(criteria);
        
            // Query based on the criteria
            let query = `SELECT * FROM search_jobs_by_criteria($1)`;
            const resp = await client.query(query, [criteria]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            const relevantJobs = resp.rows;

            return relevantJobs;
        }
    },
    Mutation: {
        createView: async (_: any, { view_id, scholar_id, view_name, criteria }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);

            const query = `INSERT INTO filterView (view_id, scholar_id, view_name, criteria) VALUES ($1, $2, $3, $4) RETURNING *`;
            const resp = await client.query(query, [view_id, scholar_id, view_name, criteria]).catch((err: any) => {
                console.error(err);
                client.release()
                return [];
            });
            client.release()
            return resp.rows[0];
        },
        addCriteria: async (_: any, { view_id, criteria }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
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
            const client = await establishConnection(db);
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
            const client = await establishConnection(db);
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