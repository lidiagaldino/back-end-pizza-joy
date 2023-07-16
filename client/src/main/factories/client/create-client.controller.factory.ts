import { CreateClient } from "../../../application/services/client/create-client.service";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt.adapter";
import { ClientRepository } from "../../../infra/repositories/client.repository";
import { YupAdapter } from "../../../infra/yup/yup.adapter";
import { Controller } from "../../../presentation/contracts/controller.contract";
import { CreateClientController } from "../../../presentation/controllers/client/create-client.controller";

export const makeCreateClientController = (schema: any): Controller => {
    const repository = new ClientRepository()
    const validation = new YupAdapter()
    const encrypter = new BcryptAdapter(8)
    const loader = new CreateClient(repository, repository, validation, encrypter)
    return new CreateClientController(loader, schema)
}
