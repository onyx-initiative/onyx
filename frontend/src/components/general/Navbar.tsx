import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePhoto from '../navbar/ProfilePhoto'
import styles from '../../../styles/components/Navbar.module.css'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { GET_SCHOLAR_BY_EMAIL } from '../../../graphql/queries/scholarQueries'
import { useQuery } from '@apollo/client'

interface Admin extends User { 
  admin: boolean
}

export default function Navbar(props: any) {
  const { data: session } = useSession({ required: true })
  const { data: scholarData, loading: loadingScholar, error: scholarError } = useQuery(GET_SCHOLAR_BY_EMAIL, {
    variables: { email: session?.user?.email },
    fetchPolicy: 'cache-and-network'
  })
  const [name, setName] = React.useState('')
  const [scholar_id, setScholarId] = React.useState('')

  let logoLink = '/';
  // if ((session?.user as Admin).admin === true) {
  //     logoLink = '/Admin'
  // } else {
  //     logoLink = '/'
  // }

  useEffect(() => {
    if (!loadingScholar) {
      setName(scholarData?.getScholarByEmail?.name)
      setScholarId(scholarData?.getScholarByEmail?.scholar_id)
    }
  }, [loadingScholar, scholarData?.getScholarByEmail?.name, scholarData?.getScholarByEmail?.scholar_id])

  return (
    <div className={styles.betaWrapper}>
      {/* @todo: Remove the wrapper div for final launch */}
      <BetaHeadline />
      <OnyxAnnouncemment/>
      <div className={styles.navbar}>
        <div className={styles.navbarLogo}>
          <Link
            href={logoLink}
          >
            <Image
              src="https://onyxinitiative.org/assets/img/onyxlogo_nav.png" 
              alt="Onyx Logo" 
              width={184} 
              height={52} 
            />
          </Link>
        </div>
        <ul className={styles.navbarItems}>
          <li>
            <Link href="/Jobs">Open Jobs</Link>
          </li>
          <li>
            <Link href="/Employers">Employers</Link>
          </li>
          <li>
            <Link href="/Favourites">Favourites</Link>
          </li>
          <li>
            <a href="https://onyxinitiative.org/contact/" target="_blank" rel="noreferrer">Contact Us</a>
          </li>
        </ul>
        {name === '' || name === undefined ? <ProfilePhoto name='Guest' scholar_id='1' /> : 
        <ProfilePhoto name={name} scholar_id={scholar_id}/>}
        
      </div>
      
    </div> 
  )
}

const BetaHeadline = () => {
  return (
    <div className={styles.betaHeadline}>
      <p>
        This is the beta version of the Onyx Job Board. Please report any
        bugs or issues to{" "}
        <a 
          href="mailto:cole.purboo@mail.utoronto.ca"
          className={styles.email}
        >cole.purboo@mail.utoronto.ca</a>
      </p>
    </div>
  );
}

const OnyxAnnouncemment = () => {
  return (
    <div className={styles.onyxAnnouncement}> 
      <p> Welcome to the Onyx Job Board, this is where we can post news about the next job fair, or any other relevant announcements</p>
    </div>
  )
}