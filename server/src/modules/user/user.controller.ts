import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { RegisterUserBody, UpdateProfilePictureBody } from "./user.schema"
import { createUser, findUserByEmail, findUsers } from "./user.service"
import lodash from "lodash"

export async function registerUserHandler(req: Request<{}, {}, RegisterUserBody>, res: Response) {
    const { username, email, password } = req.body

    try {
        await createUser({ username, email, password })

        return res.status(StatusCodes.CREATED).send("User created successfully")
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(StatusCodes.CONFLICT).send("User already exists")
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message)
    }
}

export async function updateProfileImage(req: Request<{}, {}, UpdateProfilePictureBody>, res: Response) {
    const { image } = req.body

    const { email } = res.locals.user

    const user = await findUserByEmail(email)

    if (!user) return res.status(StatusCodes.NOT_FOUND).send("User does not exist")

    user.image = image
    user.save()

    return res.status(StatusCodes.OK).send("Image updated successfully")
}

export async function getLoggedUser(req: Request, res: Response) {
    res.send(res.locals.user)
}

export async function getUsers(req: Request, res: Response) {
    const users = await findUsers()

    return res.status(StatusCodes.OK).send(users.map(user => lodash.omit(user, ["password", "createdAt", "updatedAt", "__v"])))
}