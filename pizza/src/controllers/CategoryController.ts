import { Request, Response } from "express";
import ICategory from "../interfaces/Category";
import Category from "../services/Category";
import { StatusCodes } from "http-status-codes";

class CategoryController {
    async store(req: Request<{}, {}, Omit<ICategory, 'id'>>, res: Response) {
        const category = req.body

        const result = await Category.newCategory(category)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async update(req: Request<{ id: string }, {}, Omit<ICategory, 'id'>>, res: Response) {
        const category = req.body
        const { id } = req.params

        const result = await Category.updateCategory(category, Number(id))

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async index(_req: Request, res: Response) {
        const result = await Category.getAll()

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async show(req: Request, res: Response) {
        const { id } = req.params

        const result = await Category.getPizza(Number(id))

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }
}

export default new CategoryController()