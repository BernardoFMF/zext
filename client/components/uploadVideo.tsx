import { Modal, Box, Tooltip, UnstyledButton, createStyles, Group, FileInput, Select, Text, Progress, Stack, TextInput, Switch, Button } from "@mantine/core";
import { useState } from "react";
import { IconPhoto, IconUpload, IconX } from '@tabler/icons'
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useMutation } from "@tanstack/react-query";
import { updateVideo, uploadVideo } from "../api";
import { useForm } from "@mantine/form";
import { Video } from "../types";
import { AxiosError, AxiosResponse } from "axios";
import { categories } from "../static-data/categories";
import { useVideo } from "../context/videos";

const useStyles = createStyles((theme) => ({
    link: {
      width: 50,
      height: 50,
      borderRadius: theme.radius.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      },
    },
  
    active: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  }));
  
function EditVideoForm({ videoId, onClose }: { videoId: string, onClose: () => void}) {
    const { refetch } = useVideo()

    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            category: "",
            thumbnail: undefined,
            published: true
        }
    })

    const mutation = useMutation<AxiosResponse<Video>, AxiosError, Parameters<typeof updateVideo>["0"]>(updateVideo, {
        onSuccess: () => {
            onClose()
            refetch()
        },
    })

    return (
        <form
          onSubmit={form.onSubmit((values) =>
            mutation.mutate({ videoId, ...values })
          )}
        >
          <Stack>
            <TextInput
              label="Title"
              required
              placeholder="My awesome video"
              {...form.getInputProps("title")}
            />
    
            <TextInput
              label="Description"
              required
              {...form.getInputProps("description")}
            />

            <Select 
                label="Category"
                placeholder="Pick one"
                {...form.getInputProps("category")}
                required
                data={categories.map(entry => {
                    let formatted = { value: entry, label: entry }
                    return formatted
                })}
            />

            <FileInput 
                label="Upload thumbnail" 
                placeholder="Thumbnail" 
                accept="image/png,image/jpeg" 
                {...form.getInputProps("thumbnail")}
            />
            <Switch label="Published" {...form.getInputProps("published")} />
            <Button type="submit">Save</Button>
          </Stack>
        </form>
      );
}

export default function UploadVideo() {
    const [open, setOpen] = useState(false)
    const { classes, cx } = useStyles();

    const [progress, setProgress] = useState(0)

    const mutation = useMutation(uploadVideo)

    const config = {
        onUploadProgress: (progressEvent: any) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percent)
        }
    }

    function upload(files: File[]) {
        const formData = new FormData()

        formData.append("video", files[0])

        mutation.mutate({ formData, config })
    }

    return (
        <>
            <Modal
                opened={open}
                closeOnClickOutside={false}
                onClose={() => setOpen(false)}
                title="Upload video"
                overlayBlur={10}
                size="xl"
            >
                {
                    progress === 0 &&
                        <Dropzone
                            onDrop={(files) => {
                                upload(files)
                            }}
                            accept={[ MIME_TYPES.mp4 ]}
                            multiple={false}
                        >
                            <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                                <Dropzone.Accept>
                                    <IconUpload />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconPhoto />
                                </Dropzone.Idle>

                                <div>
                                    <Text size="xl" inline>
                                        Drag videos here or click to select files
                                    </Text>
                                    <Text size="sm" color="dimmed" inline mt={7}>
                                        Attach only one video
                                    </Text>
                                </div>
                            </Group>
                        </Dropzone>
                }
                {
                    progress > 0 && 
                        <Progress 
                            size="xl"
                            label={`${progress}%`}
                            value={progress}
                            mb="xl"
                        />
                }
                {
                    mutation.data && 
                        <EditVideoForm videoId={mutation.data.videoId} onClose={() => { setOpen(false); setTimeout(() => {setProgress(0); mutation.reset()}, 200) }} />
                }
            </Modal>

            <Box mb={5}>
                <Tooltip label={"Upload video"} position="right" transitionDuration={0}>
                
                    <UnstyledButton className={cx(classes.link)} onClick={() => setOpen(true)}>
                        <IconUpload stroke={1.5} />
                    </UnstyledButton>
                
                </Tooltip>
            </Box>
        </>
    )
}