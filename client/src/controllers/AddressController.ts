import { Request, Response } from "express"
import Address from "../services/Address"
import { StatusCodes } from "http-status-codes"
import IAddress from "../interfaces/Address"
import TParam from "../interfaces/Params"

class AddressController {
    async index(req: Request, res: Response) {
        const { user } = req

        const adresses = await Address.getMyadresses(user.id)

        return adresses ? res.status(StatusCodes.OK).json(adresses) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async show(req: Request, res: Response) {
        const { id } = req.params

        const address = await Address.getAddressById(Number(id))

        return address ? res.status(StatusCodes.OK).json(address) : res.status(StatusCodes.NOT_FOUND).json({})
    }

    async store(req: Request<{}, {}, Omit<IAddress, "id">>, res: Response) {
        const { id } = req.user
        const address = req.body

        const result = await Address.newAddress(address, id)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async update(req: Request<TParam, {}, Omit<IAddress, "id">>, res: Response) {
        const { id } = req.params
        const address = req.body

        const result = await Address.updateAddress(address, Number(id))

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})

    }
}

export default new AddressController()