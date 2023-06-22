import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import Admin from "../services/Admin"
import Client from "../services/Client"

export const verifyIfExists = (user_type: "ADMIN" | "CLIENT") => async (req: Request, res: Response, next: NextFunction) => {

    const verification = user_type == 'ADMIN' ? await Admin.getByEmail(req.body.email) : await Client.getByEmail(req.body.email)

    if (verification) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'email has already been taken' })
    }

    next()
}