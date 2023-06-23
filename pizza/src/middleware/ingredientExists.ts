import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Ingredient from "../services/Ingredient";

export const ingredientExists = (where: 'params' | 'body', name: 'id' | 'id_ingredient' | 'ingredient_id') => async (req: Request, res: Response, next: NextFunction) => {
    const id = req[where][name]

    const verify = await Ingredient.getById(Number(id))

    return verify ? next() : res.status(StatusCodes.BAD_REQUEST).json({ error: "ingredient does not exist" })
}