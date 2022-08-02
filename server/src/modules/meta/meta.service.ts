import { MetaModel } from "./meta.model"
import { Video } from "../video/video.model"

export function addLike({ userId, videoId }: { userId: string, videoId: string }) {
    return MetaModel.updateOne({ videoId }, {
        "$set": {
            "usersMeta.$[usersMeta].liked": true
        }
    }, {
        "arrayFilters": [
            {
                "usersMeta.userId": userId
            }
        ]
    })
}

export function deleteLike({ userId, videoId }: { userId: string, videoId: string }) {
    return MetaModel.updateOne({ videoId }, {
        "$set": {
            "usersMeta.$[usersMeta].liked": false
        }
    }, {
        "arrayFilters": [
            {
                "usersMeta.userId": userId
            }
        ]
    })
}

export function findMeta({ videoId }: { videoId: string }) {
    return MetaModel.findOne({ videoId })
}

export function createMeta({ videoId }: { videoId: Video["videoId"] }) {
    return MetaModel.create({ videoId })
}

export function addComment({ userId, videoId, comment }: { userId: string, videoId: string, comment: string }) {
    // @ts-ignore: Code works, but due to Comment class properties it's not able to be mapped properly
    return MetaModel.updateOne({ videoId }, {
        "$push": {
            "usersMeta.$[usersMeta].comments": {
                "text": comment
            }
        }
    }, {
        "arrayFilters": [
            {
                "usersMeta.userId": userId
            }
        ]
    })
}

export function deleteComment({ userId, videoId, commentId }: { userId: string, videoId: string, commentId: string }) {
    // @ts-ignore: Code works, but due to Comment class properties it's not able to be mapped properly
    return MetaModel.updateOne({ videoId }, {
        "$pull": {
            "usersMeta.$[usersMeta].comments": {
                "_id": commentId
            }
        }
    }, {
        "arrayFilters": [
            {
                "usersMeta.userId": userId
            }
        ]
    })
}

export function getMeta() {
    return MetaModel.find({})
}

export function findUserMeta({ userId, videoId }: { userId: string, videoId: Video["videoId"] }) {
    return MetaModel.findOne({ videoId, "usersMeta.userId": userId })
}

export function createUserMeta({ userId, videoId }: { userId: string, videoId: Video["videoId"] }) {
    // @ts-ignore: Code works, but due to UserMeta class properties it's not able to be mapped properly
    return MetaModel.updateOne({ videoId }, {
        "$push": {
            "usersMeta": {
                userId
            }
        }
    })
}