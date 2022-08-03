import { useRouter } from "next/router";
import { ReactElement } from "react";
import HomePageLayout from "../../layout/home";
import { Box, Avatar, Stack, ScrollArea, Group, createStyles, Text, SimpleGrid, Grid, Title, useMantineTheme, ActionIcon, TextInput, Chip, Divider } from "@mantine/core";
import { useMeta } from "../../context/meta";
import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { IconHeart } from "@tabler/icons";
import { AxiosResponse, AxiosError } from "axios";
import { postComment, deleteComment, postLike, deleteLike } from "../../api";
import { IconArrowRight } from "@tabler/icons";
import Section from "../../components/slideTransition";
import { useVideo } from "../../context/videos";
import VideoCard from "../../components/videoCard";
import { useUser } from "../../context/users";
import Comment from "../../components/commentContainer";
import { useMe } from "../../context/me";

const PRIMARY_COL_HEIGHT = 550;

const useStyles = createStyles((theme) => ({
  like: {
    color: theme.colors.red[6],
  }
}));

function WatchVideoPage() {
  const { query } = useRouter();
  const { meta, refetch } = useMeta()
  const { videos } = useVideo()
  const { users } = useUser()
  const { user } = useMe()
  const theme = useMantineTheme();

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
  
  const likes = currentMeta.likes
  const currentUserLike = user && currentMeta.usersMeta.filter(elemUser => elemUser.userId === user._id && elemUser.liked === true)[0]

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

  const mutationPostLike = useMutation<AxiosResponse<string>, AxiosError, Parameters<typeof postLike>["0"]>(postLike, {
    onSuccess: () => {
      refetch()
    },
  })

  const mutationDeleteLike = useMutation<AxiosResponse<string>, AxiosError, Parameters<typeof deleteLike>["0"]>(deleteLike, {
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
          <Section delay={0}>
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
          </Section>
          
          <Stack ml={20} style={{ width: 600, height: PRIMARY_COL_HEIGHT }}>
            <form
              onSubmit={form.onSubmit((values) =>
                mutationPostComment.mutate({ videoId: String(query.videoId!), ...values })
              )}
            >
              <Section delay={0.1}>
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
              </Section>
              
            </form>
              
          <ScrollArea style={{ height: PRIMARY_COL_HEIGHT }}>
            <Stack>
              {
                flattenedMeta.map((elem, index) => <Section delay={0.2 + (0.1 * index)}><Comment data={elem} loggedUser={user} onClickDelete={onClickDelete}/></Section>)
              }
            </Stack>
          </ScrollArea> 
          </Stack>
        </Group>
        <Group>
          <Section delay={0.3}>
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
          </Section>
          <Section delay={0.4}>
            <Link href={`/users/${currVideo.owner._id}`} passHref>
              <a>
                {
                    currVideo.owner.username
                }
              </a>
            </Link>
          </Section>
        </Group>
        <Group>
          <Section delay={0.5}>
            <Title>
              {
                currVideo.title
              }
            </Title>
          </Section>
          <Section delay={0.5}>
            <Chip checked={false}>
              {
                currVideo.category
              }
            </Chip>
          </Section>
          <Section delay={0.5}>
            <ActionIcon onClick={() => {if (user) {currentUserLike ? mutationDeleteLike.mutate({ videoId: String(query.videoId!) }) : mutationPostLike.mutate({ videoId: String(query.videoId!) })} }} variant="default" radius="md" size={36}>
              <IconHeart fill={currentUserLike ? theme.colors.red[6] : ""} size={18} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>  
          </Section>
          <Section delay={0.5}>
            <Text>
              { 
                likes 
              }
            </Text>
          </Section>
        </Group>
        <Section delay={0.6}>
          <Text>
            {
              currVideo.description
            }
          </Text>  
        </Section>
        <Section delay={0.6}>
          <Divider/>
        </Section>
        <Section delay={0.7}>
          <Title>Related</Title>
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
              if (video._id === currVideo._id) return false
              if (video.category !== currVideo.category) return false
              return true
            }) || []).map((video, index) => {
              return <Section delay={0.8 + (0.1 * index)}><VideoCard video={video}/></Section>
            })
          }
        </SimpleGrid>
      </Stack>
    </Grid>
  );
}

WatchVideoPage.getLayout = function(page: ReactElement) {
  return <HomePageLayout path="/">{page}</HomePageLayout>
}

export default WatchVideoPage;