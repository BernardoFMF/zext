import Image from "next/image"
import { Box, Avatar } from "@mantine/core"

function UserImageContainer({ image, userId }: { image?: string, userId: string }) {
    return (
        <>
            {
                !image ? (
                    <Box>
                        <Avatar size={50} src={null} alt="no image here" />
                    </Box>
                ) : (
                    <div style={{ borderRadius: "50%", overflow: "hidden", width: "50px", height: "50px" }}>
                        <Image 
                            src={process.env.NEXT_PUBLIC_API_ENDPOINT + "/data/" + image} 
                            alt={userId} 
                            height={50}
                            width={50}
                        />
                    </div>
                )
            }
        </>
    )
}

export default UserImageContainer