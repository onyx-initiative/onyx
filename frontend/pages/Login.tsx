import React, { useMemo } from 'react'
import styles from '../styles/components/Login.module.css'
import onyx_logo from '../public/onyx_logo.png'
import { FaLinkedinIn, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import Image from 'next/image'

import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react';

export default function Login() {
    const { data: session, status } = useSession()
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.loginLogo}>
                    <Image 
                        src="https://onyxinitiative.org/assets/img/onyxlogo_nav.png"
                        alt="Onyx Logo" 
                        width={700}
                        height={250}
                    />
                </div>
                <div className={styles.loginContainer}>
                    <h3>Scholar Login/Signup</h3>
                    <div className={styles.scholarLogin}>
                        <FaGoogle size={28} />
                        <button
                            onClick={() => signIn('google')}
                        >
                            Login with Google
                        </button>
                    </div>
                    <h3 className={styles.loginHeader}>Admin Login</h3>
                    <button 
                        className={styles.loginButton} 
                        onClick={() => alert('Not yet implemented')}
                    >
                        Admin Login
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerInfo}>
                <p className={styles.email}>info@onyxinitiative.org</p>
                <p>334 Lakeshore Road E #203, Oakville, ON L6J 1J6</p>
                <p>Copyright ONYX INITIATIVE. All Rights Reserved</p>
            </div>
            <div className={styles.socials}>
                <a href='https://www.linkedin.com/company/onyx-initiative/' target="_blank" rel="noreferrer">
                    <FaLinkedinIn size={28} />
                </a>
                <a href='https://twitter.com/onyxinitiative' target="_blank" rel="noreferrer">
                    <FaTwitter size={28} />
                </a>
                <a href='https://www.instagram.com/onyxinitiative/' target="_blank" rel="noreferrer">
                    <FaInstagram size={28} />
                </a>
            </div>
        </div>
    )
}