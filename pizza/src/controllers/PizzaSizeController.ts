import { Request, Response } from "express";
import IPizzaSize from "../interfaces/PizzaSize";
import PizzaSize from "../services/PizzaSize";
import { StatusCodes } from "http-status-codes";

class PizzaSizeController {
    async store(req: Request<{}, {}, IPizzaSize>, res: Response) {
        const pizzaSize = req.body

        const verify = await PizzaSize.find(pizzaSize.pizza_id, pizzaSize.size_id)

        if (verify) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'this pizza already has this size' })
        }

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

        const verify = await PizzaSize.getAll(Number(pizza_id))

        if (verify) {
            if (verify.length < 2) return res.status(StatusCodes.BAD_REQUEST).json({ error: 'a pizza cannot have less than one size' })
        }

        const result = await PizzaSize.delete(Number(pizza_id), Number(size_id))

        return result ? res.status(StatusCodes.NO_CONTENT).json({}) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async showMany(req: Request<{}, {}, {}, { pizza_size_id: number[] }>, res: Response) {
        const { query } = req
        console.log(JSON.parse(query.pizza_size_id.toString()));

        const result = await PizzaSize.getManyPizzas(JSON.parse(query.pizza_size_id.toString()))

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({ error: 'some of the requested products were not found or are repeated' })
    }
}

export default new PizzaSizeController()