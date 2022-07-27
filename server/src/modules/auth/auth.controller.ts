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

    const payload = omit(user.toJSON(), ["password", "__v"]);
  
    const jwt = signJwt(payload)

    res.cookie("accessToken", jwt, {
        maxAge: 3.154e10,
        httpOnly: true,
        domain: "localhost", //change this when deploying 54:30
        path: "/",
        sameSite: "strict",
        secure: false //put true when deploying
    })

    return res.status(StatusCodes.OK).send(jwt)
}