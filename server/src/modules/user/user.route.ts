import express from "express"
import { processRequestBody } from "zod-express-middleware"
import requireUser from "../../middleware/requireUser"
import { uploadProfileImage } from "../../utils/multer"
import { getLoggedUser, registerUserHandler, updateProfileImage } from "./user.controller"
import { registerUserSchema } from "./user.schema"

const router = express.Router()

router.post("/", processRequestBody(registerUserSchema.body), registerUserHandler)

router.put("/", requireUser, uploadProfileImage.single("image"), updateProfileImage)

router.get("/logged", requireUser, getLoggedUser)

export default router