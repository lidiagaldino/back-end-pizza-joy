import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Category from "../services/Category";
import Ingredient from "../services/Ingredient";

export const categoryExists = (where: 'params' | 'body', name: 'id' | 'id_category' | 'category_id') => async (req: Request, res: Response, next: NextFunction) => {
    const id = req[where].category[name]

    const verify = await Category.getById(Number(id))

    return verify ? next() : res.status(StatusCodes.BAD_REQUEST).json({ error: "this category does not exist" })
}