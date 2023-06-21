import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import IPayload from "../interfaces/Jwt";


export const auth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "UNAUTHORIZED" });
    }

    const [, token] = authorization.split(" ");
    console.log(token);

    try {
        const data = jwt.verify(token, "secret") as IPayload;

        req.user = data

        return next();
    } catch (error) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: "UNAUTHORIZED" });
    }
};