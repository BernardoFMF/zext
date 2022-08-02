export interface Video {
    _id: string;
    owner: string | any;
    published: boolean;
    videoId: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    extension: string;
    description: string;
    title: string;
    category: string;
    thumbnail: string;
  }

export interface Me {
    _id: string;
    email: string;
    username: string;
    image: string;
}

export interface Comment {
    _id: string;
    text: string;
    createdAt: Date;
}

export interface UserMeta {
    userId: string;
    liked: boolean;
    comments: Comment[]
}

export interface Meta {
    _id: string;
    videoId: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    usersMeta: UserMeta[]
}

export enum QueryKeys {
    me = "me",
    videos = "videos",
    users = "users",
    meta = "meta"
}