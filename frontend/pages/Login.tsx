import React, { useEffect } from 'react'
import styles from '../styles/components/Login.module.css'
import onyx_logo from '../public/onyx_logo.png'
import { FaLinkedinIn, FaTwitter, FaInstagram, FaHubspot } from "react-icons/fa";
import Image from 'next/image'

type Login = {
    setToken: (token: string) => void
}

// @ todo: connect this to the backend
export default function Login(props: Login) {
    const { setToken } = props

    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    // @todo: Fix CORS issue
    // const authenticate = async () => {
    //     const res = await fetch('http://localhost:4000/oauth',
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Access-Control-Allow-Origin': '*',
    //             }
    //         })
                    
    //     const data = await res.json()
    //     console.log(data)
    // }

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
                        <FaHubspot size={28} />
                        <button 
                            onClick={() => setToken("hubspot")}
                        >
                            Login with Hubspot
                        </button>
                    </div>
                    <h3 className={styles.loginHeader}>Admin Login</h3>
                    <button 
                        className={styles.loginButton} 
                        onClick={() => setToken("admin")}
                    >
                        Scholar Login
                    </button>
                </div>
            </div>
            {/* <button onClick={() => alert("Logged In!")}>Login</button> */}
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
                <a href='https://www.linkedin.com/company/onyx-initiative/' target="_blank">
                    <FaLinkedinIn size={28} />
                </a>
                <a href='https://twitter.com/onyxinitiative' target="_blank">
                    <FaTwitter size={28} />
                </a>
                <a href='https://www.instagram.com/onyxinitiative/' target="_blank">
                    <FaInstagram size={28} />
                </a>
            </div>
        </div>
    )
}