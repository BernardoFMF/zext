import { VideoModel } from "./video.model";

export function createVideo({ owner }: { owner: string }) {
    return VideoModel.create({ owner })
}