import { get } from 'lodash';
import { establishConnection } from '../utils';
import { print } from 'graphql';

const analyticsResolver = {
    Query: {

        getScholarsRankedByYear: async (_: any,args: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT year, COUNT(*) AS count
                    FROM scholar
                    GROUP BY year
                    ORDER BY count DESC
                `;
                const resp = await client.query(query);
                const formattedRows = resp.rows.map((row: any) => ({
                    year: row.year,
                    scholar_count: parseInt(row.count)
                }));
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get scholars ranked by major");
            }
            finally {
                client.release();
            }
        },

        getScholarsRankedByMajor: async (_: any,args: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT major, COUNT(*) AS count
                    FROM scholar
                    GROUP BY major
                    ORDER BY count DESC
                `;
                const resp = await client.query(query);
                const formattedRows = resp.rows.map((row: any) => ({
                    major: row.major,
                    scholar_count: parseInt(row.count)
                }));
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get scholars ranked by major");
            }
            finally {
                client.release();
            }
        },
        
        getPercentageOfScholarsWithAllowedNotifications: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT COUNT(*) AS total_scholars, COUNT(*) FILTER (WHERE notifications = true) AS scholars_with_notifications
                    FROM scholar
                `;
                const resp = await client.query(query);
                const totalScholars = parseInt(resp.rows[0].total_scholars);
                const scholarsWithNotifications = parseInt(resp.rows[0].scholars_with_notifications);
                return Math.round((scholarsWithNotifications / totalScholars) * 100);
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get percentage of scholars with allowed notifications");
            }
            finally {
                client.release();
            }
        },

        getScholarApplyClicksRanked: async (_: any, args: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT scholar.scholar_id, scholar.name, scholar.email, COUNT(*) AS clicks
                    FROM apply_clicks 
                    JOIN scholar ON apply_clicks.scholar_id = scholar.scholar_id
                    GROUP BY scholar.scholar_id, scholar.name, scholar.email
                    ORDER BY clicks DESC
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    scholarId: row.scholar_id,
                    apply_count: parseInt(row.clicks),
                    scholarName: row.name,
                    scholarEmail: row.email
                }));
                return formattedRows;
            } catch (err) {
                console.error(err);
                throw new Error("Failed to fetch scholar job clicks");
            } finally {
                client.release();
            }
        },

        getScholarJobClicksRanked: async (_: any, args: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT scholar.scholar_id, scholar.name, scholar.email, COUNT(*) AS clicks
                    FROM job_clicks 
                    JOIN scholar ON job_clicks.scholar_id = scholar.scholar_id
                    GROUP BY scholar.scholar_id, scholar.name, scholar.email
                    ORDER BY clicks DESC
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    scholarId: row.scholar_id,
                    job_count: parseInt(row.clicks),
                    scholarName: row.name,
                    scholarEmail: row.email
                }));
                return formattedRows;
            } catch (err) {
                console.error(err);
                throw new Error("Failed to fetch scholar job clicks");
            } finally {
                client.release();
            }
        },
        

        getScholarClicksBySchool: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT school, COUNT(*) AS scholar_click_count
                    FROM job_clicks JOIN scholar ON job_clicks.scholar_id = scholar.scholar_id
                    GROUP BY school
                    ORDER BY scholar_click_count DESC
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    school: row.school,
                    scholar_click_count: parseInt(row.scholar_click_count)
                }));
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get scholar clicks by school");
            }
            finally {
                client.release();
            }
        },

        getScholarEmployerClicksRanked: async (_: any, args: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT scholar.scholar_id, scholar.name, scholar.email, COUNT(*) AS clicks
                    FROM employer_clicks 
                    JOIN scholar ON employer_clicks.scholar_id = scholar.scholar_id
                    GROUP BY scholar.scholar_id, scholar.name, scholar.email
                    ORDER BY clicks DESC
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    scholarId: row.scholar_id,
                    employer_count: parseInt(row.clicks),
                    scholarName: row.name,
                    scholarEmail: row.email
                }));
                return formattedRows;
            } catch (err) {
                console.error(err);
                throw new Error("Failed to fetch scholar employer clicks");
            } finally {
                client.release();
            }
        },

        getJobClicks: async (_: any, args: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT job.job_id, job.        title, job.employer_id, employer.name, job_clicks.click_time        FROM job_clicks
                        JOIN job ON job_clicks.job_id = job.job_id JOIN employer ON job.employer_id = employer.employer_id`;
            try {
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row:any) => ({
                    employerId: row.employer_id,
                    jobId: row.job_id,
                    jobTitle: row.title,
                    employerName: row.name,
                    clickTime: new Date(row.click_time).toISOString() // Convert timestamp to ISO string
                  }));
                  
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get job clicks");
            }
            finally {
                client.release();
            }
        },
        
        getJobClicksRanked: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            const query = `
            SELECT job.job_id, job.title, job.employer_id, employer.name, count(job_clicks.job_id) as click_count
            FROM job_clicks
            JOIN job ON job_clicks.job_id = job.job_id JOIN employer ON job.employer_id = employer.employer_id
            GROUP BY job.job_id, employer.name, job.title, job.employer_id
            ORDER BY click_count DESC
            `;
            try {
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row:any) => ({
                    employerId: row.employer_id,
                    jobId: row.job_id,
                    jobTitle: row.title,
                    employerName: row.name,
                    click_count: parseInt(row.click_count),
                  }));
                  
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get job clicks");
            }
            finally {
                client.release();
            }
        },

        getEmployerClicksRanked: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            const query = `
            SELECT employer.employer_id, employer.name, count(employer_clicks.employer_id) as click_count
            FROM employer_clicks
            JOIN employer ON employer_clicks.employer_id = employer.employer_id
            GROUP BY employer.employer_id, employer.name
            ORDER BY click_count DESC
            `;
            try {
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row:any) => ({
                    employerId: row.employer_id,
                    employerName: row.name,
                    click_count: parseInt(row.click_count),
                  }));
                  
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get employer clicks");
            }
            finally {
                client.release();
            }
        },
        
        getJobClicksRankedByApply: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            const query = `
            SELECT job.job_id, job.title, job.employer_id, employer.name, count(apply_clicks.job_id) as click_count
            FROM apply_clicks
            JOIN job ON apply_clicks.job_id = job.job_id JOIN employer ON job.employer_id = employer.employer_id
            GROUP BY job.job_id, employer.name, job.title, job.employer_id
            ORDER BY click_count DESC
            `;
            try {
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row:any) => ({
                    employerId: row.employer_id,
                    jobId: row.job_id,
                    jobTitle: row.title,
                    employerName: row.name,
                    click_count: parseInt(row.click_count),
                  }));
                  
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get job clicks");
            }
            finally {
                client.release();
            }
        },

        getJobTagRanking: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT unnest(tags) AS tag, COUNT(*) AS job_count
                    FROM job
                    WHERE tags IS NOT NULL
                    GROUP BY tag
                    ORDER BY job_count DESC
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    tag: row.tag,
                    job_count: parseInt(row.job_count)
                }));
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get job tag ranking");
            }
            finally {
                client.release();
            }
        },

        getJobTagRankingByClicks: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT unnest(tags) AS tag, COUNT(*) AS click_count
                    FROM job_clicks
                    JOIN job ON job_clicks.job_id = job.job_id
                    WHERE tags IS NOT NULL
                    GROUP BY tag
                    ORDER BY click_count DESC
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    tag: row.tag,
                    click_count: parseInt(row.click_count)
                }));
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get job tag ranking by clicks");
            }
            finally {
                client.release();
            }
        },

        getJobLocationRanking: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT location, COUNT(*) AS job_count
                    FROM job
                    WHERE location IS NOT NULL
                    GROUP BY location
                    ORDER BY job_count DESC
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    location: row.location,
                    job_count: parseInt(row.job_count)
                }));
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get job location ranking");
            }
            finally {
                client.release();
            }
        },

        getJobDeadlineRankingByMonth: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                SELECT 
                CASE 
                    WHEN EXTRACT(MONTH FROM deadline) = 1 THEN 'January'
                    WHEN EXTRACT(MONTH FROM deadline) = 2 THEN 'February'
                    WHEN EXTRACT(MONTH FROM deadline) = 3 THEN 'March'
                    WHEN EXTRACT(MONTH FROM deadline) = 4 THEN 'April'
                    WHEN EXTRACT(MONTH FROM deadline) = 5 THEN 'May'
                    WHEN EXTRACT(MONTH FROM deadline) = 6 THEN 'June'
                    WHEN EXTRACT(MONTH FROM deadline) = 7 THEN 'July'
                    WHEN EXTRACT(MONTH FROM deadline) = 8 THEN 'August'
                    WHEN EXTRACT(MONTH FROM deadline) = 9 THEN 'September'
                    WHEN EXTRACT(MONTH FROM deadline) = 10 THEN 'October'
                    WHEN EXTRACT(MONTH FROM deadline) = 11 THEN 'November'
                    WHEN EXTRACT(MONTH FROM deadline) = 12 THEN 'December'
                END AS month_name, 
                COUNT(*) AS job_count
            FROM 
                job
            WHERE 
                deadline IS NOT NULL
            GROUP BY 
                month_name
            ORDER BY 
                job_count DESC;
            
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    month: row.month_name,
                    job_count: parseInt(row.job_count)
                }));
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get job deadline ranking by month");
            }
            finally {
                client.release();
            }
        },
        
        getEmployerClicks: async (_: any, args: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            const query = `SELECT  employer_clicks.employer_id, employer.name, employer_clicks.click_time, employer_clicks.scholar_id FROM employer_clicks
                 JOIN employer ON employer_clicks.employer_id = employer.employer_id`;
            try {
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row:any) => ({
                    scholarId: row.scholar_id,
                    employerId: row.employer_id,
                    employerName: row.name,
                    clickTime: new Date(row.click_time).toISOString() // Convert timestamp to ISO string
                  }));
                  
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get employer clicks");
            }
            finally {
                client.release();
            };
        },

        getEmployerJobPostingsRanking: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT employer.name, employer.employer_id, COUNT(*) AS job_click_count
                    FROM job JOIN job_clicks ON job.job_id = job_clicks.job_id JOIN employer ON job.employer_id = employer.employer_id
                    WHERE live = true
                    GROUP BY employer.employer_id
                    ORDER BY job_click_count DESC
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    employerName: row.name,
                    employerId: row.employer_id,
                    job_posting_click_count: parseInt(row.job_click_count)
                }));
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get employer job postings ranking");
            }
            finally {
                client.release();
            }
        },

        getNumDaysSinceLastJobPostByEmployer: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT employer.employer_id, employer.name AS employer_name, 
                    EXTRACT(DAY FROM NOW() - MAX(job.date_posted)) AS days_since_last_post
                    FROM employer
                    JOIN job ON employer.employer_id = job.employer_id
                    WHERE live = true
                    GROUP BY employer.employer_id
                    ORDER BY days_since_last_post DESC
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    employerId: row.employer_id,
                    employerName: row.employer_name,
                    days_since_last_post: parseInt(row.days_since_last_post)
                }));
                console.log(resp.rows);
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get number of days since last job post by employer");
            }
            finally {
                client.release();
            }
        },

        getMostPopularJobTagsByEmployer: async (_: any, args: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            try {
                const query = `
                    SELECT employer.employer_id, employer.name AS employer_name, unnest(tags) AS tag, COUNT(*) AS job_count
                    FROM job
                    JOIN employer ON job.employer_id = employer.employer_id
                    WHERE live = true
                    GROUP BY employer.employer_id, tag
                    ORDER BY job_count DESC
                `;
                const resp = await client.query(query);
                console.log(resp.rows);
                const formattedRows = resp.rows.map((row: any) => ({
                    employer: row.employer_name,
                    tag: row.tag,
                    job_count: parseInt(row.job_count)
                }));
                return formattedRows;
            }
            catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to get most popular job tags by employer");
            }
            finally {
                client.release();
            }
        }
    },

    Mutation: {
        logJobClick: async (_: any, { scholarId, jobId }: any, { dataSources }: any) => {
            const { db } = dataSources;
            const client = await establishConnection(db);
            try {
                console.log("Received scholarId:", scholarId, "Received jobId:", jobId);  // Log received parameters
                const query = `INSERT INTO job_clicks (scholar_id, job_id, click_time) VALUES ($1, $2, NOW()) RETURNING scholar_id, job_id, click_time`;
                const resp = await client.query(query, [scholarId, jobId]);
                return {
                    scholarId: resp.rows[0].scholar_id,
                    jobId: resp.rows[0].job_id,
                    clickTime: resp.rows[0].click_time
                };
            } catch (err) {
                console.error("Error executing query:", err);
                throw new Error("Failed to log job click");
            } finally {
                client.release();
            }
        },
        

        logEmployerClick: async (_: any, { scholarId, employerId }: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            const query = `INSERT INTO employer_clicks (scholar_id, employer_id, click_time) VALUES ($1, $2, NOW()) RETURNING *`;
            const resp = await client.query(query, [scholarId, employerId]).catch((err: any) => {
                console.error(err);
                client.release();
                return [];
            });
            client.release();
            return resp.rows[0];

        },

        logApplyClick: async (_: any, { scholarId, jobId }: any, { dataSources }: any) => {
            const {db} = dataSources;
            const client = await establishConnection(db);
            const query = `INSERT INTO apply_clicks (scholar_id, job_id, click_time) VALUES ($1, $2, NOW()) RETURNING *`;
            const resp = await client.query(query, [scholarId, jobId]).catch((err: any) => {
                console.error(err);
                client.release();
                return [];
            });
            client.release();
            return resp.rows[0];
        }
    }
};

export default analyticsResolver;
        