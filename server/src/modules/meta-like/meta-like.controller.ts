import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { createLike, deleteLike, getLikes } from "./meta-like.service"
import { findVideo } from "../video/video.service"

export async function addLikeToVideo(req: Request, res: Response) {
    const { videoId } = req.body
    
    const { _id: userId } = res.locals.user

    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    const like = await createLike({ userId, videoId })

    return res.status(StatusCodes.OK).send(like)
}

export async function deleteLikeFromVideo(req: Request, res: Response) {
    const { videoId } = req.params

    const { _id: userId } = res.locals.user

    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    await deleteLike({ userId, videoId })

    return res.status(StatusCodes.OK).send("Like deleted successfully")
}

export async function getLikesFromVideo(req: Request, res: Response) {
    const { videoId } = req.params

    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    const likes = await getLikes(videoId)

    return res.status(StatusCodes.OK).send(likes)
}