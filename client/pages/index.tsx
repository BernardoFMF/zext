import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import HomePageLayout from '../layout/home'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
     
    </div>
  )
}

Home.getLayout = function(page: ReactElement) {
  return <HomePageLayout path="/">{page}</HomePageLayout>
}

export default Home
