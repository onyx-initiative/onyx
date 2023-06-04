import React, { useEffect, useMemo } from 'react'
import styles from '../styles/components/Login.module.css'
import onyx_logo from '../public/onyx_logo.png'
import { FaLinkedinIn, FaTwitter, FaInstagram, FaGoogle, FaMicrosoft, FaApple } from "react-icons/fa";
import Image from 'next/image'
import { GET_SCHOLAR_BY_EMAIL } from '../graphql/queries/scholarQueries';
import loading from '../src/assets/loading.svg'
import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react';
import {useRouter } from 'next/router';
import {PublicClientApplication} from '@azure/msal-browser'


// @todo: If email not in db, redirect to sign up page
export default function Login() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    return (
        <div className={styles.outerContainer}>
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
                    <h3 className={styles.loginHeader}>Scholar Login/Signup</h3>
                    <div className={styles.scholarLogin}>
                        <FaGoogle size={28} />
                        <button
                        className={styles.loginButton}
                            onClick={() => signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_ENV === 'dev' ? '/Admin' : process.env.NEXT_PUBLIC_CALLBACK_URL})}
                        >
                            Login with Google
                        </button>
                    </div>
                    <div className={styles.scholarLogin}>
                        <FaMicrosoft size={28} />
                        <button
                        className={styles.loginButton}
                        onClick={() => signIn('azure-ad', { callbackUrl: process.env.NEXT_PUBLIC_ENV === 'dev' ? '/Admin' : process.env.NEXT_PUBLIC_CALLBACK_URL})}
                        >
                            Login with Microsoft
                        </button>
                    </div>
                    <div className={styles.scholarLogin}>
                        <FaApple size={28} />
                        <button
                        className={styles.loginButton}
                            onClick={() => {
                                alert('Apple login is currently unavailable. Please use another login method.')
                                // signIn('apple', { callbackUrl: process.env.NEXT_PUBLIC_ENV === 'dev' ? '/Admin' : process.env.NEXT_PUBLIC_CALLBACK_URL})
                            }}
                        >
                            Login with Apple
                        </button>
                    </div>
                    <div className={styles.divider}></div>
                    <h3 className={styles.loginHeader}>Admin Login</h3>
                    {/*  */}
                    <div className={styles.loginFields}>
                        <input 
                            value={email} 
                            className={styles.adminFields}
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder='email'
                        />
                        <input 
                            value={password} 
                            className={styles.adminFields}
                            type='password'
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder='password'
                        />
                    </div>
                    <div className={styles.scholarLogin}>
                        <button 
                            className={styles.loginButton} 
                            onClick={() => signIn('credentials', { 
                                redirect: false,
                                callbackUrl: '/Admin',
                                email: email,
                                password: password
                            }).then((res) => {
                                if (res?.error) {
                                    alert(res.error)
                                } else {
                                    router.push('/Admin')
                                }
                            })
                        }
                        >
                            Admin Login
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export const Footer = () => {
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