import { UpdateClient } from "../../../application/services/client/update-client.service"
import { BcryptAdapter } from "../../../infra/criptography/bcrypt.adapter"
import { ClientRepository } from "../../../infra/repositories/client.repository"
import { YupAdapter } from "../../../infra/yup/yup.adapter"
import { Controller } from "../../../presentation/contracts/controller.contract"
import { UpdateClientController } from "../../../presentation/controllers/client/update-client.controller"

export const makeUpdateClientController = (schema: any): Controller => {
    const repository = new ClientRepository()
    const validation = new YupAdapter()
    const encrypter = new BcryptAdapter(8)
    const loader = new UpdateClient(repository, validation, encrypter)
    return new UpdateClientController(loader, schema)
}