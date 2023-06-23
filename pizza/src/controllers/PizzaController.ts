import { Request, Response } from "express";
import IPizza from "../interfaces/Pizza";
import Pizza from "../services/Pizza";
import { StatusCodes } from "http-status-codes";
import KafkaSendMessage from "../kafka/KafkaSendMessage";

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

    async store(req: Request<{}, {}, Omit<IPizza, "id">>, res: Response) {
        const pizza = req.body

        const result = await Pizza.newPizza(pizza)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }
}

export default new PizzaController()