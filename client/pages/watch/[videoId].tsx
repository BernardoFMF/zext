import { useRouter } from "next/router";
import { ReactElement } from "react";
import HomePageLayout from "../../layout/home";

function WatchVideoPage() {
  const { query } = useRouter();

  return (
    <div>
      <video
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
        width="800px"
        height="auto"
        crossOrigin="anonymous"
        controls
        autoPlay
        id="video-player"
      />
    </div>
  );
}

WatchVideoPage.getLayout = function(page: ReactElement) {
  return <HomePageLayout path="/">{page}</HomePageLayout>
}

export default WatchVideoPage;