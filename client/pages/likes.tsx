import { ReactElement, useEffect } from "react"
import { useMe } from "../context/me"
import { useMeta } from "../context/meta"
import { useVideo } from "../context/videos"
import HomePageLayout from "../layout/home"
import { SimpleGrid, Title } from "@mantine/core"
import VideoCard from "../components/videoCard"
import Section from "../components/slideTransition"

const Likes = () => {
    const { user } = useMe()
    const { meta } = useMeta()
    const { videos } = useVideo()
    

    return (
        <>
            <Title order={1}>Liked videos</Title>
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
                    (videos.filter(video => {
                        let usersMeta = meta.filter(currVideoMeta => currVideoMeta.videoId === video._id)[0]
                        if (!usersMeta) return false
                        let checkUserMeta = usersMeta.usersMeta.filter(userMeta => userMeta.userId === user._id)[0]
                        if (!checkUserMeta) return false
                        return checkUserMeta.liked === true
                    } ) || []).map((video, index) => {
                        return <Section delay={0.1 * index}><VideoCard video={video}/></Section>
                    })
                }
            </SimpleGrid>
        </>
    )
}

Likes.getLayout = function(page: ReactElement) {
    return <HomePageLayout path="/likes">{page}</HomePageLayout>
  }
  
  export default Likes
  