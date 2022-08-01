import Link from "next/link"
import { Video } from "../types"
import { Card, Group, Text, Button, ActionIcon, createStyles, ScrollArea, Chip, Avatar, Stack } from "@mantine/core"
import { IconHeart } from "@tabler/icons"
import Image from "next/image"
import { motion } from "framer-motion"
import { useMe } from "../context/me"

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
    
    const { user } = useMe()

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
                    {
                        user && (
                            <ActionIcon variant="default" radius="md" size={36}>
                                <IconHeart size={18} className={classes.like} stroke={1.5} />
                            </ActionIcon>
                        )
                    }
                    <Stack align={"center"} ml={10}>
                        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '48px', height: '48px' }}>
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
                        <Link href={`/users/${video.owner._id}`} passHref>
                            <a>
                                <Text>{video.owner.username}</Text>
                            </a>
                        </Link>
                        
                    </Stack>
                </Group>
            </Card>
        </motion.div>
    )
}