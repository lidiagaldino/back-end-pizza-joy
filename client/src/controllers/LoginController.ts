import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ILogin from "../interfaces/Login";
import Client from "../services/Client";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class LoginController {
    async client(req: Request<{}, {}, ILogin>, res: Response) {
        const data = req.body

        const client = await Client.getByEmail(data.email);

        if (!client) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
        }

        const isPassValid = await bcrypt.compare(data.senha, client.password);

        if (!isPassValid) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "UNAUTHORIZED" });
        }

        const token = jwt.sign(
            {
                id: client.id,
                modo: "CLIENT",
            },
            "secret",
            { expiresIn: "7d" }
        );

        delete client.password;

        return res.status(StatusCodes.OK).json({ client, token });
    }


}

export default new LoginController()