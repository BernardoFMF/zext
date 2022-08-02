import Link from "next/link"
import { Video } from "../types"
import { Card, Group, Text, Button, createStyles, ScrollArea, Chip, Box, Avatar } from "@mantine/core"
import Image from "next/image"
import { motion } from "framer-motion"

const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    },
  
    section: {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      paddingBottom: theme.spacing.md,
    },
  
    like: {
      color: theme.colors.red[6],
    },

    button: {
        background: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        "&:hover": {
            background: theme.colors.dark[5]
        }
    }
  }));

export default function VideoCard({ video }: { video: Video }) {
    const { classes } = useStyles();    
    
    return (
        <motion.div whileHover={{ scale: 1.05 }}>
            <Card withBorder radius="md" p="md" className={classes.card}>
                <div style={{height: '180px', position: 'relative'}}>
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
                    {
                        !video.owner.image ? (
                            <Link href={`/users/${video.owner._id}`} passHref><a><Box><Avatar size={50} src={null} alt="no image here" /></Box></a></Link>
                        ) : (
                            <div style={{ borderRadius: '50%', overflow: 'hidden', width: '50px', height: '50px' }}>
                                <Link href={`/users/${video.owner._id}`} passHref>
                                    <a>
                                        <Image 
                                            src={process.env.NEXT_PUBLIC_API_ENDPOINT + "/data/" + video.owner.image} 
                                            alt={video.owner._id} 
                                            height={50}
                                            width={50}
                                        />
                                    </a>
                                </Link>
                            </div>
                        )
                    }
                    
                </Group>
            </Card>
        </motion.div>
    )
}