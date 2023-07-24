import { Request, Response } from "express"
import { Controller } from "../../presentation/contracts/controller.contract"

export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        console.log(req.body);
        const response = await controller.handle({ body: req.body, params: req.params, user: req.user, query: req.query })
        res.status(response.statusCode).json(response.data)
    }
}
