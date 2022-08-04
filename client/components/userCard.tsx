import { Me } from "../types";
import { createStyles, Card, Text, Title, Group, Stack } from "@mantine/core";
import { motion } from "framer-motion"
import Link from "next/link";
import UserImageContainer from "./userImageContainer";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colors.dark[7]
    }
}));

function UserCard({ user }: { user: Me }) {
    const { classes } = useStyles();

    return (
        <motion.div whileHover={{ scale: 1.05 }}>
            <Link href={`/users/${user._id}`} passHref>
                <a>
                    <Card withBorder radius="md" p="md" className={classes.card}>
                        <Group mt={10}>
                            <UserImageContainer image={user.image} userId={user._id} />
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

export default UserCard