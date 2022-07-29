import { getModelForClass, prop, Ref } from "@typegoose/typegoose"
import { User } from "../user/user.model"
import { Video } from "../video/video.model"

export class Like {
    @prop({ required: true, ref: () => User })
    public userId: Ref<User>

    @prop({ required: true, ref: () => Video })
    public videoId: Ref<Video>
}

export const LikeModel = getModelForClass(Like, {
    schemaOptions: {
        timestamps: true
    }
})