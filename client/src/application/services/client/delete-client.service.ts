import { DeleteClientUseCase } from "../../../domain/usecases/client/delete-client.usecase";
import { DeleteClientRepository } from "../../repositories/client/delete-client.repository";
import { GetClientByIdRepository } from "../../repositories/client/get-client-id.repository";

export class DeleteClient implements DeleteClientUseCase {
    constructor(
        private readonly deleteClientRepository: DeleteClientRepository,
        private readonly findClientByIdRepository: GetClientByIdRepository,
    ) { }

    async delete(id: number): Promise<boolean> {
        const verify = await this.findClientByIdRepository.search({ id })
        if (!verify) throw new Error('NOT_FOUND')

        const result = await this.deleteClientRepository.delete(id)

        return result
    }

}