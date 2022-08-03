import { object, string, TypeOf } from "zod"

export const addCommentSchema = {
    body: object({
        comment: string()
    }),
    params: object({
        videoId: string()
    })
}

export const deleteCommentSchema = {
    params: object({
        videoId: string(),
        commentId: string()
    })
}

export const addLikeSchema = {
    params: object({
        videoId: string()
    })
}

export const deleteLikeSchema = {
    params: object({
        videoId: string()
    })
}

export const getVideoMetaSchema = {
    params: object({
        videoId: string()
    })
}

export type AddCommentBody = TypeOf<typeof addCommentSchema.body>

export type AddCommentParams = TypeOf<typeof addCommentSchema.params>

export type DeleteCommentParams = TypeOf<typeof deleteCommentSchema.params>

export type AddLikeParams = TypeOf<typeof addLikeSchema.params>

export type DeleteLikeParams = TypeOf<typeof deleteLikeSchema.params>

export type GetVideoMetaParams = TypeOf<typeof getVideoMetaSchema.params>