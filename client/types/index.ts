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

export enum QueryKeys {
    me = "me",
    videos = "videos",
    users = "users"
}

export interface Me {
    _id: string;
    email: string;
    username: string;
    image: string;
}