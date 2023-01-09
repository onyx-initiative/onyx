import React from 'react'
import EmployerInfo from '../src/sections/employer/AllEmployers'
import Navbar from '../src/components/general/Navbar'
import SearchBar from '../src/components/general/SearchBar'
import AllEmployers from '../src/sections/employer/AllEmployers'

// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";

export default function Employers() {
  return (
    <div >
      <Navbar/>
      <SearchBar/>
      <AllEmployers/>
    </div>
  )
}

export { getServerProps };
