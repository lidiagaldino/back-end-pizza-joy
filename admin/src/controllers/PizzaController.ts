import { Request, Response } from "express";
import IPizza from "../interfaces/Pizza";
import Pizza from "../services/Pizza";
import { StatusCodes } from "http-status-codes";
import KafkaSendMessage from "../kafka/KafkaSendMessage";

class PizzaController {
    async store(req: Request<{}, {}, Omit<IPizza, "id">>, res: Response) {
        const pizza = req.body

        const result = await Pizza.newPizza(pizza)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }
}

export default new PizzaController()