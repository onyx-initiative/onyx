  import type { NextApiRequest, NextApiResponse } from 'next'
import { render } from '@react-email/render';
import sendgrid from '@sendgrid/mail';
import { Email, Recommendation } from '../../emails/jobUpdate';
import { Job } from '../../../backend/src/types/db.types';

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

    // TODO: Call the db to fetch users and send them an email

    // fetch the data from the db
    const recommendedJobs = await getRecommendedJobs();

    // Format the data
    const formattedJobs = parseRecommendedJobs(recommendedJobs.data.getRecommendedJobs as Recommendation[]);
    // console.log(formattedJobs);

    // 1. Set the sendgrid api key
    sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

    // 2. Render the email
    // Note: Since this is a .ts file, need to send using Node syntax
    let emailsSent = true;
    for (let key in formattedJobs) {
      const name = key.split(',')[0];
      const email = key.split(',')[1];

      const emailHtml = render(Email({ scholarName: name, jobs: formattedJobs[key] as Recommendation[] }));
      
      // Configure the options for the email
      const options = {
        from: 'mdawes28@gmail.com',
        to: 'michaelanthony.dawes@mail.utoronto.ca',
        subject: 'Onyx Job Weekly Update',
        html: emailHtml,
      };

      // 3. Send the email
      const sent = await sendgrid.send(options);
      if (!sent) {
        emailsSent = false;
      }
    }

    if (!emailsSent) {
      return res.status(500).json({ message: 'Email failed to send!' });
    }
    return res.status(200).json({ message: 'Email sent!' });
}

// Helper functions for parsing the data from the db
const getRecommendedJobs = async () => {
  const recommendedJobs = await fetch('https://3uyqf7fpea.execute-api.ca-central-1.amazonaws.com/dev/graphql', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({
          query: `
            query GetRecommendedJobs {
              getRecommendedJobs {
                scholar
                email
                scholar_id
                view_name
                employer
                title
                description
                job_type
                location
                deadline
              }
            }
          `
      })
  })

  const resp = recommendedJobs.json();
  return resp;
}

const parseRecommendedJobs = (recommendedJobs: Recommendation[]) => {
    let emailData: any = {};

    for (let i = 0; i < recommendedJobs.length; i++) {
      const key: any = [recommendedJobs[i].scholar, recommendedJobs[i].email];
      if (emailData[key]) {
        emailData[key].push(recommendedJobs[i]);
      } else {
        emailData[key] = [recommendedJobs[i]];
      }
    }

    return emailData;
}