import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Size from "../services/Size";

export const sizeExists = (where: 'params' | 'body', name: 'id' | 'size_id') => async (req: Request, res: Response, next: NextFunction) => {
    const id = req[where][name]

    const verify = await Size.getById(Number(id))

    return verify ? next() : res.status(StatusCodes.BAD_REQUEST).json({ error: "size does not exist" })
}