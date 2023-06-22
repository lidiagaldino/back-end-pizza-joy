import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ILogin from "../interfaces/Login";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from "../services/Admin";

class LoginController {


    async admin(req: Request<{}, {}, ILogin>, res: Response) {
        const data = req.body

        const admin = await Admin.getByEmail(data.email);

        if (!admin) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
        }

        const isPassValid = await bcrypt.compare(data.password, admin.password);

        if (!isPassValid) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Não autorizado" });
        }

        const token = jwt.sign(
            {
                id: admin.id,
                modo: "ADMIN",
            },
            "secret",
            { expiresIn: "7d" }
        );

        return res.status(StatusCodes.OK).json({ id: admin.id, email: admin.email, token });
    }
}

export default new LoginController()