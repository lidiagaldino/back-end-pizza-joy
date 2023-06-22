import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import Client from "../services/Client"

export const verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {

    const verification = await Client.getByEmail(req.body.email)

    if (verification) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'email has already been taken' })
    }

    next()
}