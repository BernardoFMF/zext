import express from "express"
import requireUser from "../../middleware/requireUser"
import { addLikeToVideo, deleteLikeFromVideo, getLikesFromVideo } from "./meta-like.controller"

const router = express.Router()

router.post("/", requireUser, addLikeToVideo)

router.delete("/:videoId", requireUser, deleteLikeFromVideo)

router.get("/:videoId", requireUser, getLikesFromVideo)

export default router