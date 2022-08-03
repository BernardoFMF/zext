import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import HomePageLayout from "../../layout/home";
import { useMe } from "../../context/me"
import { Box, Avatar, SimpleGrid, Modal } from "@mantine/core"
import Image from "next/image";
import { useUser } from "../../context/users";
import styles from "../../styles/Home.module.css"
import { IconPhoto, IconUpload, IconX } from '@tabler/icons'
import { useVideo } from "../../context/videos";
import Section from "../../components/slideTransition";
import { useMutation } from "@tanstack/react-query";
import VideoCard from "../../components/videoCard";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { updateUserImage } from "../../api";

const UserPage = () => {
    const { query } = useRouter();

    const { user, refetch: refetchMe } = useMe()
    const { users, refetch } = useUser()
    const { videos, refetch: refetchVideos } = useVideo()

    let currentUser = users.filter(curr => curr._id === query.userid)[0]
    let currentUserVideos = videos.filter(curr => curr.owner._id === query.userid)

    const [open, setOpen] = useState(false)

    const mutation = useMutation(updateUserImage)

    function upload(files: File[]) {
        const formData = new FormData()

        formData.append("image", files[0])

        mutation.mutate({ formData })
    }

    useEffect(() => {
        //May be uneccessary
        refetch()
        refetchMe()
        refetchVideos()
    }, [mutation.data])

    useEffect(() => {
        currentUser = users.filter(curr => curr._id === query.userid)[0]
        currentUserVideos = videos.filter(curr => curr.owner._id === query.userid)
    }, [users])

    return (
        <>
            {
                user && 
                    <Modal
                        opened={open}
                        closeOnClickOutside={true}
                        onClose={() => setOpen(false)}
                        title="Update Image"
                        overlayBlur={10}
                        size="xl"
                    >
                        <Dropzone
                            onDrop={(files) => {
                                upload(files)
                            }}
                            accept={[ MIME_TYPES.jpeg, MIME_TYPES.png ]}
                            multiple={false}
                        >
                            <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                                <Dropzone.Accept>
                                    <IconUpload />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconPhoto />
                                </Dropzone.Idle>

                                <div>
                                    <Text size="xl" inline>
                                        Drag videos here or click to select files
                                    </Text>
                                    <Text size="sm" color="dimmed" inline mt={7}>
                                        Attach only one video
                                    </Text>
                                </div>
                            </Group>
                        </Dropzone>
                    </Modal>
            }
            <Box>
                <Group ml={30} mt={15}>
                    <Section delay={0}>
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
                    </Section>

                    <Stack>
                        <Section delay={0.1}>
                            <Title order={2}>{currentUser.username}</Title>
                        </Section>
                        <Section delay={0.2}>
                            <Text mt={-15}>{currentUser.email}</Text>
                        </Section>
                    </Stack>
                </Group>
                {
                    (user && user._id === currentUser._id) && <Section delay={0.3}><Button ml={30} mt={20} onClick={() => setOpen(true)}>Change image</Button></Section>
                }
                <div style={{ marginTop: 10}} className={styles.container}>
                    <Section delay={0.4}>
                        <Title order={1}>Videos</Title>
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
                            (currentUserVideos || []).map((video, index) => {
                                return <Section delay={0.5 + (0.1 * index)}><VideoCard video={video}/></Section>
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