import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePhoto from '../navbar/ProfilePhoto'
import styles from '../../../styles/components/Navbar.module.css'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'

interface Admin  extends User { 
  admin: boolean
}

export default function Navbar(props: any) {
  const { data: session } = useSession({ required: true })

  let logoLink = '/';
  // if ((session?.user as Admin).admin === true) {
  //     logoLink = '/Admin'
  // } else {
  //     logoLink = '/'
  // }


  return (
    <div className={styles.betaWrapper}>
      {/* @todo: Remove the wrapper div for final launch */}
      <BetaHeadline />
    
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
        <ProfilePhoto name='Michael Dawes'/>
        
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