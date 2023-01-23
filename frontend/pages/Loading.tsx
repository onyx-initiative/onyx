import React from 'react'
import loading from '../src/assets/loading.svg'
import Image from 'next/image'
import styles from '../styles/components/CreateAccount.module.css'
import { useRouter } from 'next/router'

export default function Loading() {
    return (
        <div className={styles.loading}>
            <Image
                src={loading}
                alt="Loading"
                width={100}
                height={100}
            />
            <h1>Loading...</h1>
        </div>
    )
}
