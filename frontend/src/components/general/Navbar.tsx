import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePhoto from '../navbar/ProfilePhoto'
import styles from '../../../styles/components/Navbar.module.css'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { GET_BANNER, GET_SCHOLAR_BY_EMAIL } from '../../../graphql/queries/scholarQueries'
import { useQuery } from '@apollo/client'
import { Capitalize } from '../jobs/JobCard'

interface Admin extends User { 
  admin: boolean
}

export default function Navbar(props: any) {
  const { data: session } = useSession({ required: true })
  const { data: scholarData, loading: loadingScholar, error: scholarError } = useQuery(GET_SCHOLAR_BY_EMAIL, {
    variables: { email: session?.user?.email },
    fetchPolicy: 'cache-and-network'
  })
  const {data: banner, loading: loadingBanner, error: bannerError} = useQuery(GET_BANNER)
  const [name, setName] = React.useState('')
  const [scholar_id, setScholarId] = React.useState('')
  const [bannerText, setBannerText] = React.useState('')
  const [email, setEmail] = React.useState('')

  let logoLink = '/';
  // if ((session?.user as Admin).admin === true) {
  //     logoLink = '/Admin'
  // } else {
  //     logoLink = '/'
  // }
  const getNameFromEmail = (email: string) => {
    if (email === undefined || email === ' ') return 'Guest'
    const name = email.split('.')[0]
    return Capitalize(name)
  }
  

  
  useEffect(() => {

    if (!loadingScholar) {
      setScholarId(scholarData?.getScholarByEmail?.scholar_id)
      setEmail(scholarData?.getScholarByEmail?.email)
      if (scholarData?.getScholarByEmail?.name === undefined) {
        setName(getNameFromEmail(session?.user?.email as string))
      } else {
        setName(scholarData?.getScholarByEmail?.name)
      }
      
    }
  }, [loadingScholar, scholarData?.getScholarByEmail?.name, scholarData?.getScholarByEmail?.scholar_id, scholarData?.getScholarByEmail?.email, name, email])

  useEffect(() => {
    if (!loadingBanner) {
      setBannerText(banner?.getBanner?.banner_text)
    }
  }, [loadingBanner, banner?.getBanner?.banner_text])


  return (
    <div className={styles.betaWrapper}>
      {/* @todo: Remove the wrapper div for final launch */}
      <BetaHeadline />
      {bannerText && !loadingBanner ? <OnyxAnnouncemment banner={bannerText}/> : null}
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
            <Link href={{
              pathname: '/Views',
              query: { scholar_id: scholar_id }
            }}>My Views</Link>
          </li>
          <li>
            <a href="https://onyxinitiative.org/contact/" target="_blank" rel="noreferrer">Contact Us</a>
          </li>
          <li>

            {name === '' || name === undefined ? <ProfilePhoto name={'Guest'} scholar_id='1' /> : 
            <ProfilePhoto name={name} scholar_id={scholar_id}/>}
          </li>
        </ul>
          
        
      </div>
      
    </div> 
  )
}

const BetaHeadline = () => {
  return (
    <div className={styles.betaHeadline}>
      <p>
        Welcome to the Onyx Job Board. Please report any
        bugs or issues to{" "}
        <a 
          href="mailto:cole.purboo@onyxinitiative.org"
          className={styles.email}
        >cole.purboo@onyxinitiative.org</a>
      </p>
    </div>
  );
}

const OnyxAnnouncemment = (props: any) => {
  const { banner } = props
  return (
    <div className={styles.onyxAnnouncement}> 
      <p> Click the link to register for the 4th Annual Black Professionals Career Fair!: <a className={styles.link} href= "https://www.airmeet.com/e/0bba9fa0-2134-11ee-b78c-73d51b74f492" > https://www.airmeet.com/e/0bba9fa0-2134-11ee-b78c-73d51b74f492</a> </p>
    </div>
  )
}


