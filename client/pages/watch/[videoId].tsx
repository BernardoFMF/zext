import { useRouter } from "next/router";
import { ReactElement } from "react";
import HomePageLayout from "../../layout/home";
import { Box, Avatar, Stack, ScrollArea, Group, Text, Grid, Title, useMantineTheme, ActionIcon, TextInput, Chip, Divider } from "@mantine/core";
import { useMeta } from "../../context/meta";
import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import { postComment, deleteComment } from "../../api";
import { IconArrowRight } from "@tabler/icons";
import { useVideo } from "../../context/videos";
import { useUser } from "../../context/users";
import Comment from "../../components/commentContainer";
import { useMe } from "../../context/me";

const PRIMARY_COL_HEIGHT = 550;

function WatchVideoPage() {
  const { query } = useRouter();
  const { meta, refetch } = useMeta()
  const { videos } = useVideo()
  const { users } = useUser()
  const { user } = useMe()
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  const currVideo = videos.filter(video => video.videoId === query.videoId)[0]
  let currentMeta = meta.filter(elem => elem.videoId === currVideo._id)[0]
  let flattenedMeta = currentMeta.usersMeta.map(userMeta => {
    const user = users.filter(elemUser => elemUser._id === userMeta.userId)[0]
    return userMeta.comments.map(comment => {
      let formattedComment = {
        username: user.username,
        image: user.image,
        userId: user._id,
        ...comment
      }
      formattedComment.createdAt = new Date(formattedComment.createdAt)
      return formattedComment
    })
  }).flat(2)
  

  const form = useForm({
    initialValues: {
        comment: ""
    }
  })

  const mutationPostComment = useMutation<AxiosResponse<string>, AxiosError, Parameters<typeof postComment>["0"]>(postComment, {
    onSuccess: () => {
      refetch()
      form.reset()
    },
  })

  const mutationDeleteComment = useMutation<AxiosResponse<string>, AxiosError, Parameters<typeof deleteComment>["0"]>(deleteComment, {
    onSuccess: () => {
      refetch()
    },
  })

  const onClickDelete = ({ commentId }: { commentId: string }) => {
    mutationDeleteComment.mutate({ videoId: String(query.videoId!), commentId })
  }

  return (
    <Grid gutter="xs" >
      <Stack>
        <Group>
          <video
            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
            width="auto"
            height={PRIMARY_COL_HEIGHT}
            crossOrigin="anonymous"
            controls
            autoPlay
            id="video-player"
            style={{ borderRadius: 20 }}
          />
          <Stack ml={20} style={{ width: 600, height: PRIMARY_COL_HEIGHT }}>
            <form
              onSubmit={form.onSubmit((values) =>
                mutationPostComment.mutate({ videoId: String(query.videoId!), ...values })
              )}
            >
              <TextInput 
                required
                height={100}
                radius={"md"}
                {...form.getInputProps("comment")}
                rightSection={
                  <ActionIcon type="submit" size={32} radius="md" color={theme.primaryColor} variant="filled">
                      <IconArrowRight size={18} stroke={1.5} />
                  </ActionIcon>
                }
                placeholder="Add comment"
                rightSectionWidth={42}
              />
            </form>
              
          <ScrollArea style={{ height: PRIMARY_COL_HEIGHT }}>
            <Stack>
              {
                flattenedMeta.map(elem => <Comment data={elem} loggedUser={user} onClickDelete={onClickDelete}/>)
              }
            </Stack>
          </ScrollArea> 
          </Stack>
        </Group>
        <Group>
          {
              !currVideo.owner.image ? (
                  <Link href={`/users/${currVideo.owner._id}`} passHref><a><Box><Avatar size={50} src={null} alt="no image here" /></Box></a></Link>
              ) : (
                  <div style={{ borderRadius: '50%', overflow: 'hidden', width: '50px', height: '50px' }}>
                      <Link href={`/users/${currVideo.owner._id}`} passHref>
                          <a>
                              <Image 
                                  src={process.env.NEXT_PUBLIC_API_ENDPOINT + "/data/" + currVideo.owner.image} 
                                  alt={currVideo.owner._id} 
                                  height={50}
                                  width={50}
                              />
                          </a>
                      </Link>
                  </div>
              )
          }
          <Link href={`/users/${currVideo.owner._id}`} passHref>
              <a>
                {
                    currVideo.owner.username
                }
              </a>
          </Link>
        </Group>
        <Group>
          <Title>
            {
              currVideo.title
            }
          </Title>
          <Chip checked={false}>
            {
              currVideo.category
            }
          </Chip>
        </Group>
        
        <Text>
          {
            currVideo.description
          }
        </Text>
        <Divider/>
      </Stack>
    </Grid>
  );
}

WatchVideoPage.getLayout = function(page: ReactElement) {
  return <HomePageLayout path="/">{page}</HomePageLayout>
}

export default WatchVideoPage;