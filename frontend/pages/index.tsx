import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Scholar from './Scholar'
import ServerCheck from './ServerCheck'
import Login from './Login'
import Admin from './Admin'

const serverResponse = {
    applicationDeadline: '2021-12-31',
}

const Home: NextPage = () => {
  const [token, setToken] = useState('')
  
  if (token === "admin") {
    return (
      <Admin/>
    )
    
  }


  if (!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <div>
      <Scholar />
      {/* <ServerCheck /> */}
    </div>
  )
}

export default Home
