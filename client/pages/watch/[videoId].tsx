import { useRouter } from "next/router";
import { ReactElement } from "react";
import HomePageLayout from "../../layout/home";
import { Container, SimpleGrid, Stack, ScrollArea, Group, Text, Grid, Skeleton, useMantineTheme, Paper, TextInput } from "@mantine/core";
import { useMeta } from "../../context/meta";

const PRIMARY_COL_HEIGHT = 550;

function WatchVideoPage() {
  const { query } = useRouter();
  const { meta } = useMeta()
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  const data = [
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto",
    "xpto"
  ]

  return (
    <Grid columns={4} gutter="xs" >
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
        <Stack>
        
            <TextInput>

            </TextInput>
        <ScrollArea style={{ height: PRIMARY_COL_HEIGHT - 100 }}>

          <Stack>
            {
              data.map(elem => <Text>elem</Text>)
            }
          </Stack>
        </ScrollArea> 
        </Stack>

      </Group>
    </Grid>
  );
}

WatchVideoPage.getLayout = function(page: ReactElement) {
  return <HomePageLayout path="/">{page}</HomePageLayout>
}

export default WatchVideoPage;