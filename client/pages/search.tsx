import { ReactElement } from "react"
import { useUser } from "../context/users"
import { useVideo } from "../context/videos"
import HomePageLayout from "../layout/home"
import { Divider, SimpleGrid, Title } from "@mantine/core"
import VideoCard from "../components/videoCard"
import Section from "../components/slideTransition"
import { useRouter } from "next/router"
import UserCard from "../components/userCard"
import Meta from "../components/meta"

const SearchPage = () => {
    const { query } = useRouter();
    const { videos } = useVideo()
    const { users } = useUser()

    return (
        <>
            <Meta title={`Search results for ${query.name}`} />
            <Section delay={0}>
                <Title order={1}>Users</Title>
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
                    (users.filter(user => {
                        return user.username.includes(String(query.name!))
                    })).map((user, index) => {
                        return <Section delay={0.1 + (0.1 * index)}><UserCard user={user} /></Section>
                    })
                }
            </SimpleGrid>
            <Section delay={0.4}>
                <Divider mt={20}/>
            </Section>
            <Section delay={0.5}>
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
                    (videos.filter(video => {
                        return video.title.includes(String(query.name!))
                    }) || []).map((video, index) => {
                        return <Section delay={0.6 + (0.1 * index)}><VideoCard video={video}/></Section>
                    })
                }
            </SimpleGrid>
        </>
    )
}

SearchPage.getLayout = function(page: ReactElement) {
    return <HomePageLayout path="/">{page}</HomePageLayout>
  }
  
export default SearchPage
  