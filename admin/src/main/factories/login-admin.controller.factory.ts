import { AuthenticateAdmin } from "../../application/services/authenticate-admin.service";
import { UpdateAdmin } from "../../application/services/update-admin.service";
import { BcryptAdapter } from "../../infra/criptography/bcrypt.adapter";
import { JwtAdapter } from "../../infra/criptography/jwt.adapter";
import { AdminRepository } from "../../infra/repositories/admin.repository";
import { Controller } from "../../presentation/contracts/controller";
import { LoginController } from "../../presentation/controllers/login-admin.controller";
import { UpdateAdminController } from "../../presentation/controllers/update-admin.controller";

export const makeLoginAdminController = (): Controller => {
    const jwt = new JwtAdapter("secret")
    const bcrypt = new BcryptAdapter(8)
    const repository = new AdminRepository()
    const loader = new AuthenticateAdmin(bcrypt, repository, jwt)
    return new LoginController(loader)
}