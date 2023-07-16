import { CreateClientInput, CreateClientOutput, CreateClientUseCase } from "../../../domain/usecases/client/create-client.usecase";
import { LoginClientUseCase } from "../../../domain/usecases/client/login-client.usecase";
import { LoginInput, LoginOutput } from "../../models/client.model";
import { HashComparer } from "../../models/criptography/password/hash-comparer.model";
import { Hasher } from "../../models/criptography/password/hasher.model";
import { Encrypter } from "../../models/criptography/session/encrypter.model";
import { Validation } from "../../models/validate.model";
import { CreateClientRepository } from "../../repositories/client/create-client.repository";
import { GetClientByEmailRepository } from "../../repositories/client/get-client-email.repository";

export class LoginClient implements LoginClientUseCase {
    constructor(
        private readonly getClientByEmailRepository: GetClientByEmailRepository,
        private readonly validation: Validation,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter
    ) { }

    async login(client: LoginInput, schema: any): Promise<LoginOutput> {
        this.validation.validate(schema, client)

        const acc = await this.getClientByEmailRepository.find({ email: client.email })
        if (!acc) throw new Error('unauthorized')

        const isValid = await this.hashComparer.compare(client.password, acc.password)

        if (isValid) {
            const token = this.encrypter.encrypt({ id: acc.id, modo: 'CLIENT' })

            acc.password = ""

            return { user: acc, token }
        }

        throw new Error('unauthorized')
    }

}