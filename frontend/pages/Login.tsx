import React, { useEffect } from 'react'
import styles from '../styles/components/Login.module.css'

type Login = {
    setToken: (token: string) => void
}

export default function Login(props: Login) {
    const { setToken } = props

    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const authenticate = async () => {
        const res = await fetch('http://localhost:4000/oauth',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            })
                    
        const data = await res.json()
        console.log(data)
    }

    return (
        <div>
            <button onClick={() => authenticate()}>Login</button>
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
            <div>

            </div>
        </div>
    )
}