import { object, string, boolean, TypeOf } from "zod"

export const updateVideoSchema = {
    body: object({
        title: string(),
        description: string(),
        published: boolean(),
        category: string(),
        thumbnail: string()
    }),
    params: object({
        videoId: string()
    })
}

export type UpdateVideoBody = TypeOf<typeof updateVideoSchema.body>

export type UpdateVideoParams = TypeOf<typeof updateVideoSchema.params>