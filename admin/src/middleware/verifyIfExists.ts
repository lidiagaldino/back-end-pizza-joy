import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import Admin from "../services/Admin"

export const verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {

    const verification = await Admin.getByEmail(req.body.email)

    if (verification) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'email has already been taken' })
    }

    next()
}