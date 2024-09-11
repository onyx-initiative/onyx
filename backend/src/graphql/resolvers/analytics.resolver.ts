import { get } from "lodash";
import { establishConnection } from "../utils";
import { print } from "graphql";
import { getEmployerByName } from "../../integration/mock-data/employerData";
import { format } from "path";

const analyticsResolver = {
  Query: {
    getScholarsRankedByYear: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
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
          scholar_count: parseInt(row.count),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get scholars ranked by major");
      } finally {
        client.release();
      }
    },
    getApplyClicks: async (_: any, args: any, { dataSources }: any) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `
        SELECT 
            apply_clicks.scholar_id AS "scholarId", 
            apply_clicks.job_id AS "jobId", 
            scholar.name AS "scholarName", 
            scholar.email AS "scholarEmail", 
            apply_clicks.click_time,
            job.title AS "jobTitle", 
            employer.name AS "employerName" 
        FROM 
            apply_clicks 
        JOIN 
            scholar ON apply_clicks.scholar_id = scholar.scholar_id 
        JOIN 
            job ON apply_clicks.job_id = job.job_id 
        JOIN 
            employer ON job.employer_id = employer.employer_id`;
      try {
        const resp = await client.query(query);
        console.log(resp.rows);
        const formattedRows = resp.rows.map((row: any) => ({
          scholarId: row.scholarId,
          jobId: row.jobId,
          scholarName: row.scholarName,
          scholarEmail: row.scholarEmail,
          clickTime: new Date(row.click_time).toISOString(), // Convert timestamp to ISO string
          jobTitle: row.jobTitle,
          employerName: row.employerName,
        }));

        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get apply clicks");
      } finally {
        client.release();
      }
    },

    getScholarsRankedByMajor: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
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
          scholar_count: parseInt(row.count),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get scholars ranked by major");
      } finally {
        client.release();
      }
    },

    getPercentageOfScholarsWithAllowedNotifications: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      try {
        const query = `
                    SELECT COUNT(*) AS total_scholars, COUNT(*) FILTER (WHERE notifications = true) AS scholars_with_notifications
                    FROM scholar
                `;
        const resp = await client.query(query);
        const totalScholars = parseInt(resp.rows[0].total_scholars);
        const scholarsWithNotifications = parseInt(
          resp.rows[0].scholars_with_notifications
        );
        return Math.round((scholarsWithNotifications / totalScholars) * 100);
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error(
          "Failed to get percentage of scholars with allowed notifications"
        );
      } finally {
        client.release();
      }
    },

    getScholarApplyClicksRanked: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
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
          scholarEmail: row.email,
        }));
        return formattedRows;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch scholar job clicks");
      } finally {
        client.release();
      }
    },

    getScholarApplyClicksRankedWithDateRange: async (_: any, { startDate, endDate }: any, { dataSources }: any) => {
      const { db } = dataSources
      const client = await establishConnection(db)
      try {
        const query = `
                    SELECT scholar.scholar_id, scholar.name, scholar.email, COUNT(*) AS clicks
                    FROM apply_clicks 
                    JOIN scholar ON apply_clicks.scholar_id = scholar.scholar_id
                    WHERE apply_clicks.click_time BETWEEN $1 AND $2
                    GROUP BY scholar.scholar_id, scholar.name, scholar.email
                    ORDER BY clicks DESC
                `
        const resp = await client.query(query, [startDate, endDate])
        console.log(resp.rows)
        const formattedRows = resp.rows.map((row: any) => ({
          scholarId: row.scholar_id,
          apply_count: parseInt(row.clicks),
          scholarName: row.name,
          scholarEmail: row.email,
        }))
        return formattedRows
      } catch (err) {
        console.error(err)
        throw new Error('Failed to fetch scholar job clicks with date range')
      } finally {
        client.release()
      }
    },

    getScholarJobClicksRanked: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
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
          scholarEmail: row.email,
        }));
        return formattedRows;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch scholar job clicks");
      } finally {
        client.release();
      }
    },

    getScholarJobClicksRankedWithDateRange: async (_: any, { startDate, endDate }: any, { dataSources }: any) => {
      const { db } = dataSources
      const client = await establishConnection(db)
      try {
        const query = `
                    SELECT scholar.scholar_id, scholar.name, scholar.email, COUNT(*) AS clicks
                    FROM job_clicks 
                    JOIN scholar ON job_clicks.scholar_id = scholar.scholar_id
                    WHERE job_clicks.click_time BETWEEN $1 AND $2
                    GROUP BY scholar.scholar_id, scholar.name, scholar.email
                    ORDER BY clicks DESC
                `
        const resp = await client.query(query, [startDate, endDate])
        console.log(resp.rows)
        const formattedRows = resp.rows.map((row: any) => ({
          scholarId: row.scholar_id,
          job_count: parseInt(row.clicks),
          scholarName: row.name,
          scholarEmail: row.email,
        }))
        return formattedRows
      } catch (err) {
        console.error(err)
        throw new Error('Failed to fetch scholar job clicks with date range')
      } finally {
        client.release()
      }
    },

    getScholarClicksBySchool: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
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
          scholar_click_count: parseInt(row.scholar_click_count),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get scholar clicks by school");
      } finally {
        client.release();
      }
    },

    getScholarClicksBySchoolWithDateRange: async (_: any, { startDate, endDate }: any, { dataSources }: any) => {
      const { db } = dataSources
      const client = await establishConnection(db)
      try {
        const query = `
                    SELECT school, COUNT(*) AS scholar_click_count
                    FROM job_clicks JOIN scholar ON job_clicks.scholar_id = scholar.scholar_id
                    WHERE job_clicks.click_time BETWEEN $1 AND $2
                    GROUP BY school
                    ORDER BY scholar_click_count DESC
                `
        const resp = await client.query(query, [startDate, endDate])
        console.log(resp.rows)
        const formattedRows = resp.rows.map((row: any) => ({
          school: row.school,
          scholar_click_count: parseInt(row.scholar_click_count),
        }))
        return formattedRows
      } catch (err) {
        console.error('Error executing query:', err)
        throw new Error('Failed to get scholar clicks by school with date range')
      } finally {
        client.release()
      }
    },

    getScholarEmployerClicksRanked: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
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
          scholarEmail: row.email,
        }));
        return formattedRows;
      } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch scholar employer clicks");
      } finally {
        client.release();
      }
    },

    getScholarEmployerClicksRankedWithDateRange: async (_: any, { startDate, endDate }: any, { dataSources }: any) => {
      const { db } = dataSources
      const client = await establishConnection(db)
      try {
        const query = `
                    SELECT scholar.scholar_id, scholar.name, scholar.email, COUNT(*) AS clicks
                    FROM employer_clicks 
                    JOIN scholar ON employer_clicks.scholar_id = scholar.scholar_id
                    WHERE employer_clicks.click_time BETWEEN $1 AND $2
                    GROUP BY scholar.scholar_id, scholar.name, scholar.email
                    ORDER BY clicks DESC
                `
        const resp = await client.query(query, [startDate, endDate])
        console.log(resp.rows)
        const formattedRows = resp.rows.map((row: any) => ({
          scholarId: row.scholar_id,
          employer_count: parseInt(row.clicks),
          scholarName: row.name,
          scholarEmail: row.email,
        }))
        return formattedRows
      } catch (err) {
        console.error(err)
        throw new Error('Failed to fetch scholar employer clicks with date range')
      } finally {
        client.release()
      }
    },

    getJobClicks: async (_: any, args: any, { dataSources }: any) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT job.job_id, job.        title, job.employer_id, employer.name, job_clicks.click_time, scholar.name AS "scholar", scholar.email      FROM job_clicks
                        JOIN job ON job_clicks.job_id = job.job_id JOIN employer ON job.employer_id = employer.employer_id JOIN scholar ON job_clicks.scholar_id = scholar.scholar_id`;
      try {
        const resp = await client.query(query);

        const formattedRows = resp.rows.map((row: any) => ({
          employerId: row.employer_id,
          jobId: row.job_id,
          jobTitle: row.title,
          employerName: row.name,
          clickTime: new Date(row.click_time).toISOString(), // Convert timestamp to ISO string
          scholarName: row.scholar,
          scholarEmail: row.email,
        }));
        console.log("HERE2" + formattedRows);
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get job clicks");
      } finally {
        client.release();
      }
    },

    getJobClicksRanked: async (_: any, args: any, { dataSources }: any) => {
      const { db } = dataSources;
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
        const formattedRows = resp.rows.map((row: any) => ({
          employerId: row.employer_id,
          jobId: row.job_id,
          jobTitle: row.title,
          employerName: row.name,
          click_count: parseInt(row.click_count),
        }));

        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get job clicks");
      } finally {
        client.release();
      }
    },

    getEmployerClicksRanked: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
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
        const formattedRows = resp.rows.map((row: any) => ({
          employerId: row.employer_id,
          employerName: row.name,
          click_count: parseInt(row.click_count),
        }));

        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get employer clicks");
      } finally {
        client.release();
      }
    },

    getJobClicksRankedByApply: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
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
        const formattedRows = resp.rows.map((row: any) => ({
          employerId: row.employer_id,
          jobId: row.job_id,
          jobTitle: row.title,
          employerName: row.name,
          click_count: parseInt(row.click_count),
        }));

        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get job clicks");
      } finally {
        client.release();
      }
    },

    getJobTagRanking: async (_: any, args: any, { dataSources }: any) => {
      const { db } = dataSources;
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
          job_count: parseInt(row.job_count),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get job tag ranking");
      } finally {
        client.release();
      }
    },

    getJobTagRankingByClicks: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
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
          click_count: parseInt(row.click_count),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get job tag ranking by clicks");
      } finally {
        client.release();
      }
    },

    getJobTagRankingByClicksWithDateRange: async (_: any, { startDate, endDate }: any, { dataSources }: any) => {
      const { db } = dataSources
      const client = await establishConnection(db)
      try {
        const query = `
          SELECT unnest(tags) AS tag, COUNT(*) AS click_count
          FROM job_clicks
          JOIN job ON job_clicks.job_id = job.job_id
          WHERE tags IS NOT NULL and click_time BETWEEN $1 AND $2
          GROUP BY tag
          ORDER BY click_count DESC
        `
        const resp = await client.query(query, [startDate, endDate])
        const formattedRows = resp.rows.map((row: any) => ({
          tag: row.tag,
          click_count: parseInt(row.click_count),
        }))
        return formattedRows
      } catch (err) {
        console.error('Error executing query:', err)
        throw new Error('Failed to get job tag ranking by clicks with date range')
      } finally {
        client.release()
      }
    },

    getApplyClicksForScholar: async (
      _: any,
      { scholarId }: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `
          SELECT 
            apply_clicks.scholar_id AS "scholarId", 
            apply_clicks.job_id AS "jobId", 
            scholar.name AS "scholarName", 
            scholar.email AS "scholarEmail", 
            apply_clicks.click_time,
            job.title AS "jobTitle", 
            employer.name AS "employerName" 
          FROM 
            apply_clicks 
          JOIN 
            scholar ON apply_clicks.scholar_id = scholar.scholar_id 
          JOIN 
            job ON apply_clicks.job_id = job.job_id 
          JOIN 
            employer ON job.employer_id = employer.employer_id
          WHERE 
            apply_clicks.scholar_id = $1
        `;

      try {
        const resp = await client.query(query, [scholarId]);
        const formattedRows = resp.rows.map((row: any) => ({
          scholarId: row.scholarId,
          scholarName: row.scholarName,
          scholarEmail: row.scholarEmail,
          jobId: row.jobId,
          jobTitle: row.jobTitle,
          employerName: row.employerName,
          clickTime: new Date(row.click_time).toISOString(),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get apply clicks for scholar");
      } finally {
        client.release();
      }
    },
    getEmployerClicksForScholar: async (
      _: any,
      { scholarId }: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `
          SELECT 
            employer_clicks.employer_id, 
            employer.name AS "employerName",
            employer_clicks.click_time,
            employer_clicks.scholar_id,
            scholar.name AS "scholarName",
            scholar.email AS "scholarEmail"
          FROM 
            employer_clicks
          JOIN 
            employer ON employer_clicks.employer_id = employer.employer_id
          JOIN 
            scholar ON employer_clicks.scholar_id = scholar.scholar_id
          WHERE 
            employer_clicks.scholar_id = $1
        `;

      try {
        const resp = await client.query(query, [scholarId]);
        const formattedRows = resp.rows.map((row: any) => ({
          employerId: row.employer_id,
          employerName: row.employerName,
          clickTime: new Date(row.click_time).toISOString(),
          scholarId: row.scholar_id,
          scholarName: row.scholarName,
          scholarEmail: row.scholarEmail,
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get employer clicks for scholar");
      } finally {
        client.release();
      }
    },
    getJobClicksForScholar: async (
      _: any,
      { scholarId }: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `
          SELECT 
            job.job_id,
            job.title AS "jobTitle",
            job.employer_id,
            employer.name AS "employerName",
            job_clicks.click_time,
            scholar.name AS "scholarName",
            scholar.email AS "scholarEmail"
          FROM 
            job_clicks
          JOIN 
            job ON job_clicks.job_id = job.job_id
          JOIN 
            employer ON job.employer_id = employer.employer_id
          JOIN 
            scholar ON job_clicks.scholar_id = scholar.scholar_id
          WHERE 
            job_clicks.scholar_id = $1
        `;

      try {
        const resp = await client.query(query, [scholarId]);
        const formattedRows = resp.rows.map((row: any) => ({
          jobId: row.job_id,
          jobTitle: row.jobTitle,
          employerId: row.employer_id,
          employerName: row.employerName,
          clickTime: new Date(row.click_time).toISOString(),
          scholarName: row.scholarName,
          scholarEmail: row.scholarEmail,
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get job clicks for scholar");
      } finally {
        client.release();
      }
    },

    getJobLocationRanking: async (_: any, args: any, { dataSources }: any) => {
      const { db } = dataSources;
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
          job_count: parseInt(row.job_count),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get job location ranking");
      } finally {
        client.release();
      }
    },

    getJobDeadlineRankingByMonth: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
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
          job_count: parseInt(row.job_count),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get job deadline ranking by month");
      } finally {
        client.release();
      }
    },

    getEmployerClicks: async (_: any, args: any, { dataSources }: any) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT  employer_clicks.employer_id, employer.name, employer_clicks.click_time, employer_clicks.scholar_id, scholar.name as "scholar", scholar.email FROM employer_clicks
                 JOIN employer ON employer_clicks.employer_id = employer.employer_id JOIN scholar ON employer_clicks.scholar_id = scholar.scholar_id`;
      try {
        const resp = await client.query(query);
        console.log(resp.rows);
        const formattedRows = resp.rows.map((row: any) => ({
          scholarId: row.scholar_id,
          scholarName: row.scholar,
          scholarEmail: row.email,
          employerId: row.employer_id,
          employerName: row.name,
          clickTime: new Date(row.click_time).toISOString(), // Convert timestamp to ISO string
        }));

        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get employer clicks");
      } finally {
        client.release();
      }
    },

    getEmployerJobPostingsRanking: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
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
          job_posting_click_count: parseInt(row.job_click_count),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get employer job postings ranking");
      } finally {
        client.release();
      }
    },

    getEmployerJobPostingsRankingWithDateRange: async (_: any, { startDate, endDate }: any, { dataSources }: any) => {
      const { db } = dataSources
      const client = await establishConnection(db)
      try {
        const query = `
                    SELECT employer.name, employer.employer_id, COUNT(*) AS job_click_count
                    FROM job JOIN job_clicks ON job.job_id = job_clicks.job_id JOIN employer ON job.employer_id = employer.employer_id
                    WHERE live = true AND job_clicks.click_time BETWEEN $1 AND $2
                    GROUP BY employer.employer_id
                    ORDER BY job_click_count DESC
                `
        const resp = await client.query(query, [startDate, endDate])
        console.log(resp.rows)
        const formattedRows = resp.rows.map((row: any) => ({
          employerName: row.name,
          employerId: row.employer_id,
          job_posting_click_count: parseInt(row.job_click_count),
        }))
        return formattedRows
      } catch (err) {
        console.error('Error executing query:', err)
        throw new Error('Failed to get employer job postings ranking with date range')
      } finally {
        client.release()
      }
    },

    getNumDaysSinceLastJobPostByEmployer: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
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
          days_since_last_post: parseInt(row.days_since_last_post),
        }));
        console.log(resp.rows);
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error(
          "Failed to get number of days since last job post by employer"
        );
      } finally {
        client.release();
      }
    },

    getMostPopularJobTagsByEmployer: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
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
          job_count: parseInt(row.job_count),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get most popular job tags by employer");
      } finally {
        client.release();
      }
    },

    getCountJobClicksLastWeek: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM job_clicks WHERE click_time >= NOW() - INTERVAL '1 week'`;
      try {
        const resp = await client.query(query);
        const formatted_response = {
          count: parseInt(resp.rows[0].count),
        };
        return formatted_response;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get count of job clicks in the last week");
      } finally {
        client.release();
      }
    },
    getCountEmployerClicksLastWeek: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM employer_clicks WHERE click_time >= NOW() - INTERVAL '1 week'`;
      try {
        const resp = await client.query(query);
        const formatted_response = {
          count: parseInt(resp.rows[0].count),
        };
        return formatted_response;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error(
          "Failed to get count of employer clicks in the last week"
        );
      } finally {
        client.release();
      }
    },
    getCountApplyClicksLastWeek: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM apply_clicks WHERE click_time >= NOW() - INTERVAL '1 week'`;
      try {
        const resp = await client.query(query);
        const formatted_response = {
          count: parseInt(resp.rows[0].count),
        };
        return formatted_response;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get count of apply clicks in the last week");
      } finally {
        client.release();
      }
    },
    getCountJobClicksLastMonth: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM job_clicks WHERE click_time >= NOW() - INTERVAL '1 month'`;
      try {
        const resp = await client.query(query);
        const formatted_response = {
          count: parseInt(resp.rows[0].count),
        };
        return formatted_response;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get count of job clicks in the last month");
      } finally {
        client.release();
      }
    },
    getCountEmployerClicksLastMonth: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM employer_clicks WHERE click_time >= NOW() - INTERVAL '1 month'`;
      try {
        const resp = await client.query(query);
        const formatted_response = {
          count: parseInt(resp.rows[0].count),
        };
        return formatted_response;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error(
          "Failed to get count of employer clicks in the last month"
        );
      } finally {
        client.release();
      }
    },
    getCountApplyClicksLastMonth: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM apply_clicks WHERE click_time >= NOW() - INTERVAL '1 month'`;
      try {
        const resp = await client.query(query);
        const formatted_response = {
          count: parseInt(resp.rows[0].count),
        };
        return formatted_response;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error(
          "Failed to get count of apply clicks in the last month"
        );
      } finally {
        client.release();
      }
    },
    getCountJobClicksLastYear: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM job_clicks WHERE click_time >= NOW() - INTERVAL '1 year'`;
      try {
        const resp = await client.query(query);
        const formatted_response = {
          count: parseInt(resp.rows[0].count),
        };
        return formatted_response;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get count of job clicks in the last year");
      } finally {
        client.release();
      }
    },
    getCountEmployerClicksLastYear: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM employer_clicks WHERE click_time >= NOW() - INTERVAL '1 year'`;
      try {
        const resp = await client.query(query);
        const formatted_response = {
          count: parseInt(resp.rows[0].count),
        };
        return formatted_response;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error(
          "Failed to get count of employer clicks in the last year"
        );
      } finally {
        client.release();
      }
    },
    getCountApplyClicksLastYear: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM apply_clicks WHERE click_time >= NOW() - INTERVAL '1 year'`;
      try {
        const resp = await client.query(query);
        const formatted_response = {
          count: parseInt(resp.rows[0].count),
        };
        return formatted_response;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get count of apply clicks in the last year");
      } finally {
        client.release();
      }
    },

    getNumberOfAllowedScholars: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM allowedscholars`;
      try {
        const resp = await client.query(query);
        console.log(typeof resp.rows[0].count);
        console.log(resp.rows[0].count);
        return parseInt(resp.rows[0].count);
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get number of allowed scholars");
      } finally {
        client.release();
      }
    },
    getNumberOfActiveScholars: async (
      _: any,
      args: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `SELECT COUNT(*) FROM scholar`;
      try {
        const resp = await client.query(query);
        console.log(typeof resp.rows[0].count);
        console.log(resp.rows[0].count);
        return parseInt(resp.rows[0].count);
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get number of active scholars");
      } finally {
        client.release();
      }
    },

    getClicksCustomAnalytics: async (
      _: any,
      { startDate, endDate, interval, clickType}: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      let dateFormat;
      switch (interval) {
        case "daily":
          dateFormat = "YYYY-MM-DD";
          break;
        case "weekly":
          dateFormat = "YYYY-MM W"; // Year and week number
          break;
        case "monthly":
          dateFormat = "YYYY-MM";
          break;
        case "yearly":
          dateFormat = "YYYY";
          break;
        default:
          throw new Error(
            "Invalid interval. Choose from 'daily', 'weekly', 'monthly', or 'yearly'."
          );
      }
      let tableName;
      switch (clickType) {
        case "job":
          tableName = "job_clicks";
          break;
        case "employer":
          tableName = "employer_clicks";
          break;
        case "apply":
          tableName = "apply_clicks";
          break;
        default:
          throw new Error(
            "Invalid click type. Choose from 'job', 'employer', or 'apply'."
          );
      }
      
      const query = `SELECT
                    TO_CHAR(click_time, $3) as date,
                    count(*) as count
                FROM
                    ${tableName}
                WHERE
                    click_time BETWEEN $1 AND $2
                GROUP BY
                    date
                ORDER BY
                    date;`;
      try {
        const resp = await client.query(query, [startDate, endDate, dateFormat]);
        const formattedRows = resp.rows.map((row: any) => ({
          date: row.date,
          count: parseInt(row.count),
        }));
        return formattedRows;
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to get custom analytics");
      } finally {
        client.release();
      }
    },
  },

  Mutation: {
    logJobClick: async (
      _: any,
      { scholarId, jobId }: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      try {
        console.log("Received scholarId:", scholarId, "Received jobId:", jobId); // Log received parameters
        const query = `INSERT INTO job_clicks (scholar_id, job_id, click_time) VALUES ($1, $2, NOW()) RETURNING scholar_id, job_id, click_time`;
        const resp = await client.query(query, [scholarId, jobId]);
        console.log("Inserted job click:", resp.rows[0]);
      } catch (err) {
        console.error("Error executing query:", err);
        throw new Error("Failed to log job click");
      } finally {
        client.release();
      }
    },

    logEmployerClick: async (
      _: any,
      { scholarId, employerId }: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `INSERT INTO employer_clicks (scholar_id, employer_id, click_time) VALUES ($1, $2, NOW()) RETURNING *`;
      const resp = await client
        .query(query, [scholarId, employerId])
        .catch((err: any) => {
          console.error(err);
          client.release();
          return [];
        });
      client.release();
      return resp.rows[0];
    },

    logApplyClick: async (
      _: any,
      { scholarId, jobId }: any,
      { dataSources }: any
    ) => {
      const { db } = dataSources;
      const client = await establishConnection(db);
      const query = `INSERT INTO apply_clicks (scholar_id, job_id, click_time) VALUES ($1, $2, NOW()) RETURNING *`;
      const resp = await client
        .query(query, [scholarId, jobId])
        .catch((err: any) => {
          console.error(err);
          client.release();
          return [];
        });
      client.release();
      return resp.rows[0];
    },
  },
};

export default analyticsResolver;
