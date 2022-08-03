import React, { ReactElement } from 'react'
import HomePageLayout from '../layout/home'
import styles from '../styles/Home.module.css'
import { useVideo } from '../context/videos'
import VideoCard from '../components/videoCard'
import { SimpleGrid, Chip, Title } from '@mantine/core'
import { useState } from 'react'
import Section from '../components/slideTransition'
import { categories } from '../static-data/categories'
import { motion } from 'framer-motion'

const Home = () => {
  const { videos } = useVideo()

  const [value, setValue] = useState(['All']);
  console.log(videos);
  

  return (
    <>
      <Section delay={0}>
        <Title order={1}>Videos</Title>
      </Section>
      
      <div className={styles.container}>
        <Section delay={0.2}>
          <Chip.Group style={{ width: "100%"}} mt={10} multiple value={value} onChange={setValue}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Chip value="All">All</Chip>
            </motion.div>
            {
              categories.map(category => <motion.div whileHover={{ scale: 1.05 }}><Chip value={category}>{category}</Chip></motion.div>)
            }
          </Chip.Group>
        </Section>

        <SimpleGrid 
          cols={5}   
          pt={20}   
          breakpoints={[
            { maxWidth: 1024, cols: 3, spacing: 'md' },
            { maxWidth: 769, cols: 2, spacing: 'sm' },
            { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
        >
          {
            (videos || []).filter(video => {
              if (value.includes("All")) return true
              return value.includes(video.category)
            }).map((video, index) => {
              return <Section delay={0.3 + (0.1 * index)}><VideoCard video={video}/></Section>
            })
          }
        </SimpleGrid>
      </div>
    </>
  )
}

Home.getLayout = function(page: ReactElement) {
  return <HomePageLayout path="/">{page}</HomePageLayout>
}

export default Home
