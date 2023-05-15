// Scaffolding for hubspot cron job
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseData } from './cron';

export default async function scholarHandler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {

    // SQL Query to add the scholar to the allowed list
    const addScholarQuery = 'INSERT INTO AllowedScholars (email) VALUES ($1)';

    // Add the call to the hubspot api here
    // Retrieve all of the scholars from the hubspot api

    // Add the scholars to the db
    // @todo: Add a function on backend to batch add scholars

    // Return the response
    return res.status(200).json({ message: 'Scholars added!' });
}