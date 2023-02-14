import type { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Scholar from './Scholar'
import ServerCheck from './ServerCheck'
import Login from './Login'
import { GET_SCHOLAR_BY_EMAIL } from '../graphql/queries/scholarQueries'
import loading from '../src/assets/loading.svg'

import { useSession } from 'next-auth/react';
import { useLazyQuery } from '@apollo/client'
import EmailTest from './EmailTest'
import { Email } from '../emails/jobUpdate'
import { Job } from '../../backend/src/types/db.types'

const serverResponse = {
    applicationDeadline: '2021-12-31',
}

const Home: NextPage = () => {

  const { data, status } = useSession({ required: true })

  // Promp user to login if not authenticated
  if (status != 'authenticated') {
    return <Login />
  }

  return (
    <div>
      <Scholar />
      {/* <Email scholarName='Michael' jobs={sampleJobs as Job[]} />
      <EmailTest /> */}
    </div>
  )
}

const sampleJobs = [{
  job_id: "1",
  employer_id: "1",
  admin_id: "1",
  title: "Software Engineer",
  description: "This is a job description. This one is longer than the other one to test if it changes the style",
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

export default Home
