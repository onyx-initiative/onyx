import React from 'react'
import Navbar from '../src/components/general/Navbar'
import SearchBar from '../src/components/general/SearchBar'
import ScholarHero from '../src/sections/scholar/ScholarHero'
import LatestJobs from '../src/sections/scholar/LatestJobs'
import { useRouter } from 'next/router'

// GraphQL
import { useQuery } from '@apollo/client'
import { GET_EMPLOYERS } from '../graphql/queries/employerQueries'
import { GET_SCHOLAR_BY_EMAIL } from '../graphql/queries/scholarQueries'
import styles from '../styles/components/ScholarHero.module.css'

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";

// Session
import { useSession } from 'next-auth/react';
import CreateAccount from './CreateAccount'
import loadingStyles from '../styles/components/CreateAccount.module.css'
import Loading from './Loading'
import EmailTest from './EmailTest'
import { Admin } from './api/auth/[...nextauth]'

export default function Scholar() {
  const { data: session, status } = useSession({ required: true })

  // const {loading: loadingEmployer, error: employerError, data: employerData } = useQuery(GET_EMPLOYERS)
  const { data: scholarData, loading: loadingScholar, error: scholarError } = useQuery(GET_SCHOLAR_BY_EMAIL, {
    variables: { email: session?.user?.email },
    fetchPolicy: 'cache-and-network'
  })
  const {data: employerData, loading: loadingEmployers } = useQuery(GET_EMPLOYERS)
  const router = useRouter()

  // @todo: Style this
  if (loadingScholar) {
    return (
      <div className={loadingStyles.loading}>
        <Loading />
      </div>
    )
  } 

  // @todo: Don't redirect to CreateAccount if the user is an admin
  // Or change the navbar to be different for admins
  if ((scholarData.getScholarByEmail === null 
      || scholarData === undefined) 
      && !loadingScholar) {
    router.push('/CreateAccount')
  } 

  return ( 
    <div>
      {scholarData.getScholarByEmail === null ? <Loading /> : 
        <div>
          <Navbar />
          <SearchBar />
          <ScholarHero employerData={employerData} employerLoading={loadingEmployers}/>
          <LatestJobs employerData={employerData} />
        </div>
      }
    </div>
  )
}

// export { getServerProps };
