import type { NextApiRequest, NextApiResponse } from 'next'
import { render } from '@react-email/render';
import sendgrid from '@sendgrid/mail';
import { Email } from '../../emails/jobUpdate';
import { Job } from '../../../backend/src/types/db.types';

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

    // TODO: Call the db to fetch users and send them an email
//   res.status(200).json({ message: 'Hello from Next.js!' })

    // 1. Set the sendgrid api key
    sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

    // 2. Render the email
    // @todo: Loop over all users who have subscribed to the job updates
    // and have jobs that match their filters
    // Note: Since this is a .ts file, need to send using Node syntax
    const emailHtml = render(Email({ scholarName: 'Cole', jobs: sampleJobs as Job[] }));

    // 3. Configure the email
    // This should also be in the loop
    const options = {
        from: 'mdawes28@gmail.com',
        to: 'cole.purboo@mail.utoronto.ca',
        subject: 'Onyx Job Weekly Update',
        html: emailHtml,
      };
      
    // 4. Send the email
    const sent = sendgrid.send(options);
    return res.status(200).json({ message: 'Email sent!' });
}

const sampleJobs = [{
    job_id: "1",
    employer_id: "1",
    admin_id: "1",
    title: "Software Engineer",
    description: "This is a job description. This one is longer than the other one to test if it changes the style.",
    job_type: "Full Time",
    location: "Toronto, ON",
    applicant_year: [3],
    deadline: new Date(),
    date_posted: new Date(),
    total_views: 0,
    tags: [],
    live: false,        
  },
  {
    job_id: "1",
    employer_id: "1",
    admin_id: "1",
    title: "Software Engineer",
    description: "This is a job description",
    job_type: "Full Time",
    location: "Toronto, ON",
    applicant_year: [3],
    deadline: new Date(),
    date_posted: new Date(),
    total_views: 0,
    tags: [],
    live: false,        
  }
  ]