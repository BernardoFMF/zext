import { getModelForClass, prop, Ref } from "@typegoose/typegoose"
import { User } from "../user/user.model"
import { Video } from "../video/video.model"

export class Comment {
    @prop({ required: true })
    public text: string

    @prop({ default: Date.now() })
    public createdAt: Date;
}

export class UserMeta {
    @prop({ required: true, ref: () => User })
    public userId: Ref<User>

    @prop({ required: true, default: false })
    public liked: boolean

    @prop({ required: true, type: Comment, default: [] })
    public comments: Comment[]
}

export class Meta {
    @prop({ required: true, ref: () => Video })
    public videoId: Ref<Video>

    @prop({ required: true, default: 0, min: 0 })
    public likes: number

    @prop({ required: true, type: UserMeta, default: [] })
    public usersMeta: UserMeta[]
}

export const MetaModel = getModelForClass(Meta, {
    schemaOptions: {
        timestamps: true
    }
})