import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Ingredient from "../services/Ingredient";
import IIngredient from "../interfaces/Ingredient";

export const ingredientExists = (where: 'params' | 'body', name: 'id' | 'id_ingredient' | 'ingredient_id' | 'ingredient') => async (req: Request, res: Response, next: NextFunction) => {
    const id: number | { ingredient_id: number }[] = req[where][name]

    let verify: false | IIngredient
    let error: boolean

    if (typeof id == 'object') {
        await Promise.all(id.map(async (item) => {
            verify = await Ingredient.getById(Number(item.ingredient_id));

            if (!verify) {
                error = true
            }

            return true;

        }))
    } else { verify = await Ingredient.getById(Number(id)); error = false }

    return error ? res.status(StatusCodes.BAD_REQUEST).json({ error: "this ingredient does not exist" }) : next()
}