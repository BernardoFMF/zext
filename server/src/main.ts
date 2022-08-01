import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectToDatabase, disconnectFromDatabase } from "./utils/database"
import logger from "./utils/logger"
import { CORS_ORIGIN } from "./constants"
import helmet from "helmet"
import userRoute from "./modules/user/user.route"
import authRoute from "./modules/auth/auth.route"
import videoRoute from "./modules/video/video.route"
import metaRoute from "./modules/meta/meta.route"
import deserializeUser from "./middleware/deserializeUser"

const PORT = process.env.PORT || 4000

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))
app.use(helmet({
    crossOriginEmbedderPolicy: false
}))

app.use(deserializeUser)

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/videos", videoRoute)
app.use("/api/meta", metaRoute)

app.use('/data', express.static('data'));

const server = app.listen(PORT, async () => {
    await connectToDatabase()
    logger.info(`Started server in port ${PORT} and connected to database`);
})


const signals = ["SIGTERM", "SIGINT"]

function gracefulShutdown(signal: string) {
    process.on(signal, async () => {
        logger.info(`graceful shutdown with signal ${signal}`);
        server.close()

        //disconnect from database
        await disconnectFromDatabase()

        logger.info(`Process is finished`);
        process.exit(0)
    })
}

for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i])
}