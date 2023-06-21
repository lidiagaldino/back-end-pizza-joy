import { Request, Response } from 'express'
import IClient from '../interfaces/Client'
import Client from '../services/Client'
import { StatusCodes } from "http-status-codes";

class ClientController {
    async store(req: Request<{}, {}, Omit<IClient, "id">>, res: Response) {
        const client = req.body

        const result = await Client.newClient(client)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
    async show(req: Request, res: Response) {
        const { user } = req

        const result = await Client.getById(user.id)

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND)
    }
    async update(req: Request<{}, {}, Omit<IClient, "id" | "endereco">>, res: Response) {
        const client = req.body

        const result = await Client.updade(client, req.user.id)

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

export default new ClientController()