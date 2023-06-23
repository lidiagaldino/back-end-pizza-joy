import { Request, Response } from "express";
import IPizzaIngredient from "../interfaces/PizzaIngredient";
import PizzaIngredient from "../services/PizzaIngredient";
import { StatusCodes } from "http-status-codes";

class PizzaIngredientController {
    async store(req: Request<{}, {}, Omit<IPizzaIngredient, 'id'>>, res: Response) {
        const pizzaIngredient = req.body

        const verifyIfAlreadyExists = await PizzaIngredient.find(pizzaIngredient.id_pizza, pizzaIngredient.ingredient_id)

        if (verifyIfAlreadyExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'this pizza already has this ingredient' })
        }

        const result = await PizzaIngredient.create(pizzaIngredient)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async delete(req: Request, res: Response) {
        const { pizza_id, id_ingredient } = req.params

        const verify = await PizzaIngredient.getAll(Number(pizza_id))

        if (verify) {
            if (verify.length < 2) return res.status(StatusCodes.BAD_REQUEST).json({ error: 'a pizza cannot have less than one ingredient' })
        }

        const result = await PizzaIngredient.delete(Number(pizza_id), Number(id_ingredient))

        return result ? res.status(StatusCodes.NO_CONTENT).json({}) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async index(req: Request, res: Response) {
        const { id } = req.params

        const result = await PizzaIngredient.getAll(Number(id))

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }
}

export default new PizzaIngredientController()