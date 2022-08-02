import busboy from "busboy";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Video } from "./video.model";
import { createVideo, findVideo, findVideos } from "./video.service";
import fs from "fs"
import { UpdateVideoBody, UpdateVideoParams } from "./video.schema";
import { findUser } from "../user/user.service";
import omit from "../../helpers/omit";
import { createMeta } from "../meta/meta.service";

const MIME_TYPES = ["video/mp4"] //video/mov

const CHUNK_SIZE_IN_BYTES = 1000000 // 1mb, instead of static detect based on internet speed

function getPath({ videoId, extension }: { videoId: Video["videoId"]; extension: Video["extension"] }) {
    return `${process.cwd()}/data/videos/${videoId}.${extension}`
}

export async function uploadVideoHandler(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers })

    const { _id } = res.locals.user

    const video = await createVideo({ owner: _id })

    await createMeta({ videoId: video._id })

    bb.on("file", async (_, file, info) => {
        if (!MIME_TYPES.includes(info.mimeType)) {
            return res.status(StatusCodes.BAD_REQUEST).send("Invalid file type")
        }

        const extension = info.mimeType.split("/")[1]

        const filePath = getPath({
            videoId: video.videoId,
            extension
        })

        video.extension = extension

        await video.save()

        const stream = fs.createWriteStream(filePath)

        file.pipe(stream)
    })

    bb.on("close", () => {
        res.writeHead(StatusCodes.CREATED, {
            Connection: "close",
            "Content-Type": "application/json"
        })

        res.write(JSON.stringify(video))
        res.end()
    })

    return req.pipe(bb)
}

export async function updateVideoHandler(req: Request<UpdateVideoParams, {}, UpdateVideoBody>, res: Response) {
    const { videoId } = req.params
    const { title, description, published, category, thumbnail } = req.body
    
    const { _id: userId } = res.locals.user

    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    if (String(video.owner) !== String(userId)) return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized")

    video.title = title
    video.description = description
    video.published = published
    video.category = category
    video.thumbnail = thumbnail

    await video.save()

    return res.status(StatusCodes.OK).send(video)
}

export async function findVideosHandler(_: Request, res: Response) {
    const videos = await findVideos()

    const usersPromises = videos.map(async video => {
        return await findUser(String(video.owner))
    })
    
    const users = await Promise.all(usersPromises)

    const mappedUsers = users.map(user => {
        let mappedUser = {
            _id: String(user?._id),
            username: user?.username,
            image: user?.image
        }
        return mappedUser
    })
    
    const joinedVideos = videos.map(video => {
        let joinedVideo = { ...video }
        // @ts-ignore: the property is this format doesn't exist, but it's necessary
        joinedVideo.owner = mappedUsers.filter(user => user._id === String(video.owner))[0]
        return joinedVideo
    })

    return res.status(StatusCodes.OK).send(joinedVideos)
}

export async function streamVideoHandler(req: Request, res: Response) {
    const { videoId } = req.params

    const range = req.headers.range

    if (!range) return res.status(StatusCodes.BAD_REQUEST).send("Range must be provided")

    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    const filePath = getPath({
        videoId: video.videoId,
        extension: video.extension
    })

    const fileSizeInBytes = fs.statSync(filePath).size

    const chunkStart = Number(range.replace(/\D/g, ""))

    const chunkEnd = Math.min(chunkStart + CHUNK_SIZE_IN_BYTES, fileSizeInBytes - 1)

    const contentLength = chunkEnd - chunkStart + 1

    const headers = {
        "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${fileSizeInBytes}`,
        "Accept-Ranges": "bytes",
        "Content-length": contentLength,
        "Content-Type": `video/${video.extension}`,
        "Cross-Origin_Resource-Policy": "cross-origin"
    }

    res.writeHead(StatusCodes.PARTIAL_CONTENT, headers)

    const videoStream = fs.createReadStream(filePath, {
        start: chunkStart,
        end: chunkEnd
    })

    videoStream.pipe(res)
}

export async function getVideoMeta(req: Request, res: Response) {
    const { videoId } = req.params

    //const comments = await findComments(videoId)
    //const likes = await findLikes(videoId)

    //if (res.locals.user)
    //...


    //return res.status(StatusCodes.OK).send({ comments, likes, likedByUser: false })
}