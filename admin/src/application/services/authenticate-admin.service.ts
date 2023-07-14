import { AuthenticationInput, AuthenticationOutput, AuthenticationUseCase } from "../../domain/usecases/authentication.use-case";
import { Encrypter, HashComparer } from "../models/criptography.model";
import { CheckAccountEmailRepository } from "../repositories/check-account-email.repository";

export class AuthenticateAdmin implements AuthenticationUseCase {
    constructor(private readonly hashComparer: HashComparer, private readonly checkAccountEmailRepository: CheckAccountEmailRepository, private readonly encrypter: Encrypter) { }

    async auth(data: AuthenticationInput): Promise<AuthenticationOutput> {
        const acc = await this.checkAccountEmailRepository.verifyIfExists(data)
        console.log(acc);

        if (acc) {
            const isValid = await this.hashComparer.compare(data.password, acc.password)
            console.log(isValid);

            if (isValid) {
                const token = this.encrypter.encrypt({ id: acc.id, modo: 'ADMIN' })

                acc.password = ""

                return { user: acc, token }
            }

            throw new Error('UNAUTHORIZED')
        }

        throw new Error('UNAUTHORIZED')
    }

}