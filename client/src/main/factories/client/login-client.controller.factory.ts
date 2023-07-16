import { LoginClient } from "../../../application/services/client/login-client.service"
import { BcryptAdapter } from "../../../infra/criptography/bcrypt.adapter"
import { JwtAdapter } from "../../../infra/criptography/jwt.adapter"
import { ClientRepository } from "../../../infra/repositories/client.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { Controller } from "../../../presentation/contracts/controller.contract"
import { LoginController } from "../../../presentation/controllers/client/login-client.controller"


export const makeLoginClientControlelr = (schema: any): Controller => {
    const repository = new ClientRepository()
    const validation = new YupAdapter()
    const comparer = new BcryptAdapter(8)
    const encrypter = new JwtAdapter("secret")
    const loader = new LoginClient(repository, validation, comparer, encrypter)
    return new LoginController(loader, schema)
}