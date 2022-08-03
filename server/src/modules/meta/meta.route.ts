import express from "express"
import requireUser from "../../middleware/requireUser"
import { addCommentToVideo, deleteCommentFromVideo, addLikeToVideo, deleteLikeFromVideo, getVideoMeta } from "./meta.controller"

const router = express.Router()

router.post("/:videoId/comments", requireUser, addCommentToVideo)

router.delete("/:videoId/comments/:commentId", requireUser, deleteCommentFromVideo)

router.post("/:videoId/likes", requireUser, addLikeToVideo)

router.delete("/:videoId/likes", requireUser, deleteLikeFromVideo)

router.get("/", getVideoMeta)

export default router