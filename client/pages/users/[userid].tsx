import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { Container, Group, Stack, Text, Title } from "@mantine/core";
import HomePageLayout from "../../layout/home";
import { useMe } from "../../context/me"
import { Box, Avatar, SimpleGrid } from "@mantine/core"
import Image from "next/image";
import { useUser } from "../../context/users";
import { Me } from "../../types";
import styles from "../../styles/Home.module.css"
import { useVideo } from "../../context/videos";
import Section from "../../components/slideTransition";
import VideoCard from "../../components/videoCard";

const UserPage = () => {
    const { query } = useRouter();

    const { user } = useMe()
    const { users } = useUser()
    const { videos } = useVideo()

    const currentUser = users.filter(curr => curr._id === query.userid)[0]
    const currentUserVideos = videos.filter(curr => curr.owner._id === query.userid)

    return (
        <>
            <Box>
                <Group ml={30}>
                    {
                        !currentUser.image ? (
                            <Box><Avatar size={100} src={null} alt="no image here" /></Box>
                        ) : (
                            <div style={{ borderRadius: '50%', overflow: 'hidden', width: 100, height: 100 }}>
                            <Image 
                                src={process.env.NEXT_PUBLIC_API_ENDPOINT + "/data/" + currentUser.image} 
                                alt={currentUser._id} 
                                height={100}
                                width={100}
                            />
                            </div>
                        )
                    }
                    <Stack>
                        <Text>{currentUser.username}</Text>
                        <Text>{currentUser.email}</Text>
                    </Stack>
                </Group>
                <div style={{ marginTop: 10}} className={styles.container}>
                    <Title order={1}>Videos</Title>
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
                            (currentUserVideos || []).map((video, index) => {
                                return <Section delay={0.1 * index}><VideoCard video={video}/></Section>
                            })
                        }
                    </SimpleGrid>
                </div>
            </Box>
        </>
    )
}

UserPage.getLayout = function(page: ReactElement) {
    return <HomePageLayout path="/users/:userid">{page}</HomePageLayout>
  }
  
export default UserPage