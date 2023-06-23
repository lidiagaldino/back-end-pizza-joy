import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Pizza from "../services/Pizza";

export const pizzaExists = (where: 'params' | 'body', name: 'id' | 'pizza_id' | 'id_pizza') => async (req: Request, res: Response, next: NextFunction) => {
    const id = req[where][name]

    const verify = await Pizza.getPizzaById(Number(id))

    return verify ? next() : res.status(StatusCodes.BAD_REQUEST).json({ error: "pizza does not exist" })
}