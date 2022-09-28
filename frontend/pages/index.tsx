import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Scholar from './Scholar'
import ServerCheck from './ServerCheck'

const serverResponse = {
    applicationDeadline: '2021-12-31',
}

const Home: NextPage = () => {
  return (
    <div>
      <Scholar />
      <ServerCheck />
    </div>
  )
}

export default Home
