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
import { Email, Recommendation } from '../emails/jobUpdate'
import { Job } from '../../backend/src/types/db.types'
import EmailJobCard from '../emails/components/EmailJobCard'

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

      {/* For testing purposes only */}
      {/* <Email scholarName="Michael" jobs={[{
        scholar: "Michael",
        email: "mdawes28@gmail.com",
        scholar_id: "1",
        view_name: "default",
        employer: "Hudson River Trading",
        title: "Software Engineer",
        description: "Software Engineer at Google",
        job_type: "Full Time",
        location: "New York, NY",
        deadline: "2900-12-31"
      }]}
      employers={[
        {
          name: "Google",
          logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        }
      ]}
      /> */}
    </div>
  )
}

export default Home
