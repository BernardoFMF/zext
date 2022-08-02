import { MetaModel } from "./meta.model"
import { Video } from "../video/video.model"

export function addLike({ userId, videoId }: { userId: string, videoId: string }) {
    return MetaModel.updateOne({ userId, videoId }, {
        "$set": {
            "liked": true
        }
    })
}

export function deleteLike({ userId, videoId }: { userId: string, videoId: string }) {
    return MetaModel.updateOne({ userId, videoId }, {
        "$set": {
            "liked": false
        }
    })
}

export function findMeta({ userId, videoId }: { userId: string, videoId: string }) {
    return MetaModel.findOne({ userId, videoId })
}

export function createMeta({ userId, videoId }: { userId: string, videoId: Video["videoId"] }) {
    return MetaModel.create({ userId, videoId })
}

export function addComment({ userId, videoId, comment }: { userId: string, videoId: string, comment: string }) {
    // @ts-ignore: Code works, but due to Comment class properties it's not abled to be mapped properly
    return MetaModel.updateOne({ userId, videoId }, {
        "$push": {
            "comments": {
                "text": comment
            }
        }
    })
}

export function deleteComment({ userId, videoId, commentId }: { userId: string, videoId: string, commentId: string }) {
    return MetaModel.updateOne({ userId, videoId }, {
        "$pull": {
            "comments": {
                "_id": commentId
            }
        }
    })
}

export function getMeta(videoId: string) {
    return MetaModel.find({ 
        videoId
    })
}