import { Me } from "../types";
import { createStyles, Card, Text, Title, Group, Box, Avatar, Stack } from "@mantine/core";
import Image from "next/image";
import { motion } from "framer-motion"
import Link from "next/link";

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
    }
  }));

export default function UserCard({ user }: { user: Me }) {
    const { classes } = useStyles();

    return (
        <motion.div whileHover={{ scale: 1.05 }}>
            <Link href={`/users/${user._id}`} passHref>
                <a>
                <Card withBorder radius="md" p="md" className={classes.card}>
                    <Group mt={10}>
                        {
                            !user.image ? (
                                <Box><Avatar size={100} src={null} alt="no image here" /></Box>
                            ) : (
                                <div style={{ borderRadius: '50%', overflow: 'hidden', width: 100, height: 100 }}>
                                <Image 
                                    src={process.env.NEXT_PUBLIC_API_ENDPOINT + "/data/" + user.image} 
                                    alt={user._id} 
                                    height={100}
                                    width={100}
                                />
                                </div>
                            )
                        }
                        <Stack>
                            <Title order={2}>{user.username}</Title>
                            <Text mt={-15}>{user.email}</Text>
                        </Stack>
                    </Group>
                </Card>
                </a>
            </Link>
        </motion.div>
    )
}