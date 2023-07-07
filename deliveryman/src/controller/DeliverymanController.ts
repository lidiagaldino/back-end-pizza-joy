import { Request, Response } from "express";
import IDeliveryman from "../interfaces/Deliveryman";
import Deliveryman from "../services/Deliveryman";
import StatusCodes from 'http-status-codes'
import ILocation from "../interfaces/Location";
import ILogin from "../interfaces/Login";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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

    async login(req: Request<{}, {}, ILogin>, res: Response) {
        const result = await Deliveryman.findByEmail(req.body.email)

        if (!result) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
        }

        const isPassValid = await bcrypt.compare(req.body.password, result.password);

        if (!isPassValid) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "UNAUTHORIZED" });
        }

        const token = jwt.sign(
            {
                id: result.id,
                modo: "DELIVERYMAN",
            },
            "secret",
            { expiresIn: "7d" }
        );

        delete result.password;

        return res.status(StatusCodes.OK).json({ result, token });
    }
}

export default new DeliverymanController()