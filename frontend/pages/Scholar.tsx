import React from 'react'
import Navbar from '../src/components/general/Navbar'
import SearchBar from '../src/components/general/SearchBar'
import ScholarHero from '../src/sections/scholar/ScholarHero'
import LatestJobs from '../src/sections/scholar/LatestJobs'

// GraphQL
import { useQuery } from '@apollo/client'
import { GET_EMPLOYERS } from '../graphql/queries/employerQueries'

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";

export default function Scholar() {
  const {loading, error, data } = useQuery(GET_EMPLOYERS)

  console.log(data)
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
