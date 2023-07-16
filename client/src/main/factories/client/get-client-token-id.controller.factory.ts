import { GetClientById } from "../../../application/services/client/get-client-id.service";
import { ClientRepository } from "../../../infra/repositories/client.repository";
import { Controller } from "../../../presentation/contracts/controller.contract";
import { GetClientByIdController } from "../../../presentation/controllers/client/get-client-id.controller";

export const makeGetClientByTokenId = (): Controller => {
    const repository = new ClientRepository()
    const loader = new GetClientById(repository)
    return new GetClientByIdController(loader)
}