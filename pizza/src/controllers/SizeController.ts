import { Request, Response } from "express";
import ISize from "../interfaces/Size";
import Size from "../services/Size";
import { StatusCodes } from "http-status-codes";

class SizeController {
    async store(req: Request<{}, {}, Omit<ISize, 'id'>>, res: Response) {
        const size = req.body

        const result = await Size.create(size)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        const result = await Size.delete(Number(id))

        return result ? res.status(StatusCodes.NO_CONTENT).json({}) : res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }

    async index(_req: Request, res: Response) {
        const result = await Size.getAll()

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async show(req: Request, res: Response) {
        const { id } = req.params

        const result = await Size.getById(Number(id))

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async update(req: Request<{ id: string }, {}, Omit<ISize, 'id'>>, res: Response) {
        const { id } = req.params
        const size = req.body

        const result = await Size.update(size, Number(id))

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }
}

export default new SizeController()