import { MetaModel } from "./meta.model"

export function addLike({ userId, videoId }: { userId: string, videoId: string }) {
    const meta =  MetaModel.findOne({ userId, videoId })

    if (!meta) return MetaModel.create({ userId, videoId, liked: true })
    else {
        return MetaModel.updateOne({ userId, videoId }, {
            "$set": {
                "liked": true
            }
        })
    }
}

export function deleteLike({ userId, videoId }: { userId: string, videoId: string }) {
    return MetaModel.updateOne({ userId, videoId }, {
        "$set": {
            "liked": false
        }
    })
}

export function addComment({ userId, videoId, comment }: { userId: string, videoId: string, comment: string }) {
    const meta =  MetaModel.findOne({ userId, videoId })

    if (!meta) MetaModel.create({ userId, videoId })

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
    }).lean()
}