import { Request, Response } from "express";
import IDeliveryman from "../interfaces/Deliveryman";
import Deliveryman from "../services/Deliveryman";
import StatusCodes from 'http-status-codes'
import ILocation from "../interfaces/Location";

class DeliverymanController {
    async store(req: Request<{}, {}, Omit<IDeliveryman, 'id'>>, res: Response) {
        const deliveryman = req.body

        const result = await Deliveryman.newDeliveryman(deliveryman)

        return result ? res.status(StatusCodes.CREATED).json(result) : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({})
    }

    async nearestDeliverymans(req: Request<{}, {}, {}, ILocation>, res: Response) {
        console.log(req.query);
        const result = await Deliveryman.findNearestDeliveryman(req.query)

        return result ? res.status(StatusCodes.OK).json(result) : res.status(StatusCodes.NOT_FOUND).json({})
    }
}

export default new DeliverymanController()