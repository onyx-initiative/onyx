import React, {useState, useEffect} from 'react'
import EmployerInfo from '../src/sections/employer/AllEmployers'
import Navbar from '../src/components/general/Navbar'
import SearchBar from '../src/components/general/SearchBar'
import AllEmployers from '../src/sections/employer/AllEmployers'
import { Employer } from '../../backend/src/types/db.types'
import styles from '../styles/components/AllEmployers.module.css'
import { GET_EMPLOYERS } from '../graphql/queries/employerQueries'
import { useQuery } from '@apollo/client'
import loading from '../../frontend/src/assets/loading.svg'
// To ensure unauthenticated people don't access
import getServerProps from "../src/utils/getServerProps";
import { useRouter } from 'next/router'
import Image from 'next/image'
import Loading from './Loading'

export default function Employers() {

  const router = useRouter()
  const query = router.query
  const [search, setSearch] = useState('')
  const [employers, setEmployers] = useState([])
  const { data: employerData, loading: employerLoading } = useQuery(GET_EMPLOYERS)

  useEffect(() => {
    if (!employerLoading) {
      if (!query.search) {
        setEmployers(employerData?.getEmployers)
      }
    }
    // Ignore, this is intentional
  }, [employerData, employerLoading])

  if (employerLoading) {
    return (
        <Loading />
  )}

  return (
    <div >
      <Navbar/>
      <div>
        <SearchBar/>
        {employerLoading ? 
            <div className={styles.loading}>
              <Image src={loading} alt="Loading..." width={80} height={80}/>
            </div> : 
            <AllEmployers employers={employers} />
        }
      </div>
    </div>
  )
}

export { getServerProps };
