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
import Image from 'next/image'
import loading from '../src/assets/loading.svg'
import loadingStyles from '../styles/components/CreateAccount.module.css'

export default function Scholar() {
  const { data: session, status } = useSession({ required: true })

  // const {loading: loadingEmployer, error: employerError, data: employerData } = useQuery(GET_EMPLOYERS)
  const { data: scholarData, loading: loadingScholar, error: scholarError } = useQuery(GET_SCHOLAR_BY_EMAIL, {
    variables: { email: session?.user?.email },
    fetchPolicy: 'cache-and-network'
  })
  const router= useRouter()

  // @todo: Style this
  if (loadingScholar) {
    return (
      <div className={loadingStyles.loading}>
        <Image
            src={loading}
            alt="Loading"
            width={100}
            height={100}
        />
        <h1>Loading...</h1>
      </div>
    )
  } 

  if (scholarData.getScholarByEmail === null && !loadingScholar) {
    router.push('/CreateAccount')
    return ( 
      <div>
          <Navbar />
          <SearchBar />
          <ScholarHero />
          <LatestJobs />
      </div>
    )
  }
}

export { getServerProps };
