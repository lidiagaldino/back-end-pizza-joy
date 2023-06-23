import { Request, Response } from "express";
import IIngredient from "../interfaces/Ingredient";
import Ingredient from "../services/Ingredient";
import { StatusCodes } from "http-status-codes";

class IngredientController {
    async store(req: Request<{}, {}, Omit<IIngredient, 'id'>>, res: Response) {
        const ingredient = req.body

        const result = await Ingredient.create(ingredient)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async index(_req: Request, res: Response) {
        const result = await Ingredient.getAll()

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async update(req: Request<{ id: string }, {}, Omit<IIngredient, 'id'>>, res: Response) {
        const { id } = req.params
        const ingredient = req.body

        const result = await Ingredient.update(ingredient, Number(id))

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async show(req: Request, res: Response) {
        const { id } = req.params

        const result = await Ingredient.getById(Number(id))

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const result = await Ingredient.delete(Number(id))

        return result ? res.status(StatusCodes.NO_CONTENT).json({}) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }
}

export default new IngredientController()