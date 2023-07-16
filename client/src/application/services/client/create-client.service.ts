import { CreateClientInput, CreateClientOutput, CreateClientUseCase } from "../../../domain/usecases/client/create-client.usecase";
import { Hasher } from "../../models/criptography/password/hasher.model";
import { Validation } from "../../models/validate.model";
import { CreateClientRepository } from "../../repositories/client/create-client.repository";
import { GetClientByEmailRepository } from "../../repositories/client/get-client-email.repository";

export class CreateClient implements CreateClientUseCase {
    constructor(
        private readonly createClientRepository: CreateClientRepository,
        private readonly getClientByEmailRepository: GetClientByEmailRepository,
        private readonly validation: Validation,
        private readonly encrypter: Hasher
    ) { }

    async create(client: CreateClientInput, schema: any): Promise<CreateClientOutput> {
        this.validation.validate(schema, client)

        const acc = await this.getClientByEmailRepository.find({ email: client.email })
        if (acc) throw new Error('email has already been taken')

        const hashedPassword = this.encrypter.hash(client.password)

        return await this.createClientRepository.insert({ ...client, password: hashedPassword })
    }

}