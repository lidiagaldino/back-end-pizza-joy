import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import IAdmin from '../interfaces/Admin'
import Admin from '../services/Admin'

class AdminController {
    async store(req: Request<{}, {}, Omit<IAdmin, "id">>, res: Response) {
        const data = req.body

        const result = await Admin.newAdmin(data)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async show(req: Request, res: Response) {
        const { user } = req

        const admin = await Admin.getById(user.id)

        return admin ? res.status(StatusCodes.OK).json(admin) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async update(req: Request<{}, {}, Omit<IAdmin, "id">>, res: Response) {
        const data = req.body
        const { user } = req

        const result = await Admin.update(data, user.id)

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }
}

export default new AdminController()