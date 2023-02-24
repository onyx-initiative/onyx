import React, { useEffect, useState } from 'react'
import Navbar from '../src/components/general/Navbar'
import { useSession } from 'next-auth/react'
import { GET_SCHOLAR_BY_EMAIL } from '../graphql/queries/scholarQueries'
import { useQuery } from '@apollo/client'
import { GET_FAVOURITES } from '../graphql/queries/jobQueries'
import styles from '../styles/components/Favourites.module.css'
import loading from '../src/assets/loading.svg'
import Image from 'next/image'
import ListedJobs from '../src/sections/jobs/ListedJobs'

export default function Favourites() {
  const { data: session } = useSession({ required: true })
  const { data: scholarData, loading: loadingScholar, error: scholarError } = useQuery(GET_SCHOLAR_BY_EMAIL, {
      variables: { email: session?.user?.email }
  })
  const { data: savedJobs, loading: loadingSavedJobs, error: savedJobsError, refetch } = useQuery(GET_FAVOURITES, {
      variables: { scholarId: scholarData?.getScholarByEmail?.scholar_id }
  })
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    console.log(savedJobs)
    if (!loadingSavedJobs && !loadingScholar) {
        setJobs(savedJobs?.getFavourites)
    }
    refetch()
    // Ignore, this is intentional
  }, [savedJobs, loadingSavedJobs, loadingScholar])
  
  return (
    <div>
      <Navbar />
      <div className={styles.jobs}>
        {(loadingScholar || loadingSavedJobs) && !scholarError ? 
          <div className={styles.loading}>
            <Image src={loading} alt="Loading..." width={80} height={80}/>
          </div> : jobs === undefined || jobs.length === 0? 
          <div className={styles.noFavourites}>
            <h1>You have no favourites</h1>
          </div> :
          <ListedJobs jobs={jobs} />
        }
      </div>
    </div>
  )
}
