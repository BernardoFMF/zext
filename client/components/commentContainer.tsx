interface CommentProp {
    _id: string;
    username: string;
    userId: string;
    text: string;
    createdAt: Date;
    image?: string;
}

import { Box, Group, Stack, Avatar, Chip, Text, Divider, Button, createStyles, CloseButton, useMantineTheme } from "@mantine/core"
import Image from "next/image"
import Link from "next/link";
import { Me } from "../types";

export default function Comment({ data, loggedUser, onClickDelete }: { data: CommentProp, loggedUser?: Me, onClickDelete: ({ commentId }: { commentId: string}) => void }) {
    const theme = useMantineTheme()

    return (
        <Box>
            <Divider mb={5} />
            <Group mt={10} ml={10}>
                {
                    !data.image ? (
                        <Link href={`/users/${data.userId}`} passHref><a><Box><Avatar size={50} src={null} alt="no image here" /></Box></a></Link>
                    ) : (
                        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '50px', height: '50px' }}>
                            <Link href={`/users/${data.userId}`} passHref>
                                <a>
                                    <Image 
                                        src={process.env.NEXT_PUBLIC_API_ENDPOINT + "/data/" + data.image} 
                                        alt={data.userId} 
                                        height={50}
                                        width={50}
                                    />
                                </a>
                            </Link>
                        </div>
                    )
                }
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
                        loggedUser && data.userId === loggedUser._id && <CloseButton onClick={() => onClickDelete({ commentId: data._id })}></CloseButton>
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