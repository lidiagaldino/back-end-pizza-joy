import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { modo } = req.user

    if (modo == 'ADMIN') return next(); else return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'only admins are authorized' })
}