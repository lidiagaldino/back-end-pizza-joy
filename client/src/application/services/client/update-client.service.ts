import { CreateClientInput, CreateClientOutput, CreateClientUseCase } from "../../../domain/usecases/client/create-client.usecase";
import { UpdateClientUseCase } from "../../../domain/usecases/client/update-client.usecase";
import { Hasher } from "../../models/criptography/password/hasher.model";
import { Validation } from "../../models/validate.model";
import { CreateClientRepository } from "../../repositories/client/create-client.repository";
import { GetClientByEmailRepository } from "../../repositories/client/get-client-email.repository";
import { UpdateClientRepository } from "../../repositories/client/update-client.repository";

export class UpdateClient implements UpdateClientUseCase {
    constructor(
        private readonly updateClientRepository: UpdateClientRepository,
        private readonly validation: Validation,
        private readonly encrypter: Hasher
    ) { }

    async update(client: CreateClientInput, id: number, schema: any): Promise<CreateClientOutput> {
        this.validation.validate(schema, client)

        const hashedPassword = this.encrypter.hash(client.password)

        return await this.updateClientRepository.update({ ...client, password: hashedPassword }, Number(id))
    }

}