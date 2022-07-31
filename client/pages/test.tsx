import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import HomePageLayout from '../layout/home'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
        <p>test</p>
    </div>
  )
}

Home.getLayout = function(page: ReactElement) {
  return <HomePageLayout path="/test">{page}</HomePageLayout>
}

export default Home
