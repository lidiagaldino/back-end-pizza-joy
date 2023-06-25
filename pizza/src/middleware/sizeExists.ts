import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Size from "../services/Size";
import ISize from "../interfaces/Size";

export const sizeExists = (where: 'params' | 'body', name: 'id' | 'size_id' | 'size') => async (req: Request, res: Response, next: NextFunction) => {
    const id: number | { size_id: number }[] = req[where][name]

    let verify: false | ISize
    let error: boolean

    if (typeof id == 'object') {
        await Promise.all(id.map(async (item) => {
            verify = await Size.getById(Number(item.size_id));

            if (!verify) {
                error = true
            }

            return true;

        }))
    } else { verify = await Size.getById(Number(id)); error = false }

    return !error ? next() : res.status(StatusCodes.BAD_REQUEST).json({ error: "this size does not exist" })
}