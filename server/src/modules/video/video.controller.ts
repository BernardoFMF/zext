import busboy from "busboy";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Video } from "./video.model";
import { createVideo } from "./video.service";

const MIME_TYPES = ["video/mp4"] //video/mov

function getPath({ videoId, extension }: { videoId: Video["videoId"]; extension: Video["extension"] }) {
    return `${process.cwd()}/videos/${videoId}.${extension}`
}

export async function uploadVideoHandler(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers })

    const user = res.locals.user

    const video = await createVideo({ owner: user._id })

    bb.on("file", async (_, file, info) => {
        if (!MIME_TYPES.includes(info.mimeType)) {
            return res.status(StatusCodes.BAD_REQUEST).send("Invalid file type")
        }

        const extension = info.mimeType.split("/")[1]

        // 1:25:00
    })
}