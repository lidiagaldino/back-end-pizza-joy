import { DeleteClient } from "../../../application/services/client/delete-client.service";
import { ClientRepository } from "../../../infra/repositories/client.repository";
import { Controller } from "../../../presentation/contracts/controller.contract";
import { DeleteClientController } from "../../../presentation/controllers/client/delete-client.controller";

export const makeDeleteClientController = (): Controller => {
    const repository = new ClientRepository()
    const loader = new DeleteClient(repository, repository)
    return new DeleteClientController(loader)
}
