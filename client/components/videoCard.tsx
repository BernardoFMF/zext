import Link from "next/link"
import { Video } from "../types"
import { Card, Group, Text, Button, createStyles, ScrollArea, Chip } from "@mantine/core"
import Image from "next/image"
import { motion } from "framer-motion"
import UserImageContainer from "./userImageContainer"

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colors.dark[7]
    },
  
    section: {
        borderBottom: `1px solid ${
            theme.colors.dark[4]
        }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    button: {
        background: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
        "&:hover": {
            background: theme.colors.dark[5]
        }
    }
}))

function VideoCard({ video }: { video: Video }) {
    const { classes } = useStyles()    
    
    return (
        <motion.div whileHover={{ scale: 1.05 }}>
            <Card withBorder radius="md" p="md" className={classes.card}>
                <div style={{height: "180px", position: "relative"}}>
                    <Image 
                        src={process.env.NEXT_PUBLIC_API_ENDPOINT + "/data/" + video.thumbnail} 
                        alt={video.videoId} 
                        layout="fill"
                        style={{ borderRadius: 5 }}
                    />
                </div>
                <Card.Section pt={5} style={{ border: "none" }} className={classes.section} mt="md">
                    <Group position="apart">
                        <Text size="lg" weight={500}>
                            {video.title}
                        </Text>
                    </Group>
                    <ScrollArea mt={3} style={{ height: 100 }}>
                        <Text size="sm" mt="xs">
                            {video.description}
                        </Text>
                    </ScrollArea>
                    <Chip pt={10} checked={false}>{video.category}</Chip>
                </Card.Section>

                <Group mt="xs">
                    <Link href={`/watch/${video.videoId}`} passHref>
                        <Button radius="md" className={classes.button}>
                            See video
                        </Button>
                    </Link>
                    <Link href={`/users/${video.owner._id}`} passHref>
                        <a>
                            <Text>{video.owner.username}</Text>
                        </a>
                    </Link>
                    <Link href={`/users/${video.owner._id}`} passHref>
                        <a>
                            <UserImageContainer image={video.owner.image} userId={video.owner._id} />
                        </a>
                    </Link>
                </Group>
            </Card>
        </motion.div>
    )
}

export default VideoCard