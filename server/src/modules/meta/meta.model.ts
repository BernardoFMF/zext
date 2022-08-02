import { getModelForClass, prop, Ref } from "@typegoose/typegoose"
import { User } from "../user/user.model"
import { Video } from "../video/video.model"

export class Comment {
    @prop({ required: true })
    public text: string

    @prop({ default: Date.now() })
    public createdAt: Date;
}

export class Meta {
    @prop({ required: true, ref: () => User })
    public userId: Ref<User>

    @prop({ required: true, ref: () => Video })
    public videoId: Ref<Video>

    @prop({ required: true, default: false })
    public liked: boolean

    @prop({ required: true, type: Comment, default: [] })
    public comments: Comment[]
}

export const MetaModel = getModelForClass(Meta, {
    schemaOptions: {
        timestamps: true
    }
})