import React from 'react'
import styles from '../styles/components/Login.module.css'

type Login = {
    setToken: (token: string) => void
}

export default function Login(props: Login) {
    const { setToken } = props

    return (
        <div>
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