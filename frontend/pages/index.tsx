import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Scholar from './Scholar'
import ServerCheck from './ServerCheck'
import Login from './Login'

import { useSession } from 'next-auth/react';

const serverResponse = {
    applicationDeadline: '2021-12-31',
}

const Home: NextPage = () => {

  const { status } = useSession({ required: true })

  if (status != 'authenticated') {
    return <Login />
  }

  return (
    <div>
      <Scholar />
      {/* <ServerCheck /> */}
    </div>
  )
}

export default Home
