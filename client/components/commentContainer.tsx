import { Box, Group, Chip, Text, Divider, CloseButton } from "@mantine/core"
import Link from "next/link"
import { Me } from "../types"
import UserImageContainer from "./userImageContainer"

interface CommentProp {
    _id: string;
    username: string;
    userId: string;
    text: string;
    createdAt: Date;
    image?: string;
}

function Comment({ data, loggedUser, onClickDelete }: { data: CommentProp, loggedUser?: Me, onClickDelete: ({ commentId }: { commentId: string}) => void }) {
    return (
        <Box>
            <Divider mb={5} />
            <Group mt={10} ml={10}>
                <Link href={`/users/${data.userId}`} passHref>
                    <a>
                        <UserImageContainer image={data.image} userId={data.userId} />
                    </a>
                </Link>
                <Group>
                    <Link href={`/users/${data.userId}`} passHref>
                        <a>
                            <Chip checked={false}>
                                {
                                    data.username
                                }
                            </Chip>
                        </a>
                    </Link>
                    {
                        loggedUser && data.userId === loggedUser._id && <CloseButton onClick={() => onClickDelete({ commentId: data._id })} />
                    }
                </Group>
            </Group>
            <Text ml={10}>
                {
                    data.text
                }
            </Text>
        </Box>
    )
}

export default Comment