import React from 'react'
import Navbar from '../src/components/general/Navbar'
import SearchBar from '../src/components/general/SearchBar'
import ScholarHero from '../src/sections/scholar/ScholarHero'
import LatestJobs from '../src/sections/scholar/LatestJobs'

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";

export default function Scholar() {
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
