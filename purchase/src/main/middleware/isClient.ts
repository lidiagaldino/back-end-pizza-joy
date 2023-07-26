import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const isClient = (req: Request, res: Response, next: NextFunction) => {
    const { modo } = req.user

    if (modo == 'CLIENT') return next(); else return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'UNAUTHORIZED' })
}