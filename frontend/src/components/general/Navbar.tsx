import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePhoto from '../navbar/ProfilePhoto'
import styles from '../../../styles/components/Navbar.module.css'

export default function Navbar(props: any) {

  const admin = true;

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link
          href='/'
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
  )
}