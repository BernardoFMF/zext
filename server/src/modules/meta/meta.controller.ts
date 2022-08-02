import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { addLike, deleteLike, addComment, deleteComment, getMeta, findMeta, createMeta, findUserMeta, createUserMeta } from "./meta.service"
import { findVideo } from "../video/video.service"
import { AddCommentParams, AddCommentBody, DeleteCommentParams, DeleteCommentBody, AddLikeParams, DeleteLikeParams, GetVideoMetaParams } from "./meta.schema"

export async function addCommentToVideo(req: Request<AddCommentParams, {}, AddCommentBody>, res: Response) {
    const { videoId } = req.params
    const { comment } = req.body
    
    const { _id: userId } = res.locals.user
    
    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    const meta = await findMeta({ videoId: video._id })

    if (!meta) return res.status(StatusCodes.NOT_FOUND).send("Meta not found")

    let userMeta = await findUserMeta({ userId, videoId: video._id })

    if (!userMeta) await createUserMeta({ userId, videoId: video._id }) 

    await addComment({ userId, videoId: video._id, comment })

    return res.status(StatusCodes.CREATED).send("Comment added successfully")
}

export async function deleteCommentFromVideo(req: Request<DeleteCommentParams, {}, DeleteCommentBody>, res: Response) {
    const { videoId } = req.params
    const { commentId } = req.body
    
    const { _id: userId } = res.locals.user

    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    const meta = await findMeta({ videoId: video._id })

    if (!meta) return res.status(StatusCodes.NOT_FOUND).send("Meta not found")

    let userMeta = await findUserMeta({ userId, videoId: video._id })

    if (!userMeta) return res.status(StatusCodes.NOT_FOUND).send("User meta not found")

    await deleteComment({ userId, videoId: video._id, commentId })

    return res.status(StatusCodes.OK).send("Comment deleted successfully")
}

export async function addLikeToVideo(req: Request<AddLikeParams, {}, {}>, res: Response) {
    const { videoId } = req.params
    
    const { _id: userId } = res.locals.user
    
    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    const meta = await findMeta({ videoId: video._id })

    if (!meta) return res.status(StatusCodes.NOT_FOUND).send("Meta not found")

    let userMeta = await findUserMeta({ userId, videoId: video._id })

    if (!userMeta) await createUserMeta({ userId, videoId: video._id }) 

    await addLike({ userId, videoId: video._id })
    
    return res.status(StatusCodes.CREATED).send("Liked added successfully")
}

export async function deleteLikeFromVideo(req: Request<DeleteLikeParams, {}, {}>, res: Response) {
    const { videoId } = req.params

    const { _id: userId } = res.locals.user

    const video = await findVideo(videoId)

    if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found")

    const meta = await findMeta({ videoId: video._id })

    if (!meta) return res.status(StatusCodes.NOT_FOUND).send("Meta not found")

    let userMeta = await findUserMeta({ userId, videoId: video._id })

    if (!userMeta) return res.status(StatusCodes.NOT_FOUND).send("User meta not found")

    await deleteLike({ userId, videoId: video._id })

    return res.status(StatusCodes.OK).send("Like deleted successfully")
}

export async function getVideoMeta(req: Request, res: Response) {
    const meta = await getMeta()

    return res.status(StatusCodes.OK).send(meta)
}