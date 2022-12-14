import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import omit from "../../helpers/omit";
import { findUserByEmail } from "../user/user.service";
import { LoginBody } from "./auth.schema";
import { signJwt } from "./auth.utils";

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
    const { email, password } = req.body

    const user = await findUserByEmail(email)

    if (!user || !user.comparePassword(password))
        return res.status(StatusCodes.UNAUTHORIZED).send("Invalid email or password")

    // @ts-ignore: the array is a string array
    const payload = omit(user.toJSON(), ["password", "__v"]);
  
    const jwt = signJwt(payload)

    return res.status(StatusCodes.OK).send(jwt)
}