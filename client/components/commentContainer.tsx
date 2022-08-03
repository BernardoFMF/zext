interface CommentProp {
    _id: string;
    username: string;
    userId: string;
    text: string;
    createdAt: Date;
    image?: string;
}

import { Box, Group, Stack, Avatar, Chip, Text, Divider, Button, createStyles, CloseButton } from "@mantine/core"
import Image from "next/image"
import Link from "next/link";
import { Me } from "../types";

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

export default function Comment({ data, loggedUser, onClickDelete }: { data: CommentProp, loggedUser?: Me, onClickDelete: ({ commentId }: { commentId: string}) => void }) {
    const { classes } = useStyles(); 

    return (
        <Box>
            <Divider mb={5} />
            <Group>
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
            <Text>
                {
                    data.text
                }
            </Text>
        </Box>
    )
}