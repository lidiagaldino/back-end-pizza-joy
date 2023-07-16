import { CreateClientOutput } from "../../../domain/usecases/client/create-client.usecase";
import { GetClientByIdUseCase } from "../../../domain/usecases/client/get-client-id.usecase";
import { GetByIdInput } from "../../models/client.model";
import { GetClientByIdRepository } from "../../repositories/client/get-client-id.repository";

export class GetClientById implements GetClientByIdUseCase {
    constructor(
        private readonly getClientByIdRepository: GetClientByIdRepository,
    ) { }

    async find(client: GetByIdInput): Promise<CreateClientOutput> {
        const result = await this.getClientByIdRepository.search(client)

        if (!result) throw new Error(JSON.stringify({ errors: 'not_found' }))

        return result
    }

}