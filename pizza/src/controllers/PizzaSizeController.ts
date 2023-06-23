import { Request, Response } from "express";
import IPizzaSize from "../interfaces/PizzaSize";
import PizzaSize from "../services/PizzaSize";
import { StatusCodes } from "http-status-codes";
import Pizza from "../services/Pizza";

class PizzaSizeController {
    async store(req: Request<{}, {}, IPizzaSize>, res: Response) {
        const pizzaSize = req.body

        const result = await PizzaSize.create(pizzaSize)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async index(req: Request, res: Response) {
        const { id } = req.params

        const result = await PizzaSize.getAll(Number(id))

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async delete(req: Request, res: Response) {
        const { pizza_id, size_id } = req.params

        const result = await PizzaSize.delete(Number(pizza_id), Number(size_id))

        return result ? res.status(StatusCodes.NO_CONTENT).json({}) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }
}

export default new PizzaSizeController()