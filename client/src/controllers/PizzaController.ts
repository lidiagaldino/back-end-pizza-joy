import { Request, Response } from "express";
import Pizza from "../services/Pizza";
import { StatusCodes } from "http-status-codes";

class PizzaController {
    async index(_req: Request, res: Response) {
        const pizzas = await Pizza.getPizzas()

        return pizzas ? res.status(StatusCodes.OK).json(pizzas) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async show(req: Request, res: Response) {
        const { id } = req.params

        const pizza = await Pizza.getPizzaById(Number(id))

        return pizza ? res.status(StatusCodes.OK).json(pizza) : res.status(StatusCodes.NOT_FOUND).json({})
    }
}

export default new PizzaController()