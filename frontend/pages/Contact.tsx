import React, { useState } from 'react'
import styles from '../styles/components/Contact.module.css'
import Navbar from '../src/components/general/Navbar'
import { InputElement } from './CreateAccount'

type Info = {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [info, setInfo] = useState({})
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1>We would love to hear from you!</h1>
        <p>Please submit your information and comments and an Onyx representative will be in touch shortly.</p>
        <InputElement label="Name" userInfo={info} setUserInfo={setInfo} />
        <InputElement label="Email" userInfo={info} setUserInfo={setInfo} />
        <InputElement label="Subject" userInfo={info} setUserInfo={setInfo} />
        <InputElement label="Message" userInfo={info} setUserInfo={setInfo} />
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => {
            // @todo: Send email to Onyx representative
            alert('Thank you for your message! We will be in touch shortly.')
          }}
        >
          Get in touch!
        </button>
      </div>
    </div>
  )
}
