import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { addLike, deleteLike, addComment, deleteComment, getMeta } from "./meta.service"
import { findVideo } from "../video/video.service"

export async function addCommentToVideo(req: Request, res: Response) {
    const { videoId } = req.params
    const { comment } = req.body
    
    const { _id: userId } = res.locals.user
    
    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    await addComment({ userId, videoId: video._id, comment })
    
    return res.status(StatusCodes.CREATED).send("Comment added successfully")
}

export async function deleteCommentFromVideo(req: Request, res: Response) {
    const { videoId } = req.params
    const { commentId } = req.body
    
    const { _id: userId } = res.locals.user

    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    await deleteComment({ userId, videoId: video._id, commentId })

    return res.status(StatusCodes.OK).send("Comment deleted successfully")
}

export async function addLikeToVideo(req: Request, res: Response) {
    const { videoId } = req.params
    
    const { _id: userId } = res.locals.user
    
    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    await addLike({ userId, videoId: video._id })
    
    return res.status(StatusCodes.CREATED).send("Liked added successfully")
}

export async function deleteLikeFromVideo(req: Request, res: Response) {
    const { videoId } = req.params

    const { _id: userId } = res.locals.user

    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    await deleteLike({ userId, videoId: video._id })

    return res.status(StatusCodes.OK).send("Like deleted successfully")
}

export async function getVideoMeta(req: Request, res: Response) {
    const { videoId } = req.params

    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")
        
    const meta = getMeta(video._id )

    return res.status(StatusCodes.OK).send(meta)
}