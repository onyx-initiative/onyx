import React from 'react'
import Navbar from '../src/components/general/Navbar'
import SearchBar from '../src/components/general/SearchBar'
import ScholarHero from '../src/sections/scholar/ScholarHero'
import LatestJobs from '../src/sections/scholar/LatestJobs'

// GraphQL
import { useQuery } from '@apollo/client'
import { GET_EMPLOYERS } from '../graphql/queries/employerQueries'
import { GET_SCHOLAR_BY_EMAIL } from '../graphql/queries/scholarQueries'

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";

// Session
import { useSession } from 'next-auth/react';
import CreateAccount from './CreateAccount'
import Image from 'next/image'
import loading from '../src/assets/loading.svg'

export default function Scholar() {
  const { data: session, status } = useSession({ required: true })

  // const {loading: loadingEmployer, error: employerError, data: employerData } = useQuery(GET_EMPLOYERS)
  const { data: scholarData, loading: loadingScholar, error: scholarError } = useQuery(GET_SCHOLAR_BY_EMAIL, {
    variables: { email: "mdawes28@gmail.com" }
  })

  if (loadingScholar) {
    return (
      <div>
        <Image src={loading} alt='loading'/>
      </div>
    )
  } 

  if (scholarData.getScholarByEmail === null) {
    return (
      <div>
        <CreateAccount />
      </div>
    )
  }
  
  return ( 
      <div>
          <Navbar />
          <SearchBar />
          <ScholarHero />
          <LatestJobs />
      </div>
    )
}

export { getServerProps };
