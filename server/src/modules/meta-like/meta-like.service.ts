import { LikeModel } from "./meta-like.model"

export function createLike({ userId, videoId }: { userId: string, videoId: string }) {
    return LikeModel.create({ userId, videoId })
}

export function deleteLike({ userId, videoId }: { userId: string, videoId: string }) {
    return LikeModel.deleteOne({ userId, videoId })
}

export function getLikes(videoId: string) {
    return LikeModel.find({ 
        videoId 
    }).lean()
}