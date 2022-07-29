import express from "express"
import requireUser from "../../middleware/requireUser"
import { findVideosHandler, updateVideoHandler, uploadVideoHandler, streamVideoHandler, getVideoMeta } from "./video.controller"

const router = express.Router()

router.post("/", requireUser, uploadVideoHandler)

router.patch("/:videoId", requireUser, updateVideoHandler)

router.get("/:videoId", streamVideoHandler)

router.get("/", findVideosHandler)

router.get("/:videoId/meta", getVideoMeta)


export default router