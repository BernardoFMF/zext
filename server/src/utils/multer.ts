import multer from "multer"
import { Request } from "express"
import path from "path"

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storageThumbnail = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
        cb(null, "data/thumbnails")
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
        const name: string = Date.now() + path.extname(file.originalname)
        req.body.thumbnail = "thumbnails/" + name;

        cb(null, name)
    }
})

const storageProfile = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
        cb(null, "data/profile-images")
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
        const name: string = Date.now() + path.extname(file.originalname)
        req.body.image = "profile-images/" + name;
        cb(null, name)
    }
})

export const uploadThumbnail = multer({ storage: storageThumbnail })

export const uploadProfileImage = multer({ storage: storageProfile })