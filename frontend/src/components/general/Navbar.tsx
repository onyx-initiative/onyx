import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import onyx_logo from '../../assets/onyx_logo.png' // Logo looks a bit grainy, replace with higher quality image
import ProfilePhoto from '../navbar/ProfilePhoto'
import styles from '../../../styles/components/Navbar.module.css'

export default function Navbar(props: any) {

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link
          href='/'
        >
          <Image
            src={onyx_logo} 
            alt="Onyx Logo" 
            width={184} // make dynamic
            height={52} // make dynamic
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
          <Link href="/Jobs">Contact Us</Link>
        </li>
      </ul>
      <ProfilePhoto name='Michael Dawes'/>
    </div>
  )
}