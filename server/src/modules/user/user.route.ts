import express from "express"
import { processRequestBody } from "zod-express-middleware"
import requireUser from "../../middleware/requireUser"
import { getLoggedUser, registerUserHandler } from "./user.controller"
import { registerUserSchema } from "./user.schema"

const router = express.Router()

router.post("/", processRequestBody(registerUserSchema.body), registerUserHandler)

router.get("/logged", requireUser, getLoggedUser)

export default router