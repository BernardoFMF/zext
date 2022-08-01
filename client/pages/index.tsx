import React, { ReactElement } from 'react'
import HomePageLayout from '../layout/home'
import styles from '../styles/Home.module.css'
import { useVideo } from '../context/videos'
import VideoCard from '../components/videoCard'
import { SimpleGrid } from '@mantine/core'

const Home = () => {
  const { videos } = useVideo()
  return (
    <div className={styles.container}>
      <SimpleGrid 
        cols={5}      
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {
          videos.map(video => {
            return <VideoCard video={video}/>
          })
        }
      </SimpleGrid>
    </div>
  )
}

Home.getLayout = function(page: ReactElement) {
  return <HomePageLayout path="/">{page}</HomePageLayout>
}

export default Home
